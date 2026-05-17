"use client";

import createGlobe from "cobe";
import { useEffect, useRef, useState } from "react";

// Cobe globe (~5KB WebGL). Falls back from the attempted three.js +
// react-globe.gl integration which crashed on h3-js polygon
// decomposition (the hex computation library three-globe uses
// internally cannot handle certain Natural Earth polygons even after
// filtering antimeridian-crossing countries).
//
// To revisit the three.js path: read /tmp/cobe-vs-threejs-notes.md
// (not committed) or git log for the abandoned attempt. The fix is
// either (a) write custom three.js without three-globe's hex layer,
// or (b) use polygonsData instead of hexPolygonsData.
//
// Cobe v2: needs manual globe.update({ phi }) in a RAF loop. The
// `onRender` callback only existed in v1.

const DISPLAY_SIZE = 380;
const INITIAL_PHI = 4.6;
const AUTO_ROTATE_SPEED = 0.0028;
const DRAG_SENSITIVITY = 0.005;

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

  useEffect(() => {
    if (!canvasRef.current || !mounted) return;
    const canvas = canvasRef.current;

    // Warm-gray palette that integrates with the cream page bg.
    // dark: 0 inverts the rendering so continents appear as DARK dots
    // on the LIGHT cream sphere set by glowColor.
    const baseColor: [number, number, number] = [0.22, 0.20, 0.18];
    const glowColor: [number, number, number] = [0.96, 0.95, 0.92];

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
