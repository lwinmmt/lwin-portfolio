"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// W1 implementation. Pure CSS 3D globe driven by requestAnimationFrame so
// pointer drag can override the auto-rotation. ~700 dots positioned via
// Fibonacci spiral on a unit sphere. Each dot rotateY(lng) rotateX(-lat)
// so its surface normal points outward; the parent rotateY then hides
// back-facing dots via backface-visibility.
//
// The globe earns its keep by surfacing role + live local time per city:
// Yangon (Born), Singapore (Schooled), HCMC (Working). The chips below
// are buttons. Hover or focus expands a small card with the role label
// and current local time, and pulses the matching marker on the sphere.

const SIZE = 380;
const RADIUS = (SIZE / 2) * 0.92;
const NUM_DOTS = 700;
const RUBY = "#B73A2C";
const AUTO_ROTATE_DEG_PER_FRAME = 0.12; // ~0.12deg per 16ms = roughly 38s/rev
const DRAG_SENSITIVITY = 0.4; // pixels to degrees

type SphereDot = { x: number; y: number; z: number; lat: number; lng: number };
type City = {
  id: string;
  label: string;
  role: string;
  tzMinutes: number;
  lat: number;
  lng: number;
  size: number;
};

const CITIES: City[] = [
  {
    id: "yangon",
    label: "Yangon",
    role: "Born",
    tzMinutes: 390,
    lat: 16.8409,
    lng: 96.1735,
    size: 5,
  },
  {
    id: "singapore",
    label: "Singapore",
    role: "Schooled at SP, SMU",
    tzMinutes: 480,
    lat: 1.3521,
    lng: 103.8198,
    size: 6,
  },
  {
    id: "hcmc",
    label: "HCMC",
    role: "Working at VNTT",
    tzMinutes: 420,
    lat: 10.7769,
    lng: 106.7009,
    size: 8,
  },
];

function fibSphere(n: number): SphereDot[] {
  const dots: SphereDot[] = [];
  const goldenAngle = Math.PI * (Math.sqrt(5) - 1);
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    const lat = Math.asin(y);
    const lng = Math.atan2(z, x);
    dots.push({ x, y, z, lat, lng });
  }
  return dots;
}

function latLngToVec(latDeg: number, lngDeg: number) {
  const lat = (latDeg * Math.PI) / 180;
  const lng = (lngDeg * Math.PI) / 180;
  return {
    x: Math.cos(lat) * Math.sin(lng),
    y: Math.sin(lat),
    z: Math.cos(lat) * Math.cos(lng),
    lat,
    lng,
  };
}

// Convert a UTC instant into "HH:MM" for a given timezone offset (minutes).
// Shift the underlying epoch by tzMinutes then read UTC components: avoids
// any dependency on the viewer's local timezone, so HCMC time shows as
// HCMC time regardless of where the page is loaded.
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
  const dots = useMemo(() => fibSphere(NUM_DOTS), []);
  const rotatorRef = useRef<HTMLDivElement | null>(null);
  const phi = useRef(0);
  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartPhi = useRef(0);

  // Suppress server/client text mismatch: render times only after mount.
  // Before mount, chips show the role and timezone label but no live time.
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<Date>(() => new Date(0));
  useEffect(() => {
    setMounted(true);
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const [activeCity, setActiveCity] = useState<string | null>(null);

  // Animation loop. Auto-rotate when idle. While dragging, the pointer
  // move handler writes the transform directly, so this loop just keeps
  // running without overwriting.
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      if (!dragging.current && rotatorRef.current) {
        phi.current = (phi.current + AUTO_ROTATE_DEG_PER_FRAME) % 360;
        rotatorRef.current.style.transform = `rotateY(${phi.current}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    dragStartX.current = e.clientX;
    dragStartPhi.current = phi.current;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    if (rotatorRef.current) rotatorRef.current.style.cursor = "grabbing";
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragging.current || !rotatorRef.current) return;
      const delta = e.clientX - dragStartX.current;
      phi.current = dragStartPhi.current + delta * DRAG_SENSITIVITY;
      rotatorRef.current.style.transform = `rotateY(${phi.current}deg)`;
    },
    [],
  );

  const endDrag = useCallback(() => {
    dragging.current = false;
    if (rotatorRef.current) rotatorRef.current.style.cursor = "grab";
  }, []);

  return (
    <div
      className="mx-auto flex flex-col items-center"
      style={{ width: "100%", maxWidth: SIZE }}
    >
      <div
        className="globe-wrap relative"
        style={{
          width: "100%",
          aspectRatio: "1 / 1",
          perspective: "1400px",
          perspectiveOrigin: "center",
          touchAction: "none",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          ref={rotatorRef}
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            cursor: "grab",
            willChange: "transform",
          }}
        >
          {dots.map((d, i) => (
            <span
              key={i}
              className="absolute rounded-full"
              style={{
                left: "50%",
                top: "50%",
                width: 1.8,
                height: 1.8,
                backgroundColor: "var(--color-fg-soft)",
                opacity: 0.45,
                transform: `translate(-50%, -50%) translate3d(${(d.x * RADIUS).toFixed(2)}px, ${(-d.y * RADIUS).toFixed(2)}px, ${(d.z * RADIUS).toFixed(2)}px) rotateY(${d.lng}rad) rotateX(${-d.lat}rad)`,
                backfaceVisibility: "hidden",
              }}
            />
          ))}
          {CITIES.map((c) => {
            const p = latLngToVec(c.lat, c.lng);
            const isActive = activeCity === c.id;
            const renderedSize = isActive ? c.size + 2 : c.size;
            const glowMul = isActive ? 3 : 2;
            return (
              <span
                key={c.id}
                className="absolute rounded-full"
                style={{
                  left: "50%",
                  top: "50%",
                  width: renderedSize,
                  height: renderedSize,
                  backgroundColor: RUBY,
                  boxShadow: `0 0 ${renderedSize * glowMul}px ${RUBY}, 0 0 ${renderedSize}px ${RUBY}`,
                  transform: `translate(-50%, -50%) translate3d(${(p.x * RADIUS).toFixed(2)}px, ${(-p.y * RADIUS).toFixed(2)}px, ${(p.z * RADIUS).toFixed(2)}px) rotateY(${p.lng}rad) rotateX(${-p.lat}rad)`,
                  backfaceVisibility: "hidden",
                  transition:
                    "width 180ms ease-out, height 180ms ease-out, box-shadow 180ms ease-out",
                }}
              />
            );
          })}
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(circle at center, color-mix(in oklab, ${RUBY} 14%, transparent) 0%, transparent 62%)`,
            filter: "blur(8px)",
          }}
        />
      </div>

      {/* City chip row. Each chip is a button that, when hovered or focused,
          surfaces a small card with the role label and current local time,
          and pulses the matching marker on the sphere. */}
      <div className="relative mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
        {CITIES.map((c, idx) => {
          const isActive = activeCity === c.id;
          const liveTime = mounted ? formatLocalTime(now, c.tzMinutes) : null;
          return (
            <button
              key={c.id}
              type="button"
              onPointerEnter={() => setActiveCity(c.id)}
              onPointerLeave={() =>
                setActiveCity((curr) => (curr === c.id ? null : curr))
              }
              onFocus={() => setActiveCity(c.id)}
              onBlur={() =>
                setActiveCity((curr) => (curr === c.id ? null : curr))
              }
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
                  background: RUBY,
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
        Drag to rotate. Hover cities for local time.
      </div>
    </div>
  );
}
