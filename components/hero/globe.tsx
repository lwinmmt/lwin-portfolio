"use client";

import createGlobe from "cobe";
import { useEffect, useRef, useState } from "react";

// Cobe-backed globe restyled toward the Aceternity / GitHub aesthetic:
// deep navy continents, blue atmospheric halo, brighter dot definition.
// Stays at ~5KB instead of the 380KB three.js + three-globe + R3F path,
// which has three confirmed failure modes under Next.js 16 + Turbopack.
//
// Globe is forced to its own dark navy palette regardless of page
// theme; like Aceternity, it is a distinct object that contrasts
// against its container rather than blending.
//
// Markers are decorative only: six small ruby pulses scattered across
// world cities, no labels, no arcs, no implied narrative. The earlier
// 3-hub story ("born / schooled / working linked by arcs") was rejected.
//
// Wires: drag-to-rotate, auto-rotate when idle, prefers-reduced-motion
// (no auto-rotate), IntersectionObserver pause when scrolled off-screen.
//
// IMPORTANT: Cobe v2 does NOT support the `onRender` callback that v1
// had (and that the README example still shows). In v2 you must call
// `globe.update({ phi: ... })` from your own RAF loop or the globe
// renders exactly once at init and never animates.

const DISPLAY_SIZE = 420;
const INITIAL_PHI = 4.6; // SE Asia roughly under the camera at first paint
const AUTO_ROTATE_SPEED = 0.0028; // radians per frame
const DRAG_SENSITIVITY = 0.005; // pixels to radians

// Decorative markers. Six cities spread across continents so the globe
// always has at least 2 to 3 visible regardless of rotation. Ruby color
// matches the page accent. No labels, no narrative.
const RUBY: [number, number, number] = [0.72, 0.23, 0.17];
const DECOR_MARKERS = [
  { location: [35.68, 139.76] as [number, number], size: 0.05, color: RUBY }, // Tokyo
  { location: [1.35, 103.82] as [number, number], size: 0.06, color: RUBY }, // Singapore
  { location: [-33.87, 151.21] as [number, number], size: 0.04, color: RUBY }, // Sydney
  { location: [51.5, -0.12] as [number, number], size: 0.05, color: RUBY }, // London
  { location: [40.71, -74.0] as [number, number], size: 0.06, color: RUBY }, // New York
  { location: [-23.55, -46.63] as [number, number], size: 0.04, color: RUBY }, // Sao Paulo
];

export function HeroGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const visibleRef = useRef(true);
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setMounted(true);
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

  // Create the Cobe globe. Forced dark palette regardless of page
  // theme so the globe stays visually distinct (Aceternity move).
  useEffect(() => {
    if (!canvasRef.current || !mounted) return;
    const canvas = canvasRef.current;

    // Aceternity-style palette: deep navy continents on a slightly
    // brighter navy sphere, with a blue atmospheric halo. `dark: 1`
    // tells Cobe to render dots DIRECTLY (bright dots on dark sphere)
    // rather than inverted (the light-mode mode).
    const baseColor: [number, number, number] = [0.35, 0.55, 0.95]; // bright blue continents
    const glowColor: [number, number, number] = [0.05, 0.12, 0.4]; // deep blue halo

    let phi = INITIAL_PHI;
    let phiOffset = 0;
    let dragging = false;
    let dragStartX = 0;
    let dragStartPhi = 0;

    const globe = createGlobe(canvas, {
      devicePixelRatio:
        typeof window !== "undefined" ? window.devicePixelRatio : 2,
      width: DISPLAY_SIZE * 2,
      height: DISPLAY_SIZE * 2,
      phi: INITIAL_PHI,
      theta: 0.3,
      dark: 1,
      diffuse: 1.5,
      // Denser sampling for sharper continent shapes. 32k vs 16k is
      // free at this size since Cobe samples in a shader.
      mapSamples: 32000,
      mapBrightness: 8,
      baseColor,
      markerColor: RUBY,
      glowColor,
      markers: DECOR_MARKERS,
    });

    // Manual RAF loop. Cobe v2 needs explicit update() calls; without
    // this the globe renders exactly once at init and stays frozen.
    let rafId = 0;
    const tick = () => {
      if (visibleRef.current) {
        if (!dragging && !reduced) phi += AUTO_ROTATE_SPEED;
      }
      globe.update({ phi: phi + phiOffset });
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

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
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", endDrag);
      canvas.removeEventListener("pointercancel", endDrag);
      canvas.removeEventListener("pointerleave", endDrag);
      globe.destroy();
    };
  }, [mounted, reduced]);

  return (
    <div
      ref={wrapperRef}
      className="mx-auto"
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
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
