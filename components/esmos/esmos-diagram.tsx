"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
  type ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";

const SVG_PATH = "/diagrams/esmos-architecture.svg";
// Natural dimensions of the Eraser-exported SVG. Hardcoded so we can
// compute the fit-to-viewport scale before the image finishes loading.
const SVG_NATURAL_W = 5237;
const SVG_NATURAL_H = 3248;

function ZoomControls({ onReset }: { onReset: () => void }) {
  const { zoomIn, zoomOut } = useControls();
  return (
    <div className="pointer-events-auto absolute right-3 top-3 z-10 flex items-center gap-1 rounded-lg border border-white/10 bg-[rgba(15,23,42,0.7)] p-1 backdrop-blur">
      <button
        type="button"
        onClick={() => zoomIn()}
        className="rounded px-2.5 py-1 font-mono text-[12px] text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        aria-label="Zoom in"
      >
        +
      </button>
      <button
        type="button"
        onClick={() => zoomOut()}
        className="rounded px-2.5 py-1 font-mono text-[12px] text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        aria-label="Zoom out"
      >
        &minus;
      </button>
      <button
        type="button"
        onClick={onReset}
        className="rounded px-2 py-1 font-mono text-[9.5px] uppercase tracking-[0.12em] text-white/80 transition-colors hover:bg-white/10 hover:text-white"
      >
        Reset
      </button>
    </div>
  );
}

/**
 * ESMOS architecture diagram.
 * Renders the Eraser-exported SVG inline at full width, with a
 * click-to-fullscreen modal for inspecting detail. The modal uses
 * react-zoom-pan-pinch so pinch-zoom, scroll-wheel zoom, and pan-drag
 * all work consistently across desktop and mobile.
 */
export function ESMOSDiagram() {
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  // The pan/zoom canvas wrapper (white rounded area inside the modal).
  // Measured to compute the fit-to-viewport transform on open.
  const stageRef = useRef<HTMLDivElement | null>(null);
  // Imperative handle from react-zoom-pan-pinch. We use it to push an
  // explicit transform when the modal opens; the library's
  // `centerOnInit` ran with zero-size content (img loaded async) and
  // left the diagram pinned at (0, 0) so the user saw a blank canvas
  // until they dragged.
  const transformRef = useRef<ReactZoomPanPinchRef | null>(null);

  const close = useCallback(() => setOpen(false), []);

  // Recenters the diagram at a scale that fits it entirely inside the
  // stage with a small margin. Called when the modal opens AND when
  // the inline img reports onLoad (in case the natural dimensions hint
  // arrived before the stage was laid out).
  const fitToView = useCallback(() => {
    const stage = stageRef.current;
    const ref = transformRef.current;
    if (!stage || !ref) return;
    const cw = stage.clientWidth;
    const ch = stage.clientHeight;
    if (cw <= 0 || ch <= 0) return;
    // 0.95 leaves visible breathing room around the diagram so it
    // doesn't crash into the rounded container edges.
    const scale = Math.min(cw / SVG_NATURAL_W, ch / SVG_NATURAL_H) * 0.95;
    const x = (cw - SVG_NATURAL_W * scale) / 2;
    const y = (ch - SVG_NATURAL_H * scale) / 2;
    ref.setTransform(x, y, scale, 0);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Move keyboard focus into the modal for screen readers and keyboard users.
    modalRef.current?.focus();
    // Defer one frame so the stage has been laid out before we measure.
    const raf = requestAnimationFrame(fitToView);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = original;
      cancelAnimationFrame(raf);
      // Return focus to the trigger when the modal closes.
      triggerRef.current?.focus();
    };
  }, [open, close, fitToView]);

  return (
    <>
      <figure className="overflow-hidden rounded-2xl border border-[var(--color-border-default)] bg-white">
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          className="block w-full cursor-zoom-in"
          aria-label="Open ESMOS architecture diagram full size"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={SVG_PATH}
            alt="ESMOS multi-cloud APAC architecture v9.4"
            className="block h-auto w-full"
          />
        </button>
        <figcaption className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 border-t border-[var(--color-border-soft)] bg-[var(--color-bg-warm)] px-4 py-2.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-muted)]">
            Architecture v9.4 · Authored in Eraser
          </span>
          <span className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-soft)]">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="transition-colors hover:text-[var(--color-ruby)]"
            >
              Open full size
            </button>
            <a
              href={SVG_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[var(--color-ruby)]"
            >
              Raw SVG
            </a>
          </span>
        </figcaption>
      </figure>

      {open && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="esmos-diagram-title"
          tabIndex={-1}
          className="fixed inset-0 z-50 flex flex-col bg-[rgba(15,23,42,0.92)] p-4 outline-none backdrop-blur-sm"
        >
          <div className="mb-3 flex items-center justify-between">
            <span
              id="esmos-diagram-title"
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/80"
            >
              ESMOS architecture v9.4
            </span>
            <button
              type="button"
              onClick={close}
              className="rounded-full bg-white px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg)] transition-colors hover:bg-[var(--color-ruby)] hover:text-white"
            >
              Close (Esc)
            </button>
          </div>
          <div
            ref={stageRef}
            className="relative flex-1 overflow-hidden rounded-lg bg-white"
          >
            {/*
              react-zoom-pan-pinch v4 quirks worth preserving:
              - The SVG is 5237x3248 at natural size. We compute the
                fit-to-stage scale imperatively on open (see fitToView
                in the effect above) instead of relying on a hardcoded
                initialScale, which was wrong on most viewports and
                left the user with a blank canvas to drag around.
              - smoothStep is gone in v4; use a single `step` for wheel.
              - Explicit width/height on the img reserves layout space
                so the wrapper can compute its content box immediately
                instead of waiting for the SVG to fetch + parse.
            */}
            <TransformWrapper
              ref={transformRef}
              initialScale={1}
              minScale={0.05}
              maxScale={6}
              wheel={{ step: 0.15 }}
              pinch={{ step: 5 }}
              doubleClick={{ mode: "zoomIn", step: 0.6 }}
              limitToBounds={false}
            >
              <ZoomControls onReset={fitToView} />
              <TransformComponent
                wrapperClass="!h-full !w-full"
                wrapperStyle={{ height: "100%", width: "100%" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={SVG_PATH}
                  alt="ESMOS multi-cloud APAC architecture v9.4, full size"
                  width={SVG_NATURAL_W}
                  height={SVG_NATURAL_H}
                  className="block max-w-none select-none"
                  draggable={false}
                  onLoad={fitToView}
                />
              </TransformComponent>
            </TransformWrapper>
          </div>
          <div className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">
            Pinch or scroll to zoom · drag to pan · double-click
            to zoom in · Esc to close
          </div>
        </div>
      )}
    </>
  );
}
