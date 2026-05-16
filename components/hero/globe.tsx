"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// W2 implementation. Pure CSS 3D globe with auto-rotation, drag-to-rotate,
// and animated great-circle arcs traveling between the three city pins.
// Arcs carry the IoT theme: data flowing between Yangon, Singapore, HCMC.
// Each arc loops continuously and is rendered as a faint static track plus
// a moving comet (head + trailing particles).
//
// Why pure CSS: earlier attempts with Three.js / Cobe / react-globe.gl
// crashed the dev server. CSS 3D + RAF for comet positions stays cheap and
// avoids any new heavy deps.
//
// Performance: comet positions are written directly to DOM refs in a single
// RAF loop. Avoids React re-rendering ~20 elements every frame.

const SIZE = 380;
const RADIUS = (SIZE / 2) * 0.92;
const NUM_DOTS = 700;
const RUBY = "#B73A2C";
const AUTO_ROTATE_DEG_PER_FRAME = 0.12;
const DRAG_SENSITIVITY = 0.4;
const INITIAL_PHI_DEG = -100; // centers SE Asia on first paint

const ARC_TRACK_DOTS = 28;
const ARC_HEIGHT = 0.18; // 18% rise above sphere at midpoint
const COMET_TRAIL_COUNT = 6;
const COMET_TRAIL_GAP = 0.022; // each trail particle lags by 2.2% of arc

type SphereVec = { x: number; y: number; z: number; lat: number; lng: number };
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
  { id: "yangon", label: "Yangon", role: "Born", tzMinutes: 390, lat: 16.8409, lng: 96.1735, size: 5 },
  { id: "singapore", label: "Singapore", role: "Schooled at SP, SMU", tzMinutes: 480, lat: 1.3521, lng: 103.8198, size: 6 },
  { id: "hcmc", label: "HCMC", role: "Working at VNTT", tzMinutes: 420, lat: 10.7769, lng: 106.7009, size: 8 },
];

const ARCS: { id: string; fromId: string; toId: string; periodMs: number; offsetMs: number }[] = [
  { id: "y-s", fromId: "yangon", toId: "singapore", periodMs: 3600, offsetMs: 0 },
  { id: "s-h", fromId: "singapore", toId: "hcmc", periodMs: 3600, offsetMs: -1200 },
  { id: "h-y", fromId: "hcmc", toId: "yangon", periodMs: 3600, offsetMs: -2400 },
];

