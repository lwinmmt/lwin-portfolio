"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { profile } from "@/lib/content";
import { useLocale, useT } from "@/lib/i18n/client";
import type { Locale } from "@/lib/i18n/types";

// Pure CSS 3D Fibonacci dot sphere. ~700 dots positioned via golden-
// angle spiral, each oriented outward so back-facing dots disappear
// via backface-visibility as the sphere rotates. Drag overrides the
// auto-rotation; on release the rotation coasts with friction before
// handing back to auto-rotate.
//
// Visual layers, back-to-front:
//   - Depth mask on the dot field (radial fade toward the limb) so
//     the sphere reads as a curved surface, not a flat dot cloud.
//   - Random great-circle arcs with a 4-segment comet trail. Reads
//     as 'data in flight between deployed devices.'
//   - Persistent HCMC pin with two staggered pulsing halo rings.
//   - Soft limb-glow ring framing the silhouette.

const SIZE = 380;
const RADIUS = (SIZE / 2) * 0.92;
const NUM_DOTS = 700;
const AUTO_ROTATE_DEG_PER_FRAME = 0.12;
const DRAG_SENSITIVITY = 0.4;
const PIN_SIZE = 8;
const INITIAL_PHI_DEG = -profile.locationCoords.lng;

const ARC_TRACK_DOTS = 24;
const ARC_HEIGHT = 0.18;
const ARC_SPAWN_INTERVAL_MS = 800;
const ARC_MIN_DURATION_MS = 2200;
const ARC_DURATION_VARIANCE_MS = 1200;
const MAX_ACTIVE_ARCS = 7;

// Comet trail: head + 3 trailing shadow dots, each offset behind in
// time so the comet reads as a streak instead of a single pixel.
const COMET_TRAIL_OFFSETS = [0, 0.04, 0.08, 0.12] as const;
const COMET_TRAIL_SIZES = [4.5, 3.4, 2.4, 1.6] as const;
const COMET_TRAIL_OPACITY = [1, 0.55, 0.3, 0.15] as const;

// Momentum coast on drag release. Decay multiplier per frame; below
// the stop threshold (deg/frame) we hand back to auto-rotation.
const COAST_FRICTION = 0.94;
const COAST_STOP_THRESHOLD = 0.05;

const ARC_POOL: Array<[number, number]> = [
  [16.8409, 96.1735], // Yangon
  [1.3521, 103.8198], // Singapore
  [10.7769, 106.7009], // HCMC
  [35.6762, 139.6503], // Tokyo
  [40.7128, -74.006], // NYC
  [51.5074, -0.1278], // London
  [-33.8688, 151.2093], // Sydney
  [22.3193, 114.1694], // Hong Kong
  [-23.5505, -46.6333], // Sao Paulo
  [13.7563, 100.5018], // Bangkok
  [37.7749, -122.4194], // San Francisco
  [25.276987, 55.296249], // Dubai
];

type SphereDot = { x: number; y: number; z: number; lat: number; lng: number };
type ArcInstance = {
  id: number;
  fromVec: SphereDot;
  toVec: SphereDot;
  spawnTime: number;
  durationMs: number;
};

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

function latLngToVec(latDeg: number, lngDeg: number): SphereDot {
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

function slerp(a: SphereDot, b: SphereDot, t: number): SphereDot {
  const d = Math.max(-1, Math.min(1, a.x * b.x + a.y * b.y + a.z * b.z));
  const omega = Math.acos(d);
  const so = Math.sin(omega);
  if (so < 1e-6) return a;
  const s1 = Math.sin((1 - t) * omega) / so;
  const s2 = Math.sin(t * omega) / so;
  const x = a.x * s1 + b.x * s2;
  const y = a.y * s1 + b.y * s2;
  const z = a.z * s1 + b.z * s2;
  return {
    x,
    y,
    z,
    lat: Math.asin(Math.max(-1, Math.min(1, y))),
    lng: Math.atan2(x, z),
  };
}

function arcTrackPoints(from: SphereDot, to: SphereDot, n: number) {
  const pts: Array<{ p: SphereDot; elev: number }> = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const p = slerp(from, to, t);
    const elev = 1 + ARC_HEIGHT * Math.sin(t * Math.PI);
    pts.push({ p, elev });
  }
  return pts;
}

