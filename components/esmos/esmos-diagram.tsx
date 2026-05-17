"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";

const SVG_PATH = "/diagrams/esmos-architecture.svg";

function ZoomControls() {
  const { zoomIn, zoomOut, resetTransform } = useControls();
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
        onClick={() => resetTransform()}
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

  const close = useCallback(() => setOpen(false), []);

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
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = original;
      // Return focus to the trigger when the modal closes.
      triggerRef.current?.focus();
    };
  }, [open, close]);

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
          <div className="relative flex-1 overflow-hidden rounded-lg bg-white">
            {/*
              react-zoom-pan-pinch v4 quirks worth preserving:
              - The SVG is 5237x3248 at natural size; initialScale 0.18
                fits the whole thing into a typical desktop viewport at
                first paint, then the user zooms IN.
              - smoothStep is gone in v4; use a single `step` for wheel.
              - DO NOT pass contentClass forcing h-full/w-full. The img
                needs its natural dimensions so the wrapper can compute
                the correct centered transform; constraining the content
                box made the diagram render off-screen.
            */}
            <TransformWrapper
              initialScale={0.18}
              minScale={0.15}
              maxScale={6}
              wheel={{ step: 0.15 }}
              pinch={{ step: 5 }}
              doubleClick={{ mode: "zoomIn", step: 0.6 }}
              limitToBounds={false}
              centerOnInit
            >
              <ZoomControls />
              <TransformComponent
                wrapperClass="!h-full !w-full"
                wrapperStyle={{ height: "100%", width: "100%" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={SVG_PATH}
                  alt="ESMOS multi-cloud APAC architecture v9.4, full size"
                  className="block max-w-none select-none"
                  draggable={false}
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
