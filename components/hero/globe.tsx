"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { profile } from "@/lib/content";

// Canvas-rendered Fibonacci dot globe. Previous version used ~1500
// absolutely-positioned <span> dots + ~600 arc-track spans (re-mounted
// every spawn) on a CSS-perspective stage. That was the single largest
// paint + reconciler cost in the app per the perf review. This version
// draws everything (dots, arc tracks, comet trails) into a single
// canvas inside a per-frame loop — one DOM node, no React reconcile
// pressure on the hot path.
//
// Behaviour preserved from the DOM version:
//   - Auto-rotation around Y, paused while dragging.
//   - Two-axis pointer drag: horizontal -> phi, vertical -> theta
//     (clamped to +/- 70deg).
//   - Momentum coast on release (Y-axis only).
//   - Random data-flow arcs with 4-segment comet trail.

// Bumped from 380 -> 440 after the HCMC chip was retired. The chip
// gave the right column a second visual mass below the globe; without
// it the globe needs more presence to balance the text block on the
// left. 15% larger felt right against the 3fr_2fr grid.
const SIZE = 440;
// 0.88 leaves enough margin between the sphere silhouette and the
// canvas edge that arcs bowing up to (1 + ARC_HEIGHT) * RADIUS still
// fit fully inside the canvas instead of getting clipped at the top.
// (Previous 0.92 + 0.18 elevation pushed the arc apex past the canvas
// edge.)
const RADIUS = (SIZE / 2) * 0.88;
const NUM_DOTS = 1200;
const AUTO_ROTATE_DEG_PER_FRAME = 0.12;
const DRAG_SENSITIVITY = 0.4;
const INITIAL_PHI_DEG = -profile.locationCoords.lng;

// Number of polyline segments along each arc. A smooth stroked
// great-circle line needs noticeably fewer points than the discrete-
// dot version did.
const ARC_TRACK_DOTS = 26;
// Max elevation of an arc above the sphere surface, in radius units.
// 0.12 keeps the arcs visibly bowed (clearly arching, not flat
// great-circle paths) while staying within the canvas headroom that
// the RADIUS factor above reserves.
const ARC_HEIGHT = 0.12;
const ARC_SPAWN_INTERVAL_MS = 500;
const ARC_MIN_DURATION_MS = 2200;
const ARC_DURATION_VARIANCE_MS = 1100;
const MAX_ACTIVE_ARCS = 12;

const COMET_TRAIL_OFFSETS = [0, 0.04, 0.08, 0.12] as const;
const COMET_TRAIL_SIZES = [4.2, 3.2, 2.2, 1.4] as const;
const COMET_TRAIL_OPACITY = [1, 0.55, 0.3, 0.15] as const;

// Momentum coast on drag release.
const COAST_FRICTION = 0.94;
const COAST_STOP_THRESHOLD = 0.05;

// Vertical tilt clamp. Dot sphere has no orientation landmarks, so
// unbounded pitch disorients; keep within +/- 70 degrees.
const MAX_THETA_DEG = 70;

// CSS perspective equivalent: focal length for the manual projection.
// Matches the previous CSS `perspective: 1400px` so the apparent
// curvature stays consistent.
const FOCAL = 1400;

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

type Vec3 = { x: number; y: number; z: number };
type ArcInstance = {
  id: number;
  fromVec: Vec3;
  toVec: Vec3;
  spawnTime: number;
  durationMs: number;
  /** Pre-computed track points. Cached on spawn so the RAF loop
   *  does not call slerp 36 times per arc per frame for static
   *  geometry. */
  track: Array<{ p: Vec3; elev: number }>;
};

function fibSphere(n: number): Vec3[] {
  const dots: Vec3[] = [];
  const goldenAngle = Math.PI * (Math.sqrt(5) - 1);
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    dots.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
  }
  return dots;
}

function latLngToVec(latDeg: number, lngDeg: number): Vec3 {
  const lat = (latDeg * Math.PI) / 180;
  const lng = (lngDeg * Math.PI) / 180;
  return {
    x: Math.cos(lat) * Math.sin(lng),
    y: Math.sin(lat),
    z: Math.cos(lat) * Math.cos(lng),
  };
}

function slerp(a: Vec3, b: Vec3, t: number): Vec3 {
  const d = Math.max(-1, Math.min(1, a.x * b.x + a.y * b.y + a.z * b.z));
  const omega = Math.acos(d);
  const so = Math.sin(omega);
  if (so < 1e-6) return a;
  const s1 = Math.sin((1 - t) * omega) / so;
  const s2 = Math.sin(t * omega) / so;
  return {
    x: a.x * s1 + b.x * s2,
    y: a.y * s1 + b.y * s2,
    z: a.z * s1 + b.z * s2,
  };
}

