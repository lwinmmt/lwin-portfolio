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

// Globe is decorative only. No markers (the earlier red markers read as
// jarring against the cream page), no arcs, no city narrative.

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

    // Warm-gray palette that integrates with the cream page bg. In
    // light mode (`dark: 0`), Cobe inverts the rendering so continents
    // show up as DARK dots on the LIGHT sphere set by glowColor.
    const baseColor: [number, number, number] = [0.22, 0.20, 0.18]; // warm dark gray dots
    const glowColor: [number, number, number] = [0.96, 0.95, 0.92]; // cream halo, matches bg-warm

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
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor,
      markerColor: baseColor,
      glowColor,
      markers: [],
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
