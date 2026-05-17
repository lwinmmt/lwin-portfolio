"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useT } from "@/lib/i18n/client";

export type LightboxImage = { src: string; alt: string };

/**
 * Project case-study image gallery with click-to-zoom lightbox.
 *
 * Takes a (large) cover image and an optional list of gallery thumbs.
 * Internally renders the cover, the 3-up gallery grid, AND the lightbox
 * modal, because the parent route is a Server Component and Server
 * Components cannot pass function children (render props) to Client
 * Components.
 *
 * Keyboard: Esc closes. Arrow keys page through. Click outside closes.
 * Body scroll is locked while the modal is open.
 */
export function ProjectLightboxGallery({
  cover,
  gallery,
  title,
}: {
  cover?: LightboxImage;
  gallery?: LightboxImage[];
  title: string;
}) {
  const t = useT();
  const images: LightboxImage[] = [
    ...(cover ? [cover] : []),
    ...(gallery ?? []),
  ];
  const galleryStart = cover ? 1 : 0;
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () =>
      setActive((i) =>
        i === null ? null : (i - 1 + images.length) % images.length,
      ),
    [images.length],
  );
  const next = useCallback(
    () =>
      setActive((i) => (i === null ? null : (i + 1) % images.length)),
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
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, close, prev, next]);

  if (images.length === 0) return null;

  return (
    <>
      {cover && (
        <button
          type="button"
          onClick={() => setActive(0)}
          aria-label={t("lightbox.open.cover").replace("{title}", title)}
          className="group relative mb-8 block aspect-[16/9] w-full cursor-zoom-in overflow-hidden rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-bg-warm)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-ruby)]"
        >
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            priority
            sizes="(max-width: 860px) 100vw, 720px"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <ZoomBadge size="md" />
        </button>
      )}

      {gallery && gallery.length > 0 && (
        <div className="mb-8 grid grid-cols-3 gap-2">
          {gallery.map((img, idx) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setActive(galleryStart + idx)}
              aria-label={t("lightbox.open.photo")
                .replace("{title}", title)
                .replace("{n}", String(idx + 1))}
              className="group relative aspect-[4/3] cursor-zoom-in overflow-hidden rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-bg-warm)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-ruby)]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 860px) 33vw, 220px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <ZoomBadge size="sm" />
            </button>
          ))}
        </div>
      )}

      {active !== null && (
        <LightboxModal
          image={images[active]}
          index={active}
          total={images.length}
          onClose={close}
          onPrev={prev}
          onNext={next}
          labels={{
            dialog: t("lightbox.aria.viewer"),
            close: t("lightbox.close"),
            prev: t("lightbox.previous"),
            next: t("lightbox.next"),
          }}
        />
      )}
    </>
  );
}

function ZoomBadge({ size }: { size: "sm" | "md" }) {
  const dim = size === "sm" ? "h-6 w-6 right-2 top-2" : "h-7 w-7 right-3 top-3";
  const icon = size === "sm" ? 11 : 13;
  return (
    <span
      aria-hidden="true"
      className={`absolute ${dim} inline-flex items-center justify-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100`}
    >
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
      </svg>
    </span>
  );
}

function LightboxModal({
  image,
  index,
  total,
  onClose,
  onPrev,
  onNext,
  labels,
}: {
  image: LightboxImage;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  labels: { dialog: string; close: string; prev: string; next: string };
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={labels.dialog}
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
        aria-label={labels.close}
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
            aria-label={labels.prev}
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
            aria-label={labels.next}
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
