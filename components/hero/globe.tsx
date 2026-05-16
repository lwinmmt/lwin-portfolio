"use client";

import createGlobe, { type COBEOptions } from "cobe";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";

// Cobe-backed globe (~5KB WebGL, same family as Stripe / Vercel / fly.io).
// Cobe renders continent-shaped dot distributions directly on a canvas
// using an internal landmass sampler, which is the visual gap our
// Fibonacci sphere could never close.
//
// The Cobe canvas owns the rendering. This component wires:
//  - Theme-aware colors (recreate the globe when theme toggles)
//  - Drag-to-rotate that overrides the auto-rotation
//  - Reduced-motion: skip auto-rotate, render a single still frame
//  - IntersectionObserver: pause the rotation when scrolled off-screen
//  - The three city chips below with live local time on hover
//
// Cobe v2 supports arcs natively via the `arcs` option, so the great-
// circle connections between the three hubs are rendered by Cobe itself.

// Cobe v2's type definitions omit `onRender`, even though the runtime
// API uses it (see node_modules/cobe/README.md). Augment the type so
// the callback typechecks.
type CobeOptionsWithOnRender = COBEOptions & {
  onRender?: (state: Record<string, number>) => void;
};

type City = {
  id: string;
  label: string;
  role: string;
  tzMinutes: number;
  location: [number, number]; // [lat, lng]
  size: number; // cobe marker size, 0..1 (~0.03..0.10 looks right)
};

const CITIES: City[] = [
  { id: "yangon", label: "Yangon", role: "Born", tzMinutes: 390, location: [16.8409, 96.1735], size: 0.07 },
  { id: "singapore", label: "Singapore", role: "Schooled at SP, SMU", tzMinutes: 480, location: [1.3521, 103.8198], size: 0.08 },
  { id: "hcmc", label: "HCMC", role: "Working at VNTT", tzMinutes: 420, location: [10.7769, 106.7009], size: 0.09 },
];

// Pixel size on screen. Internal WebGL render size is this times the
// device pixel ratio so the dots stay crisp on retina displays.
const DISPLAY_SIZE = 480;

// Initial longitude rotation, in radians, that puts SE Asia under the
// camera on first paint. Cobe uses phi for longitude rotation.
const INITIAL_PHI = 4.5;
const AUTO_ROTATE_SPEED = 0.0028; // radians per frame
const DRAG_SENSITIVITY = 0.005; // pixels to radians

