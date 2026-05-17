"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { profile } from "@/lib/content";
import { useLocale } from "@/lib/i18n/client";
import type { Locale } from "@/lib/i18n/types";

// CSS 3D Fibonacci dot sphere. ~800 dots positioned via a golden-angle
// spiral and dropped into 3D space behind a CSS perspective. Dots do
// NOT rotate to face the camera and we do NOT use backface-visibility;
// every dot is visible at all times so the silhouette reads as a full
// ball rather than a crescent of front-facing dots.
//
// Layers, back to front:
//   - Ambient ruby fog behind the sphere (very faint).
//   - Full-coverage dot field on a rotating parent.
//   - Great-circle data-flow arcs with a 4-segment comet trail.
//   - Location chip overlaid at the bottom of the globe.
//
// No HCMC pin or halo; the chip carries the location label below.

const SIZE = 380;
const RADIUS = (SIZE / 2) * 0.92;
const NUM_DOTS = 1100;
const AUTO_ROTATE_DEG_PER_FRAME = 0.12;
const DRAG_SENSITIVITY = 0.4;
const INITIAL_PHI_DEG = -profile.locationCoords.lng;

// Dense, frequent data-flow arcs to simulate the feel of a global
// payments / messaging network. Tuned to feel busy without becoming
// noise: shorter spawn cadence, more concurrent arcs, slightly faster
// transit.
const ARC_TRACK_DOTS = 24;
const ARC_HEIGHT = 0.18;
const ARC_SPAWN_INTERVAL_MS = 450;
const ARC_MIN_DURATION_MS = 2000;
const ARC_DURATION_VARIANCE_MS = 1000;
const MAX_ACTIVE_ARCS = 14;

const COMET_TRAIL_OFFSETS = [0, 0.04, 0.08, 0.12] as const;
const COMET_TRAIL_SIZES = [4.2, 3.2, 2.2, 1.5] as const;
const COMET_TRAIL_OPACITY = [1, 0.55, 0.3, 0.15] as const;

// Momentum coast on drag release. Decay multiplier per frame; below
// the stop threshold (deg/frame) we hand back to auto-rotation.
const COAST_FRICTION = 0.94;
const COAST_STOP_THRESHOLD = 0.05;

const ARC_POOL: Array<[number, number]> = [
  // SEA + APAC
  [16.8409, 96.1735], // Yangon
  [1.3521, 103.8198], // Singapore
  [10.7769, 106.7009], // HCMC
  [21.0285, 105.8542], // Hanoi
  [13.7563, 100.5018], // Bangkok
  [3.139, 101.6869], // Kuala Lumpur
  [-6.2088, 106.8456], // Jakarta
  [14.5995, 120.9842], // Manila
  [22.3193, 114.1694], // Hong Kong
  [35.6762, 139.6503], // Tokyo
  [37.5665, 126.978], // Seoul
  [31.2304, 121.4737], // Shanghai
  [39.9042, 116.4074], // Beijing
  [-33.8688, 151.2093], // Sydney
  [-37.8136, 144.9631], // Melbourne
  [-36.8485, 174.7633], // Auckland
  [28.6139, 77.209], // Delhi
  [19.076, 72.8777], // Mumbai
  [12.9716, 77.5946], // Bangalore
  // EU + ME + AF
  [51.5074, -0.1278], // London
  [48.8566, 2.3522], // Paris
  [52.52, 13.405], // Berlin
  [55.7558, 37.6173], // Moscow
  [41.0082, 28.9784], // Istanbul
  [25.276987, 55.296249], // Dubai
  [-1.2921, 36.8219], // Nairobi
  [-26.2041, 28.0473], // Johannesburg
  [-33.9249, 18.4241], // Cape Town
  // Americas
  [40.7128, -74.006], // NYC
  [37.7749, -122.4194], // San Francisco
  [47.6062, -122.3321], // Seattle
  [34.0522, -118.2437], // Los Angeles
  [49.2827, -123.1207], // Vancouver
  [19.4326, -99.1332], // Mexico City
  [-23.5505, -46.6333], // Sao Paulo
  [-34.6037, -58.3816], // Buenos Aires
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
  const locale = useLocale();
  const dots = useMemo(() => fibSphere(NUM_DOTS), []);
  const rotatorRef = useRef<HTMLDivElement | null>(null);
  const phi = useRef(INITIAL_PHI_DEG);
  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartPhi = useRef(0);
  const lastDragX = useRef(0);
  const dragVelocity = useRef(0);
  const coastVelocity = useRef(0);

  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<Date>(() => new Date(0));
  const [arcs, setArcs] = useState<ArcInstance[]>([]);
  const arcsRef = useRef<ArcInstance[]>([]);
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
          // Pointer drives phi directly during drag.
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
          node.style.transform = `translate(-50%, -50%) translate3d(${tx}px, ${ty}px, ${tz}px)`;
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
      const frameDelta = (e.clientX - lastDragX.current) * DRAG_SENSITIVITY;
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
        {/* Ambient ruby fog. Sits behind the sphere; very low intensity
            so the globe is the focus, not the glow. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(circle at center, color-mix(in oklab, var(--color-ruby) 5%, transparent) 0%, transparent 55%)",
            filter: "blur(10px)",
          }}
        />

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
          {/* Full-coverage dot field. Every dot renders at all phi:
              no per-dot rotation, no backface-visibility hide. The
              CSS perspective makes back-of-sphere dots appear slightly
              smaller, giving natural depth without computing per-frame
              opacity for 800 elements. Front and back dots both show,
              so the silhouette reads as a full sphere. */}
          {dots.map((d, i) => (
            <span
              key={i}
              className="absolute rounded-full"
              style={{
                left: "50%",
                top: "50%",
                width: 2,
                height: 2,
                backgroundColor: "var(--color-fg-soft)",
                opacity: 0.6,
                transform: `translate(-50%, -50%) translate3d(${(d.x * RADIUS).toFixed(2)}px, ${(-d.y * RADIUS).toFixed(2)}px, ${(d.z * RADIUS).toFixed(2)}px)`,
              }}
            />
          ))}

          {/* Random data-flow arcs. Dim ruby track + a 4-dot comet
              trail (head + 3 fading shadow dots). RAF writes each
              trail dot's position directly into its ref each frame. */}
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
                      opacity: 0.28,
                      transform: `translate(-50%, -50%) translate3d(${(pt.p.x * RADIUS * pt.elev).toFixed(2)}px, ${(-pt.p.y * RADIUS * pt.elev).toFixed(2)}px, ${(pt.p.z * RADIUS * pt.elev).toFixed(2)}px)`,
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
                          ? "0 0 8px var(--color-ruby)"
                          : "0 0 4px color-mix(in oklab, var(--color-ruby) 60%, transparent)",
                      opacity: 0,
                      willChange: "transform, opacity",
                    }}
                  />
                ))}
              </span>
            );
          })}
        </div>

        {/* Location chip overlaid on the bottom of the globe. Doesn't
            rotate with the sphere; floats over the dot field. */}
        <div
          className="glass-chip pointer-events-none absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 items-baseline gap-2 rounded-full px-3 py-1.5 font-mono text-[10.5px] tracking-[0.08em] text-[var(--color-fg-soft)]"
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

    </div>
  );
}
