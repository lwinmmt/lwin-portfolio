"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";

export type LightboxImage = { src: string; alt: string };

/**
 * Lightbox group. Owns the active-index state and renders the modal,
 * but delegates the visible thumbnail layout to a render prop so the
 * cover image and the gallery thumbs can use the same lightbox while
 * keeping their own visual treatment.
 *
 * Keyboard: Esc closes. Arrow keys page through images.
 * Click outside the image closes. Body scroll is locked while open.
 */
export function LightboxGroup({
  images,
  children,
}: {
  images: LightboxImage[];
  children: (open: (index: number) => void) => ReactNode;
}) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () => setActive((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length],
  );
  const next = useCallback(
    () => setActive((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    // Lock background scroll while the modal is open so wheel events
    // do not scroll the page behind the overlay.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, close, prev, next]);

  return (
    <>
      {children((idx) => setActive(idx))}
      {active !== null && (
        <LightboxModal
          image={images[active]}
          index={active}
          total={images.length}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
}

function LightboxModal({
  image,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  image: LightboxImage;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6 backdrop-blur-sm animate-fade-in"
    >
      <div className="relative max-h-full max-w-full" onClick={(e) => e.stopPropagation()}>
        {/* Plain img: the source images are already optimized webp/avif at
            sensible sizes. Going through next/image with width+height
            forces a known intrinsic ratio that does not match every photo. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          alt={image.alt}
          className="block max-h-[88vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
        />
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close image viewer"
        className="absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next image"
            className="absolute right-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-white">
            {index + 1} / {total}
          </div>
        </>
      )}
    </div>
  );
}
