"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useLocale, useT } from "@/lib/i18n/client";
import { LOCALES, LOCALE_NAMES, type Locale } from "@/lib/i18n/types";

// Sidebar language switcher. Pill matching the theme toggle's visual
// pattern. Writes the locale cookie and refreshes so the server re-reads
// it on next request.
//
// The switch wraps the cookie write + router.refresh() in
// document.startViewTransition when available, so the browser captures
// snapshots of the old and new DOM and cross-fades between them.
// Falls back to a plain refresh on browsers without the API.

type DocumentWithViewTransition = Document & {
  startViewTransition?: (cb: () => void | Promise<void>) => {
    finished: Promise<void>;
  };
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const t = useT();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: Locale) => {
    if (next === locale || isPending) return;
    const apply = () => {
      document.cookie = `locale=${next}; path=/; max-age=31536000; samesite=lax`;
      startTransition(() => {
        router.refresh();
      });
    };
    const doc = document as DocumentWithViewTransition;
    if (typeof doc.startViewTransition === "function") {
      doc.startViewTransition(() => {
        apply();
        // Give the refresh a beat to land before the transition resolves
        // and the cross-fade completes. Long enough for the server
        // response, short enough that the user does not perceive lag.
        return new Promise<void>((resolve) => {
          window.setTimeout(resolve, 280);
        });
      });
      return;
    }
    apply();
  };

  return (
    <div
      className="mt-2 flex gap-1 rounded-[10px] bg-[var(--color-hover-mute)] p-1"
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
              "flex-1 rounded-[7px] py-1.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.12em] transition-colors " +
              (isActive
                ? "bg-[var(--color-bg-card)] text-[var(--color-fg)] shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]")
            }
            aria-pressed={isActive}
            aria-label={LOCALE_NAMES[l].long}
          >
            {LOCALE_NAMES[l].short}
          </button>
        );
      })}
    </div>
  );
}
