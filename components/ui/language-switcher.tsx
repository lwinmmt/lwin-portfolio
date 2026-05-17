"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { m as motion } from "framer-motion";
import { useLocale, useT } from "@/lib/i18n/client";
import { writeLocaleCookie } from "@/lib/i18n/cookie";
import { LOCALES, LOCALE_NAMES, type Locale } from "@/lib/i18n/types";

// Sidebar language switcher. Pill matching the theme toggle's visual
// pattern. Writes the locale cookie and refreshes so the server re-reads
// it on next request.
//
// Visible swap animation is handled in components/layout/locale-swap.tsx:
// it keys the main content wrapper by the current locale, so when the
// server re-render lands, React unmounts the old subtree and mounts the
// new one, replaying the .locale-fade-in keyframe (fade + slide + blur).
// The sidebar lives outside the swap and stays still through the flip.

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const t = useT();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: Locale) => {
    if (next === locale || isPending) return;
    writeLocaleCookie(next);
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div
      className="relative mt-2 flex gap-1 rounded-[10px] bg-[var(--color-hover-mute)] p-1"
      aria-label={t("switcher.aria")}
    >
      {LOCALES.map((l) => {
        const isActive = locale === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => switchTo(l)}
            className={
              "relative flex-1 rounded-[7px] py-1.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.12em] transition-colors " +
              (isActive
                ? "text-[var(--color-fg)]"
                : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]")
            }
            aria-pressed={isActive}
            aria-label={LOCALE_NAMES[l].long}
          >
            {/* Sliding active background. layoutId tells framer-motion
                this is the same element across renders, so when the
                active button changes the pill animates to the new
                position instead of swapping instantly. */}
            {isActive && (
              <motion.span
                layoutId="locale-switch-pill"
                aria-hidden="true"
                className="absolute inset-0 rounded-[7px] bg-[var(--color-bg-card)] shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 32,
                  mass: 0.7,
                }}
              />
            )}
            <span className="relative z-10">{LOCALE_NAMES[l].short}</span>
          </button>
        );
      })}
    </div>
  );
}