function latLngToVec(latDeg: number, lngDeg: number): SphereVec {
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

function slerp(a: SphereVec, b: SphereVec, t: number): SphereVec {
  const d = Math.max(-1, Math.min(1, a.x * b.x + a.y * b.y + a.z * b.z));
  const omega = Math.acos(d);
  const so = Math.sin(omega);
  if (so < 1e-6) return a;
  const s1 = Math.sin((1 - t) * omega) / so;
  const s2 = Math.sin(t * omega) / so;
  const x = a.x * s1 + b.x * s2;
  const y = a.y * s1 + b.y * s2;
  const z = a.z * s1 + b.z * s2;
  const lat = Math.asin(Math.max(-1, Math.min(1, y)));
  const lng = Math.atan2(x, z);
  return { x, y, z, lat, lng };
}

const CITY_VECS: Record<string, SphereVec> = Object.fromEntries(
  CITIES.map((c) => [c.id, latLngToVec(c.lat, c.lng)]),
);

function fibSphere(n: number): SphereVec[] {
  const dots: SphereVec[] = [];
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

// Precompute static track points along each great circle. These stay fixed
// in the rotator's local frame and rotate with the globe.
const ARC_TRACKS = ARCS.map((arc) => {
  const from = CITY_VECS[arc.fromId];
  const to = CITY_VECS[arc.toId];
  const pts: { p: SphereVec; elev: number }[] = [];
  for (let i = 0; i <= ARC_TRACK_DOTS; i++) {
    const t = i / ARC_TRACK_DOTS;
    const p = slerp(from, to, t);
    const elev = 1 + ARC_HEIGHT * Math.sin(t * Math.PI);
    pts.push({ p, elev });
  }
  return pts;
});

export function HeroGlobe() {
  const dots = useMemo(() => fibSphere(NUM_DOTS), []);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const rotatorRef = useRef<HTMLDivElement | null>(null);
  const phi = useRef(INITIAL_PHI_DEG);
  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartPhi = useRef(0);
  const cometRefs = useRef<HTMLSpanElement[][]>(ARCS.map(() => []));
  // Visibility ref instead of state: written by IntersectionObserver,
  // read inside the RAF tick. State would cause a re-render of every
  // dot/track/comet span every time the user scrolls past, which is
  // exactly what we are trying to avoid.
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

  // Pause the RAF loop while the globe is off-screen. Otherwise it keeps
  // ticking every frame even when the user has scrolled past the hero or
  // navigated to another section of the app where the home page stays
  // mounted (DashboardShell does not unmount on route change).
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

  // Single RAF loop drives globe auto-rotation and comet positions.
  // When reduced motion is preferred, the loop is skipped entirely so the
  // tracks remain visible but nothing moves.
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const start = performance.now();
    const tick = (nowMs: number) => {
      // Skip work when off-screen. Keep the RAF chain alive so when the
      // globe comes back into view the loop resumes immediately rather
      // than waiting on another effect to start it.
      if (!visibleRef.current) {
        raf = requestAnimationFrame(tick);
        return;
      }

      if (!dragging.current && rotatorRef.current) {
        phi.current = (phi.current + AUTO_ROTATE_DEG_PER_FRAME) % 360;
        rotatorRef.current.style.transform = `rotateY(${phi.current}deg)`;
      }

      const elapsed = nowMs - start;
      for (let arcIdx = 0; arcIdx < ARCS.length; arcIdx++) {
        const arc = ARCS[arcIdx];
        const fromV = CITY_VECS[arc.fromId];
        const toV = CITY_VECS[arc.toId];
        const wrapped =
          (((elapsed + arc.offsetMs) % arc.periodMs) + arc.periodMs) % arc.periodMs;
        const cycleT = wrapped / arc.periodMs;
        for (let trailIdx = 0; trailIdx < COMET_TRAIL_COUNT; trailIdx++) {
          const node = cometRefs.current[arcIdx][trailIdx];
          if (!node) continue;
          const t = cycleT - trailIdx * COMET_TRAIL_GAP;
          if (t < 0 || t > 1) {
            node.style.opacity = "0";
            continue;
          }
          const p = slerp(fromV, toV, t);
          const elev = 1 + ARC_HEIGHT * Math.sin(t * Math.PI);
          const tx = (p.x * RADIUS * elev).toFixed(2);
          const ty = (-p.y * RADIUS * elev).toFixed(2);
          const tz = (p.z * RADIUS * elev).toFixed(2);
          node.style.transform = `translate(-50%, -50%) translate3d(${tx}px, ${ty}px, ${tz}px) rotateY(${p.lng}rad) rotateX(${-p.lat}rad)`;
          const headness = Math.max(0, 1 - trailIdx / COMET_TRAIL_COUNT);
          const windowOpacity = Math.sin(t * Math.PI);
          node.style.opacity = String((0.35 + 0.65 * headness) * windowOpacity);
        }
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

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
      ref={wrapperRef}
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

          {/* Static arc tracks: faint ruby dots along each great-circle path. */}
          {ARC_TRACKS.map((track, arcIdx) =>
            track.map((pt, idx) => (
              <span
                key={`track-${arcIdx}-${idx}`}
                className="absolute rounded-full"
                style={{
                  left: "50%",
                  top: "50%",
                  width: 1.6,
                  height: 1.6,
                  backgroundColor: RUBY,
                  opacity: 0.18,
                  transform: `translate(-50%, -50%) translate3d(${(pt.p.x * RADIUS * pt.elev).toFixed(2)}px, ${(-pt.p.y * RADIUS * pt.elev).toFixed(2)}px, ${(pt.p.z * RADIUS * pt.elev).toFixed(2)}px) rotateY(${pt.p.lng}rad) rotateX(${-pt.p.lat}rad)`,
                  backfaceVisibility: "hidden",
                }}
              />
            )),
          )}

          {/* Comet trail particles: positions/opacities written by the RAF loop. */}
          {ARCS.map((arc, arcIdx) =>
            Array.from({ length: COMET_TRAIL_COUNT }).map((_, trailIdx) => {
              const isHead = trailIdx === 0;
              const sz = isHead ? 4 : Math.max(1.5, 3 - trailIdx * 0.3);
              const glow = isHead
                ? `0 0 10px ${RUBY}, 0 0 4px ${RUBY}`
                : `0 0 ${Math.max(0, 5 - trailIdx)}px ${RUBY}`;
              return (
                <span
                  key={`comet-${arc.id}-${trailIdx}`}
                  ref={(el) => {
                    if (el) cometRefs.current[arcIdx][trailIdx] = el;
                  }}
                  className="absolute rounded-full"
                  style={{
                    left: "50%",
                    top: "50%",
                    width: sz,
                    height: sz,
                    backgroundColor: RUBY,
                    boxShadow: glow,
                    opacity: 0,
                    backfaceVisibility: "hidden",
                    willChange: "transform, opacity",
                  }}
                />
              );
            }),
          )}

          {CITIES.map((c) => {
            const p = CITY_VECS[c.id];
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