// Convert a UTC instant into "HH:MM" for a given timezone offset (minutes).
// Independent of the viewer's local timezone.
function formatLocalTime(now: Date, tzMinutes: number): string {
  const shifted = new Date(now.getTime() + tzMinutes * 60_000);
  const hh = String(shifted.getUTCHours()).padStart(2, "0");
  const mm = String(shifted.getUTCMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

function formatTzLabel(tzMinutes: number): string {
  const sign = tzMinutes >= 0 ? "+" : "-";
  const abs = Math.abs(tzMinutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return m === 0
    ? `GMT${sign}${h}`
    : `GMT${sign}${h}:${String(m).padStart(2, "0")}`;
}

export function HeroGlobe() {
  const { resolvedTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Visibility ref, written by IntersectionObserver, read inside the
  // Cobe onRender tick. State would force a re-render on every scroll
  // crossing.
  const visibleRef = useRef(true);

  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<Date>(() => new Date(0));
  const [reduced, setReduced] = useState(false);
  const [activeCity, setActiveCity] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        visibleRef.current = entries[0]?.isIntersecting ?? true;
      },
      { rootMargin: "150px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // Create the Cobe globe. Recreated on theme change so the baseColor
  // and glowColor reflect light vs dark mode.
  useEffect(() => {
    if (!canvasRef.current || !mounted) return;
    const canvas = canvasRef.current;
    const isDark = resolvedTheme === "dark";

    // RGB triplets in 0..1. baseColor is the land-dot color; markerColor
    // is the city pin color; glowColor is the atmospheric halo around
    // the sphere edge.
    const baseColor: [number, number, number] = isDark
      ? [0.93, 0.34, 0.27] // softer ruby on dark so dots do not blow out
      : [0.72, 0.23, 0.17]; // RUBY = #B73A2C ~= (183/255, 58/255, 44/255)
    const glowColor: [number, number, number] = isDark
      ? [0.18, 0.16, 0.13] // bg-warm in dark ~= #1A1815
      : [0.96, 0.95, 0.92]; // bg-warm in light ~= #F4F1EA
    const markerColor: [number, number, number] = isDark
      ? [0.98, 0.42, 0.34]
      : [0.59, 0.18, 0.14]; // ruby-deep for slightly stronger pin contrast

    let phi = INITIAL_PHI;
    let phiOffset = 0; // contribution from active dragging
    let dragging = false;
    let dragStartX = 0;
    let dragStartPhi = 0;

    const arcColor: [number, number, number] = isDark
      ? [0.98, 0.42, 0.34]
      : [0.72, 0.23, 0.17];

    const options: CobeOptionsWithOnRender = {
      devicePixelRatio:
        typeof window !== "undefined" ? window.devicePixelRatio : 2,
      width: DISPLAY_SIZE * 2,
      height: DISPLAY_SIZE * 2,
      phi: INITIAL_PHI,
      theta: 0.25, // tilt the north pole slightly forward
      dark: isDark ? 1 : 0,
      diffuse: 1.2,
      // Sample count drives dot density on the landmass. ~16000 is the
      // Cobe demo default and feels right at our size.
      mapSamples: 16000,
      mapBrightness: isDark ? 5 : 6,
      baseColor,
      markerColor,
      glowColor,
      markers: CITIES.map(({ location, size }) => ({ location, size })),
      // Great-circle arcs between the three hub cities. Cobe v2 renders
      // these natively; no SVG overlay needed.
      arcs: [
        { from: CITIES[0].location, to: CITIES[1].location },
        { from: CITIES[1].location, to: CITIES[2].location },
        { from: CITIES[2].location, to: CITIES[0].location },
      ],
      arcColor,
      arcWidth: 0.6,
      arcHeight: 0.3,
      markerElevation: 0.02,
      onRender: (state) => {
        if (!visibleRef.current) {
          state.phi = phi + phiOffset;
          return;
        }
        if (!dragging && !reduced) phi += AUTO_ROTATE_SPEED;
        state.phi = phi + phiOffset;
      },
    };

    const globe = createGlobe(canvas, options);

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      dragStartX = e.clientX;
      dragStartPhi = phiOffset;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      canvas.style.cursor = "grabbing";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const delta = e.clientX - dragStartX;
      phiOffset = dragStartPhi + delta * DRAG_SENSITIVITY;
    };
    const endDrag = () => {
      dragging = false;
      canvas.style.cursor = "grab";
    };

    canvas.style.cursor = "grab";
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", endDrag);
    canvas.addEventListener("pointercancel", endDrag);
    canvas.addEventListener("pointerleave", endDrag);

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", endDrag);
      canvas.removeEventListener("pointercancel", endDrag);
      canvas.removeEventListener("pointerleave", endDrag);
      globe.destroy();
    };
  }, [mounted, resolvedTheme, reduced]);

  const handleChipEnter = useCallback((id: string) => setActiveCity(id), []);
  const handleChipLeave = useCallback(
    (id: string) =>
      setActiveCity((curr) => (curr === id ? null : curr)),
    [],
  );

  return (
    <div
      ref={wrapperRef}
      className="mx-auto flex flex-col items-center"
      style={{ width: "100%", maxWidth: DISPLAY_SIZE }}
    >
      <div
        className="relative"
        style={{
          width: "100%",
          aspectRatio: "1 / 1",
          touchAction: "none",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
          }}
          aria-label="Interactive globe showing Yangon, Singapore, and Ho Chi Minh City"
        />
      </div>

      {/* City chip row. Static metadata only; the chip does not directly
          interact with the WebGL canvas (Cobe markers are not exposed to
          JS), but the chip still surfaces role + live local time on hover. */}
      <div className="relative mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
        {CITIES.map((c, idx) => {
          const isActive = activeCity === c.id;
          const liveTime = mounted ? formatLocalTime(now, c.tzMinutes) : null;
          return (
            <button
              key={c.id}
              type="button"
              onPointerEnter={() => handleChipEnter(c.id)}
              onPointerLeave={() => handleChipLeave(c.id)}
              onFocus={() => handleChipEnter(c.id)}
              onBlur={() => handleChipLeave(c.id)}
              onClick={() =>
                setActiveCity((curr) => (curr === c.id ? null : c.id))
              }
              aria-expanded={isActive}
              aria-label={`${c.label}. ${c.role}. ${formatTzLabel(c.tzMinutes)}`}
              className="relative inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-muted)] transition-colors hover:bg-[var(--color-hover-mute)] hover:text-[var(--color-fg)] focus-visible:bg-[var(--color-hover-mute)] focus-visible:text-[var(--color-fg)] focus-visible:outline-none"
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full transition-transform duration-200"
                style={{
                  background: "var(--color-ruby)",
                  opacity: 0.4 + idx * 0.3,
                  transform: isActive ? "scale(1.5)" : "scale(1)",
                }}
              />
              <span>{c.label}</span>
              {isActive && (
                <span
                  role="tooltip"
                  className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 flex -translate-x-1/2 flex-col items-start whitespace-nowrap rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-card)] px-3 py-2 text-left shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
                >
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--color-ruby)]">
                    {c.role}
                  </span>
                  <span className="mt-1 flex items-baseline gap-2">
                    <span className="font-sans text-[15px] font-semibold normal-case tracking-normal text-[var(--color-fg)]">
                      {liveTime ?? "--:--"}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--color-fg-faint)]">
                      {formatTzLabel(c.tzMinutes)}
                    </span>
                  </span>
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--color-fg-faint)]">
        Drag to rotate.
      </div>
    </div>
  );
}