function buildTrack(from: Vec3, to: Vec3, n: number) {
  const pts: Array<{ p: Vec3; elev: number }> = new Array(n + 1);
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    pts[i] = { p: slerp(from, to, t), elev: 1 + ARC_HEIGHT * Math.sin(t * Math.PI) };
  }
  return pts;
}

export function HeroGlobe() {
  const dots = useMemo(() => fibSphere(NUM_DOTS), []);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // phi: rotation around Y axis (auto-spin + horizontal drag)
  // theta: rotation around X axis (vertical drag, clamped)
  const phi = useRef(INITIAL_PHI_DEG);
  const theta = useRef(0);
  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartY = useRef(0);
  const dragStartPhi = useRef(0);
  const dragStartTheta = useRef(0);
  const lastDragX = useRef(0);
  const dragVelocity = useRef(0);
  const coastVelocity = useRef(0);

  // Resolved palette colors. We read these from CSS vars on mount and
  // again on every theme flip via the MutationObserver below; the
  // canvas needs raw rgb strings, not CSS var references.
  //
  // `cometRgb` stores the resolved ruby as the "R, G, B" string only,
  // so the comet trail loop below can compose rgba(comet, alpha)
  // strings for each trail segment without doing a fragile string
  // replace on the full rgba(...) value.
  const palette = useRef<{
    dot: string;
    arcTrack: string;
    cometCore: string;
    cometRgb: string;
  }>({
    dot: "rgba(120, 113, 108, 0.78)",
    arcTrack: "rgba(180, 58, 44, 0.5)",
    cometCore: "rgba(211, 73, 57, 1)",
    cometRgb: "211, 73, 57",
  });

  const [mounted, setMounted] = useState(false);
  const arcsRef = useRef<ArcInstance[]>([]);
  const arcIdRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Resolve --color-fg-soft and --color-ruby into concrete rgb strings
  // by sampling getComputedStyle on the canvas wrapper. Re-runs when
  // the .dark class flips on <html>. CSS var lookups inside canvas
  // ctx.fillStyle are not supported.
  useEffect(() => {
    if (!mounted) return;
    const readPalette = () => {
      const root = document.documentElement;
      const cs = getComputedStyle(root);
      const fgSoft = cs.getPropertyValue("--color-fg-soft").trim();
      const ruby = cs.getPropertyValue("--color-ruby").trim();
      // Build rgba() forms from the resolved hex. Hex parsing is just
      // a slice; named colors and hsl are not used by the design.
      const dotRgb = hexToRgb(fgSoft);
      const rubyRgb = hexToRgb(ruby);
      const resolvedRuby = rubyRgb ?? "211, 73, 57";
      palette.current = {
        dot: dotRgb ? `rgba(${dotRgb}, 0.78)` : "rgba(120, 113, 108, 0.78)",
        arcTrack: `rgba(${resolvedRuby}, 0.5)`,
        cometCore: `rgba(${resolvedRuby}, 1)`,
        cometRgb: resolvedRuby,
      };
    };
    readPalette();
    const obs = new MutationObserver(readPalette);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, [mounted]);

  // Arc spawner. Track points are computed once at spawn and cached on
  // the arc instance so the RAF loop never recomputes them.
  useEffect(() => {
    if (!mounted) return;
    const spawn = () => {
      const i = Math.floor(Math.random() * ARC_POOL.length);
      let j = Math.floor(Math.random() * ARC_POOL.length);
      while (j === i) j = Math.floor(Math.random() * ARC_POOL.length);
      const fromVec = latLngToVec(ARC_POOL[i][0], ARC_POOL[i][1]);
      const toVec = latLngToVec(ARC_POOL[j][0], ARC_POOL[j][1]);
      const arc: ArcInstance = {
        id: ++arcIdRef.current,
        fromVec,
        toVec,
        spawnTime: performance.now(),
        durationMs:
          ARC_MIN_DURATION_MS + Math.random() * ARC_DURATION_VARIANCE_MS,
        track: buildTrack(fromVec, toVec, ARC_TRACK_DOTS),
      };
      arcsRef.current = [...arcsRef.current, arc];
      if (arcsRef.current.length > MAX_ACTIVE_ARCS) {
        arcsRef.current = arcsRef.current.slice(-MAX_ACTIVE_ARCS);
      }
    };
    spawn();
    const interval = setInterval(spawn, ARC_SPAWN_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [mounted]);

  // Periodic prune of fully-expired arcs (including trail tail).
  // RAF skips them anyway via the early-exit but we trim the ref so
  // the array does not grow unbounded.
  useEffect(() => {
    if (!mounted) return;
    const cleanup = setInterval(() => {
      const nowMs = performance.now();
      arcsRef.current = arcsRef.current.filter(
        (arc) => (nowMs - arc.spawnTime) / arc.durationMs < 1.15,
      );
    }, 1500);
    return () => clearInterval(cleanup);
  }, [mounted]);

  // The single RAF loop drives auto-rotation, coast, and every draw.
  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // High-DPI canvas. Backing store at devicePixelRatio so circles
    // render crisp on retina; logical drawing uses the SIZE units
    // because we scale the context once.
    const dpr = window.devicePixelRatio || 1;
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    canvas.style.width = `${SIZE}px`;
    canvas.style.height = `${SIZE}px`;
    ctx.scale(dpr, dpr);

    const cx = SIZE / 2;
    const cy = SIZE / 2;
    let raf = 0;

    const tick = () => {
      // Advance rotation state.
      if (!dragging.current) {
        if (Math.abs(coastVelocity.current) > COAST_STOP_THRESHOLD) {
          phi.current = (phi.current + coastVelocity.current) % 360;
          coastVelocity.current *= COAST_FRICTION;
        } else {
          coastVelocity.current = 0;
          phi.current = (phi.current + AUTO_ROTATE_DEG_PER_FRAME) % 360;
        }
      }

      const phiRad = (phi.current * Math.PI) / 180;
      const thetaRad = (theta.current * Math.PI) / 180;
      const sinPhi = Math.sin(phiRad);
      const cosPhi = Math.cos(phiRad);
      const sinTheta = Math.sin(thetaRad);
      const cosTheta = Math.cos(thetaRad);

      ctx.clearRect(0, 0, SIZE, SIZE);
      // Reset shadow state at frame start. Without this, the dot loop
      // below would inherit `shadowBlur > 0` left over from the last
      // arc's comet head when an arc-free frame transitions in, and
      // every dot would render with an unintended ruby glow.
      ctx.shadowBlur = 0;
      ctx.shadowColor = "transparent";

      // === Dots ===
      // Back-hemisphere cull: skip dots whose rotated z is on the far
      // side of the sphere. Reads as a real globe with depth instead
      // of a see-through wireframe where back-side dots showed through
      // the front. A small negative threshold softens the silhouette
      // so dots fade past the limb instead of cutting abruptly.
      ctx.fillStyle = palette.current.dot;
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        // rotateY first (only x, z change)
        const x1 = d.x * cosPhi + d.z * sinPhi;
        const z1 = -d.x * sinPhi + d.z * cosPhi;
        // then rotateX (only y, z change)
        const y2 = d.y * cosTheta - z1 * sinTheta;
        const z2 = d.y * sinTheta + z1 * cosTheta;
        if (z2 < -0.02) continue; // back-of-sphere, hide
        const zScaled = z2 * RADIUS;
        const scale = FOCAL / (FOCAL - zScaled);
        const sx = x1 * RADIUS * scale + cx;
        const sy = -y2 * RADIUS * scale + cy;
        const r = 1.05 * scale;
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // === Arc tracks + comet trails ===
      const nowMs = performance.now();
      const arcs = arcsRef.current;
      for (let a = 0; a < arcs.length; a++) {
        const arc = arcs[a];
        const headT = Math.min(1, (nowMs - arc.spawnTime) / arc.durationMs);
        // Skip arcs fully past their trail tail; nothing to draw.
        if (headT >= 1 && headT - COMET_TRAIL_OFFSETS[COMET_TRAIL_OFFSETS.length - 1] >= 1) {
          continue;
        }

        // Arc path — stroked polyline through the projected track
        // points. Back-hemisphere segments are skipped: we break the
        // sub-path when z2 dips below the visibility threshold and
        // resume when it climbs back. Without this break, a single
        // continuous lineTo would draw a chord across the sphere
        // through points that should be hidden behind it.
        ctx.strokeStyle = palette.current.arcTrack;
        ctx.lineWidth = 1.1;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        const track = arc.track;
        let pathActive = false;
        for (let i = 0; i < track.length; i++) {
          const { p, elev } = track[i];
          const x1 = p.x * cosPhi + p.z * sinPhi;
          const z1 = -p.x * sinPhi + p.z * cosPhi;
          const y2 = p.y * cosTheta - z1 * sinTheta;
          const z2 = p.y * sinTheta + z1 * cosTheta;
          if (z2 < -0.02) {
            // Hide point + force the next visible point to start a
            // fresh sub-path, not connect across the dark side.
            pathActive = false;
            continue;
          }
          const r = RADIUS * elev;
          const zS = z2 * r;
          const scale = FOCAL / (FOCAL - zS);
          const sx = x1 * r * scale + cx;
          const sy = -y2 * r * scale + cy;
          if (!pathActive) {
            ctx.moveTo(sx, sy);
            pathActive = true;
          } else {
            ctx.lineTo(sx, sy);
          }
        }
        ctx.stroke();

        // Comet trail: head + 3 fading shadow dots. Each segment is
        // at headT - offset and slerps along (from, to). Hide comets
        // on the back of the sphere; they should not show through.
        for (let idx = 0; idx < COMET_TRAIL_OFFSETS.length; idx++) {
          const offset = COMET_TRAIL_OFFSETS[idx];
          const tt = headT - offset;
          if (tt <= 0 || tt >= 1) continue;
          const p = slerp(arc.fromVec, arc.toVec, tt);
          const elev = 1 + ARC_HEIGHT * Math.sin(tt * Math.PI);
          const x1 = p.x * cosPhi + p.z * sinPhi;
          const z1 = -p.x * sinPhi + p.z * cosPhi;
          const y2 = p.y * cosTheta - z1 * sinTheta;
          const z2 = p.y * sinTheta + z1 * cosTheta;
          if (z2 < -0.02) continue;
          const r = RADIUS * elev;
          const zS = z2 * r;
          const scale = FOCAL / (FOCAL - zS);
          const sx = x1 * r * scale + cx;
          const sy = -y2 * r * scale + cy;
          const envelope = Math.sin(tt * Math.PI);
          const alpha = envelope * COMET_TRAIL_OPACITY[idx];
          const radius = (COMET_TRAIL_SIZES[idx] / 2) * scale;
          // Head gets a glow halo via shadowBlur; trail dots are flat.
          if (idx === 0) {
            ctx.shadowColor = palette.current.cometCore;
            ctx.shadowBlur = 10 * scale;
          } else {
            ctx.shadowBlur = 0;
          }
          ctx.fillStyle = `rgba(${palette.current.cometRgb}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(sx, sy, radius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mounted, dots]);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    dragStartX.current = e.clientX;
    dragStartY.current = e.clientY;
    lastDragX.current = e.clientX;
    dragStartPhi.current = phi.current;
    dragStartTheta.current = theta.current;
    dragVelocity.current = 0;
    coastVelocity.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragging.current) return;
      const dx = e.clientX - dragStartX.current;
      const dy = e.clientY - dragStartY.current;
      phi.current = dragStartPhi.current + dx * DRAG_SENSITIVITY;
      const rawTheta = dragStartTheta.current + dy * DRAG_SENSITIVITY;
      theta.current = Math.max(
        -MAX_THETA_DEG,
        Math.min(MAX_THETA_DEG, rawTheta),
      );
      const frameDelta = (e.clientX - lastDragX.current) * DRAG_SENSITIVITY;
      dragVelocity.current = dragVelocity.current * 0.6 + frameDelta * 0.4;
      lastDragX.current = e.clientX;
    },
    [],
  );

  const endDrag = useCallback(() => {
    if (dragging.current) {
      coastVelocity.current = dragVelocity.current;
    }
    dragging.current = false;
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
          touchAction: "none",
          cursor: "grab",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {/* Faint ruby halo behind the canvas. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(circle at center, color-mix(in oklab, var(--color-ruby) 4%, transparent) 0%, transparent 55%)",
            filter: "blur(10px)",
          }}
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 m-auto"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

// Parses #rrggbb or #rgb into a "r, g, b" string suitable for inline
// rgba() composition. Returns null if it cannot parse (very defensive;
// the design system uses hex everywhere).
function hexToRgb(hex: string): string | null {
  if (!hex) return null;
  const m = hex.trim().replace(/^#/, "");
  if (m.length === 3) {
    const r = parseInt(m[0] + m[0], 16);
    const g = parseInt(m[1] + m[1], 16);
    const b = parseInt(m[2] + m[2], 16);
    return Number.isFinite(r) && Number.isFinite(g) && Number.isFinite(b)
      ? `${r}, ${g}, ${b}`
      : null;
  }
  if (m.length === 6) {
    const r = parseInt(m.slice(0, 2), 16);
    const g = parseInt(m.slice(2, 4), 16);
    const b = parseInt(m.slice(4, 6), 16);
    return Number.isFinite(r) && Number.isFinite(g) && Number.isFinite(b)
      ? `${r}, ${g}, ${b}`
      : null;
  }
  return null;
}