function formatLocalTime(now: Date, timeZone: string, locale: Locale): string {
  if (locale === "vi") {
    return new Intl.DateTimeFormat("vi-VN", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(now);
  }
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(now);
}

export function HeroGlobe() {
  const t = useT();
  const locale = useLocale();
  const dots = useMemo(() => fibSphere(NUM_DOTS), []);
  const pinVec = useMemo(
    () => latLngToVec(profile.locationCoords.lat, profile.locationCoords.lng),
    [],
  );
  const rotatorRef = useRef<HTMLDivElement | null>(null);
  const phi = useRef(INITIAL_PHI_DEG);
  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartPhi = useRef(0);
  // Track the per-frame delta during drag so we can hand it to the
  // coast loop on release. lastDragX is the previous pointer x, used
  // to compute velocity each move event.
  const lastDragX = useRef(0);
  const dragVelocity = useRef(0);
  const coastVelocity = useRef(0);

  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<Date>(() => new Date(0));
  const [arcs, setArcs] = useState<ArcInstance[]>([]);
  const arcsRef = useRef<ArcInstance[]>([]);
  // Each arc owns 4 comet refs (head + 3 trail). Keyed by arc id.
  const arcCometRefs = useRef<Map<number, Array<HTMLSpanElement | null>>>(
    new Map(),
  );
  const arcIdRef = useRef(0);

  useEffect(() => {
    arcsRef.current = arcs;
  }, [arcs]);

  useEffect(() => {
    setMounted(true);
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const spawn = () => {
      setArcs((curr) => {
        const i = Math.floor(Math.random() * ARC_POOL.length);
        let j = Math.floor(Math.random() * ARC_POOL.length);
        while (j === i) j = Math.floor(Math.random() * ARC_POOL.length);
        const arc: ArcInstance = {
          id: ++arcIdRef.current,
          fromVec: latLngToVec(ARC_POOL[i][0], ARC_POOL[i][1]),
          toVec: latLngToVec(ARC_POOL[j][0], ARC_POOL[j][1]),
          spawnTime: performance.now(),
          durationMs:
            ARC_MIN_DURATION_MS + Math.random() * ARC_DURATION_VARIANCE_MS,
        };
        const next = [...curr, arc];
        return next.length > MAX_ACTIVE_ARCS
          ? next.slice(-MAX_ACTIVE_ARCS)
          : next;
      });
    };
    spawn();
    const interval = setInterval(spawn, ARC_SPAWN_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [mounted]);

  useEffect(() => {
    const cleanup = setInterval(() => {
      const nowMs = performance.now();
      setArcs((curr) =>
        curr.filter((arc) => (nowMs - arc.spawnTime) / arc.durationMs < 1.1),
      );
    }, 1000);
    return () => clearInterval(cleanup);
  }, []);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      if (rotatorRef.current) {
        if (dragging.current) {
          // Pointer drives phi directly during drag; coast velocity is
          // set in onPointerMove off the pointer delta.
        } else if (Math.abs(coastVelocity.current) > COAST_STOP_THRESHOLD) {
          phi.current = (phi.current + coastVelocity.current) % 360;
          coastVelocity.current *= COAST_FRICTION;
          rotatorRef.current.style.transform = `rotateY(${phi.current}deg)`;
        } else {
          coastVelocity.current = 0;
          phi.current = (phi.current + AUTO_ROTATE_DEG_PER_FRAME) % 360;
          rotatorRef.current.style.transform = `rotateY(${phi.current}deg)`;
        }
      }

      const nowMs = performance.now();
      arcsRef.current.forEach((arc) => {
        const nodes = arcCometRefs.current.get(arc.id);
        if (!nodes) return;
        const headT = Math.min(1, (nowMs - arc.spawnTime) / arc.durationMs);
        nodes.forEach((node, idx) => {
          if (!node) return;
          const offset = COMET_TRAIL_OFFSETS[idx] ?? 0;
          const tt = headT - offset;
          if (tt <= 0) {
            node.style.opacity = "0";
            return;
          }
          const p = slerp(arc.fromVec, arc.toVec, tt);
          const elev = 1 + ARC_HEIGHT * Math.sin(tt * Math.PI);
          const tx = (p.x * RADIUS * elev).toFixed(2);
          const ty = (-p.y * RADIUS * elev).toFixed(2);
          const tz = (p.z * RADIUS * elev).toFixed(2);
          node.style.transform = `translate(-50%, -50%) translate3d(${tx}px, ${ty}px, ${tz}px) rotateY(${p.lng}rad) rotateX(${-p.lat}rad)`;
          const envelope = Math.sin(tt * Math.PI);
          node.style.opacity = String(envelope * (COMET_TRAIL_OPACITY[idx] ?? 0));
        });
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    dragStartX.current = e.clientX;
    lastDragX.current = e.clientX;
    dragStartPhi.current = phi.current;
    dragVelocity.current = 0;
    coastVelocity.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    if (rotatorRef.current) rotatorRef.current.style.cursor = "grabbing";
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragging.current || !rotatorRef.current) return;
      const delta = e.clientX - dragStartX.current;
      phi.current = dragStartPhi.current + delta * DRAG_SENSITIVITY;
      // Per-frame velocity in deg, used for momentum on release.
      const frameDelta = (e.clientX - lastDragX.current) * DRAG_SENSITIVITY;
      // Smooth a touch so a single jitter at the end of a drag does
      // not dominate the coast direction.
      dragVelocity.current = dragVelocity.current * 0.6 + frameDelta * 0.4;
      lastDragX.current = e.clientX;
      rotatorRef.current.style.transform = `rotateY(${phi.current}deg)`;
    },
    [],
  );

  const endDrag = useCallback(() => {
    if (dragging.current) {
      coastVelocity.current = dragVelocity.current;
    }
    dragging.current = false;
    if (rotatorRef.current) rotatorRef.current.style.cursor = "grab";
  }, []);

  const liveTime = mounted
    ? formatLocalTime(now, profile.locationTimezone, locale)
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
          {/* Dot field. Light radial fade toward the limb so the
              sphere reads as curved, but the floor stays high enough
              that limb dots remain visible. */}
          <div
            className="absolute inset-0"
            style={{
              transformStyle: "preserve-3d",
              WebkitMaskImage:
                "radial-gradient(circle at center, rgba(0,0,0,1) 55%, rgba(0,0,0,0.9) 80%, rgba(0,0,0,0.75) 100%)",
              maskImage:
                "radial-gradient(circle at center, rgba(0,0,0,1) 55%, rgba(0,0,0,0.9) 80%, rgba(0,0,0,0.75) 100%)",
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
                  opacity: 0.7,
                  transform: `translate(-50%, -50%) translate3d(${(d.x * RADIUS).toFixed(2)}px, ${(-d.y * RADIUS).toFixed(2)}px, ${(d.z * RADIUS).toFixed(2)}px) rotateY(${d.lng}rad) rotateX(${-d.lat}rad)`,
                  backfaceVisibility: "hidden",
                }}
              />
            ))}
          </div>

          {/* Random data-flow arcs: static dim ruby track + a 4-dot
              comet trail (head + 3 fading shadow dots). RAF writes
              each trail dot's position directly into its ref. */}
          {arcs.map((arc) => {
            const track = arcTrackPoints(arc.fromVec, arc.toVec, ARC_TRACK_DOTS);
            return (
              <span key={`arc-${arc.id}`} style={{ display: "contents" }}>
                {track.map((pt, idx) => (
                  <span
                    key={idx}
                    className="absolute rounded-full"
                    style={{
                      left: "50%",
                      top: "50%",
                      width: 1.1,
                      height: 1.1,
                      backgroundColor: "var(--color-ruby)",
                      opacity: 0.32,
                      transform: `translate(-50%, -50%) translate3d(${(pt.p.x * RADIUS * pt.elev).toFixed(2)}px, ${(-pt.p.y * RADIUS * pt.elev).toFixed(2)}px, ${(pt.p.z * RADIUS * pt.elev).toFixed(2)}px) rotateY(${pt.p.lng}rad) rotateX(${-pt.p.lat}rad)`,
                      backfaceVisibility: "hidden",
                    }}
                  />
                ))}
                {COMET_TRAIL_OFFSETS.map((_, idx) => (
                  <span
                    key={`comet-${idx}`}
                    ref={(el) => {
                      const list = arcCometRefs.current.get(arc.id) ?? [
                        null,
                        null,
                        null,
                        null,
                      ];
                      list[idx] = el;
                      if (el) arcCometRefs.current.set(arc.id, list);
                      else if (list.every((n) => n === null))
                        arcCometRefs.current.delete(arc.id);
                    }}
                    className="absolute rounded-full"
                    style={{
                      left: "50%",
                      top: "50%",
                      width: COMET_TRAIL_SIZES[idx],
                      height: COMET_TRAIL_SIZES[idx],
                      backgroundColor: "var(--color-ruby)",
                      boxShadow:
                        idx === 0
                          ? "0 0 12px var(--color-ruby), 0 0 4px var(--color-ruby)"
                          : "0 0 6px color-mix(in oklab, var(--color-ruby) 70%, transparent)",
                      opacity: 0,
                      backfaceVisibility: "hidden",
                      willChange: "transform, opacity",
                    }}
                  />
                ))}
              </span>
            );
          })}

          {/* Persistent HCMC pin with two staggered halo rings. The
              rings sit on the same 3D plane as the pin so they hide
              via backface-visibility when the pin rotates to the back
              of the sphere. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute"
            style={{
              left: "50%",
              top: "50%",
              width: PIN_SIZE,
              height: PIN_SIZE,
              transform: `translate(-50%, -50%) translate3d(${(pinVec.x * RADIUS).toFixed(2)}px, ${(-pinVec.y * RADIUS).toFixed(2)}px, ${(pinVec.z * RADIUS).toFixed(2)}px) rotateY(${pinVec.lng}rad) rotateX(${-pinVec.lat}rad)`,
              backfaceVisibility: "hidden",
              transformStyle: "preserve-3d",
            }}
          >
            <span
              className="globe-pin-halo absolute rounded-full"
              style={{
                left: "50%",
                top: "50%",
                width: PIN_SIZE * 2.2,
                height: PIN_SIZE * 2.2,
                border: "1px solid var(--color-ruby)",
                animation: "globe-pin-halo 2.8s ease-out infinite",
              }}
            />
            <span
              className="absolute rounded-full"
              style={{
                left: "50%",
                top: "50%",
                width: PIN_SIZE,
                height: PIN_SIZE,
                transform: "translate(-50%, -50%)",
                backgroundColor: "var(--color-ruby)",
                boxShadow: "0 0 6px var(--color-ruby)",
              }}
            />
          </div>
        </div>

        {/* Very subtle ambient fog behind the sphere. Drop further
            than before so the globe reads as dots-on-paper, not as a
            red splotch. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(circle at center, color-mix(in oklab, var(--color-ruby) 4%, transparent) 0%, transparent 55%)",
            filter: "blur(10px)",
          }}
        />
      </div>

      <div className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--color-fg-faint)]">
        {t("globe.dragToRotate")}
      </div>

      <div
        className="glass-chip mt-3 inline-flex items-baseline gap-2 rounded-full px-3 py-1.5 font-mono text-[10.5px] tracking-[0.08em] text-[var(--color-fg-soft)]"
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
  );
}
