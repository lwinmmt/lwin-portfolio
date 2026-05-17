"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  coverPosition,
}: {
  cover?: LightboxImage;
  gallery?: LightboxImage[];
  title: string;
  /** Optional CSS object-position override for the inline cover
   *  image on the project page (NOT the modal — modal uses
   *  object-contain so the whole image always shows). Used when the
   *  source photo is portrait and the subject is not at the top,
   *  e.g. the Osiris booth photo where faces sit in the middle. */
  coverPosition?: string;
}) {
  const t = useT();
  const images: LightboxImage[] = [
    ...(cover ? [cover] : []),
    ...(gallery ?? []),
  ];
  const galleryStart = cover ? 1 : 0;
  const [active, setActive] = useState<number | null>(null);
  // Portal needs document.body, which is undefined during SSR. Defer
  // mounting until after hydration so createPortal doesn't crash.
  const [portalReady, setPortalReady] = useState(false);
  useEffect(() => setPortalReady(true), []);

  // Remember which element opened the lightbox so focus can return
  // there on close. Required by WCAG 2.4.3 (Focus Order). Without
  // this, Escape leaves focus on document.body and the keyboard
  // user loses their place in the page.
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const openAt = useCallback((index: number) => {
    if (typeof document !== "undefined") {
      lastFocusedRef.current = document.activeElement as HTMLElement | null;
    }
    setActive(index);
  }, []);

  const close = useCallback(() => {
    setActive(null);
    // Restore focus on next tick — after the modal is unmounted the
    // last-focused element is back in the document and focusable.
    queueMicrotask(() => lastFocusedRef.current?.focus());
  }, []);
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
          onClick={() => openAt(0)}
          aria-label={t("lightbox.open.cover").replace("{title}", title)}
          className="group relative mb-8 block aspect-[16/9] w-full cursor-zoom-in overflow-hidden rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-bg-warm)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-ruby)]"
        >
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            priority
            sizes="(max-width: 860px) 100vw, 720px"
            // Default `object-top` keeps the top of dashboard / chart
            // screenshots in view, but for subject photos with the face
            // mid-frame (Osiris booth) we honor an explicit
            // coverPosition so the head stays in the crop.
            style={
              coverPosition ? { objectPosition: coverPosition } : undefined
            }
            className={`object-cover transition-transform duration-500 group-hover:scale-[1.02] ${
              coverPosition ? "" : "object-top"
            }`}
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
              onClick={() => openAt(galleryStart + idx)}
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

      {/* Portal the modal directly to document.body so it escapes
          this page's stacking context. Without the portal, the page
          wrapper (LocaleSwap) applies a `filter: blur(0)` post-
          animation which creates a containing block for fixed
          descendants — the modal would only cover the page body, NOT
          the sidebar or the hero variant switcher. */}
      {portalReady &&
        active !== null &&
        createPortal(
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
          />,
          document.body,
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
      // Solid backdrop with NO fade-in. The previous animate-fade-in
      // ran the 97%-opaque black up from opacity 0 over 600ms, which
      // meant the page bled through for the entire fade — the exact
      // "did the click do anything?" perception bug the solid colour
      // was supposed to fix. Backdrop is now opaque from frame one;
      // the image inside gets its own quick fade if any.
      //
      // z-[70] sits above z-[60] (cmd palette) and z-50 (hero variant
      // switcher) so the modal always wins the stacking war. The
      // sidebar at z-40 and the locale prompt at z-40 are also below.
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(8,8,8,0.97)] p-6"
    >
      {/* Plain img: the source images are already optimized webp/avif
          at sensible sizes. Going through next/image with width+height
          forces an intrinsic ratio that does not match every photo. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        alt={image.alt}
        onClick={(e) => e.stopPropagation()}
        className="block max-h-[88vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
      />

      {/* Close pill in the top-right. White-on-black with an explicit
          "Close (Esc)" label so it reads as a button at a glance —
          the previous bg-white/10 icon-only sat almost invisibly
          against the 97%-opaque black backdrop. */}
      <button
        type="button"
        onClick={onClose}
        aria-label={labels.close}
        // Safe-area inset on top so the pill clears notch / dynamic
        // island on iOS. min-h-11 satisfies the 44px touch target.
        style={{ top: "max(20px, env(safe-area-inset-top))" }}
        className="absolute right-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg)] shadow-lg transition-colors hover:bg-[var(--color-ruby)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 18 18 6M6 6l12 12" />
        </svg>
        {labels.close} (Esc)
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
