"use client";

import createGlobe, { type COBEOptions } from "cobe";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

// Cobe-backed globe (~5KB WebGL, same family as Stripe / Vercel / fly.io).
// Cobe renders continent-shaped dot distributions directly on a canvas
// using an internal landmass sampler.
//
// Decorative only: no markers, no arcs, no city chips. The previous
// 3-hub narrative (Yangon / Singapore / HCMC linked by arcs) read as
// over-explained. A clean rotating dot sphere does more work for less
// space.
//
// Wires: theme-aware colors, drag-to-rotate, auto-rotate when idle,
// prefers-reduced-motion (no auto-rotate), IntersectionObserver pause
// when scrolled off-screen.

// Cobe v2's type definitions omit `onRender` even though the runtime
// API uses it. Augment locally so the callback typechecks.
type CobeOptionsWithOnRender = COBEOptions & {
  onRender?: (state: Record<string, number>) => void;
};

const DISPLAY_SIZE = 520;
const INITIAL_PHI = 4.6; // SE Asia roughly under the camera at first paint
const AUTO_ROTATE_SPEED = 0.0028; // radians per frame
const DRAG_SENSITIVITY = 0.005; // pixels to radians

export function HeroGlobe() {
  const { resolvedTheme } = useTheme();
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

  // Create the Cobe globe. Recreated on theme change so baseColor and
  // glowColor pick up the right palette.
  useEffect(() => {
    if (!canvasRef.current || !mounted) return;
    const canvas = canvasRef.current;
    const isDark = resolvedTheme === "dark";

    // RGB triplets in 0..1. The KEY insight from the previous broken
    // version: baseColor must be a DESATURATED color, not ruby. Cobe
    // multiplies baseColor by mapBrightness across thousands of land
    // samples; a saturated value blobs into a solid sphere. Use a
    // warm-gray that contrasts subtly with the bg.
    const baseColor: [number, number, number] = isDark
      ? [0.55, 0.50, 0.46] // warm light gray on the dark sphere
      : [0.40, 0.36, 0.32]; // warm dark gray on the light sphere

    // glowColor is the atmospheric halo. Should match the surrounding
    // page background so the sphere edge dissolves into the page.
    const glowColor: [number, number, number] = isDark
      ? [0.10, 0.09, 0.08] // bg-warm dark = #1A1815
      : [0.96, 0.95, 0.92]; // bg-warm light = #F4F1EA

    let phi = INITIAL_PHI;
    let phiOffset = 0;
    let dragging = false;
    let dragStartX = 0;
    let dragStartPhi = 0;

    const options: CobeOptionsWithOnRender = {
      devicePixelRatio:
        typeof window !== "undefined" ? window.devicePixelRatio : 2,
      width: DISPLAY_SIZE * 2,
      height: DISPLAY_SIZE * 2,
      phi: INITIAL_PHI,
      theta: 0.28, // slight forward tilt of the north pole
      dark: isDark ? 1 : 0,
      diffuse: 1.2,
      mapSamples: 16000,
      // Low mapBrightness keeps individual dots visible instead of
      // blobbing into a sphere. 1.2 matches the Vercel / fly.io look.
      mapBrightness: 1.2,
      baseColor,
      // Unused (no markers), but COBEOptions requires the field. Match
      // baseColor so any accidental marker would not look out of place.
      markerColor: baseColor,
      glowColor,
      markers: [],
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
