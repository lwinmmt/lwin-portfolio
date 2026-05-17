"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/lib/i18n/client";
import { LOCALE_NAMES, type Locale } from "@/lib/i18n/types";

// One-shot floating banner that lets a first-time visitor know the
// site is also available in the OTHER language. Without this, the
// EN/VI toggle is tucked at the bottom of the sidebar and skim-only
// visitors never see it.
//
// Behaviour:
//   - Shown bottom-right after a short delay so it doesn't compete
//     with the hero fade-in.
//   - Click "Switch" -> writes the locale cookie + router.refresh()
//     so the page re-renders in the chosen language. Also marks the
//     banner dismissed so it never shows again on this device.
//   - Click "x" -> dismiss without switching.
//   - Dismissal persists via localStorage so refreshing the page
//     does not re-show the banner.
//
// Copy is bilingual on purpose: the visitor sees "Available in
// [other language name]" so the prompt is legible regardless of
// which locale the page is currently rendering in.

const STORAGE_KEY = "lwinmmt-locale-banner-dismissed";

const PROMPT: Record<Locale, { also: string; switchTo: string; dismiss: string }> = {
  en: {
    also: "Có sẵn bằng",
    switchTo: "Chuyển sang",
    dismiss: "Đóng",
  },
  vi: {
    also: "Available in",
    switchTo: "Switch to",
    dismiss: "Dismiss",
  },
};

export function LocalePromptBanner() {
  const locale = useLocale();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [, startTransition] = useTransition();

  useEffect(() => {
    // Check dismissal flag. Only show to first-time visitors.
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      if (dismissed) return;
    } catch {
      // localStorage blocked (private mode etc) — silently skip.
      return;
    }
    // Small delay so the banner doesn't appear during the hero
    // fade-in animation.
    const id = window.setTimeout(() => setVisible(true), 900);
    return () => window.clearTimeout(id);
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    setVisible(false);
  };

  const other: Locale = locale === "vi" ? "en" : "vi";
  const otherName = LOCALE_NAMES[other].long;
  // Copy itself is in the OTHER language so a visitor whose primary
  // tongue is not the current locale recognizes the prompt as
  // addressed to them.
  const copy = PROMPT[locale];

  const switchTo = () => {
    const secure =
      typeof window !== "undefined" && window.location.protocol === "https:"
        ? "; Secure"
        : "";
    document.cookie = `locale=${other}; path=/; max-age=31536000; samesite=lax${secure}`;
    dismiss();
    startTransition(() => {
      router.refresh();
    });
  };

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="glass-overlay animate-fade-up fixed bottom-5 right-5 z-40 hidden max-w-[340px] items-center gap-3 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-card)] px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.08)] sm:flex"
    >
      <span className="font-sans text-[12.5px] leading-tight text-[var(--color-fg-soft)]">
        {copy.also}{" "}
        <span className="font-semibold text-[var(--color-fg)]">
          {otherName}
        </span>
      </span>
      <button
        type="button"
        onClick={switchTo}
        className="rounded-full bg-[var(--color-fg)] px-3 py-1 font-sans text-[11.5px] font-medium text-[var(--color-bg)] transition-colors hover:bg-[var(--color-ruby)]"
      >
        {copy.switchTo}
      </button>
      <button
        type="button"
        onClick={dismiss}
        aria-label={copy.dismiss}
        className="ml-1 -mr-1 flex h-7 w-7 items-center justify-center rounded-full text-[var(--color-fg-faint)] transition-colors hover:bg-[var(--color-hover-mute)] hover:text-[var(--color-fg)]"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
