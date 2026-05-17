"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { profile } from "@/lib/content";

// Pure CSS 3D Fibonacci dot sphere. ~700 dots positioned via golden-
// angle spiral on a unit sphere, each oriented outward with
// backface-visibility so back-facing dots disappear naturally as the
// sphere rotates. Drag overrides the auto-rotation.
//
// Single labeled pin marking the owner's current location (sourced
// from lib/content/profile.ts). To move the pin, edit
// `locationShort`, `locationCoords`, `locationTimezone`,
// `locationGmtLabel` in profile.ts; everything else follows.
//
// No markers beyond the one pin, no arcs, no city chip row. The
// earlier multi-city narrative was rejected and the simpler
// rotating dot field is what landed best with the owner.

const SIZE = 380;
const RADIUS = (SIZE / 2) * 0.92;
const NUM_DOTS = 700;
const AUTO_ROTATE_DEG_PER_FRAME = 0.12;
const DRAG_SENSITIVITY = 0.4;
const PIN_SIZE = 8; // ruby dot diameter, px
// Initial phi rotation so the location pin sits roughly under the
// camera on first paint. Computed from the pin's longitude.
const INITIAL_PHI_DEG = -profile.locationCoords.lng;

type SphereDot = { x: number; y: number; z: number; lat: number; lng: number };

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

// Live local time in the configured timezone, HH:MM 12-hour. Updates
// once per minute. Independent of the viewer's clock.
function formatLocalTime(now: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(now);
}

export function HeroGlobe() {
  const dots = useMemo(() => fibSphere(NUM_DOTS), []);
  const pinVec = useMemo(
    () =>
      latLngToVec(
        profile.locationCoords.lat,
        profile.locationCoords.lng,
      ),
    [],
  );
  const rotatorRef = useRef<HTMLDivElement | null>(null);
  const phi = useRef(INITIAL_PHI_DEG);
  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartPhi = useRef(0);

  // SSR/CSR mismatch guard: render placeholder time until mounted.
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<Date>(() => new Date(0));
  useEffect(() => {
    setMounted(true);
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  // Auto-rotate loop. Pointer drag overrides via direct transform
  // writes, so the RAF tick just keeps phi advancing when idle.
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

  const liveTime = mounted
    ? formatLocalTime(now, profile.locationTimezone)
    : null;

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
            transform: `rotateY(${INITIAL_PHI_DEG}deg)`,
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

          {/* Single location pin. Ruby dot with a pulsing ring that
              expands and fades out. backface-visibility hides it when
              the pin's surface normal points away from the camera. */}
          <span
            className="pointer-events-none absolute"
            style={{
              left: "50%",
              top: "50%",
              width: PIN_SIZE,
              height: PIN_SIZE,
              transform: `translate(-50%, -50%) translate3d(${(pinVec.x * RADIUS).toFixed(2)}px, ${(-pinVec.y * RADIUS).toFixed(2)}px, ${(pinVec.z * RADIUS).toFixed(2)}px) rotateY(${pinVec.lng}rad) rotateX(${-pinVec.lat}rad)`,
              backfaceVisibility: "hidden",
            }}
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full"
              style={{
                backgroundColor: "var(--color-ruby)",
                boxShadow: "0 0 8px var(--color-ruby), 0 0 2px var(--color-ruby)",
              }}
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full animate-pin-pulse"
              style={{
                border: "1.5px solid var(--color-ruby)",
              }}
            />
          </span>
        </div>

        {/* Soft glow under the sphere. Sits behind everything via -z-10. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(circle at center, color-mix(in oklab, var(--color-ruby) 14%, transparent) 0%, transparent 62%)",
            filter: "blur(8px)",
          }}
        />

        {/* Live location label, anchored to the upper-right area of the
            globe wrap. Always visible regardless of pin orientation; the
            label is about CURRENT location, not a rotating sphere
            marker. Glass-style chip matching the rest of the page. */}
        <div
          className="glass-chip absolute top-3 right-3 inline-flex items-baseline gap-2 rounded-full px-3 py-1.5 font-mono text-[10.5px] tracking-[0.08em] text-[var(--color-fg-soft)]"
          aria-label={`Currently in ${profile.location}`}
        >
          <span className="font-semibold uppercase tracking-[0.14em] text-[var(--color-fg)]">
            {profile.locationShort}
          </span>
          <span className="text-[var(--color-fg-faint)]">·</span>
          <span className="tabular-nums">{liveTime ?? "--:--"}</span>
          <span className="text-[var(--color-fg-faint)]">·</span>
          <span className="text-[var(--color-fg-faint)]">
            {profile.locationGmtLabel}
          </span>
        </div>
      </div>

      <div className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--color-fg-faint)]">
        Drag to rotate.
      </div>
    </div>
  );
}
