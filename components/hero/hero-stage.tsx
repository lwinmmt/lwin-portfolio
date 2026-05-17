"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useT } from "@/lib/i18n/client";
import { HeroGlobe } from "./globe";
import { HeroTerminal } from "./terminal";
import type { HeroVariant } from "./hero-variant";

// Hero right-column stage. Two variants:
//   - "globe"    — canvas Fibonacci dot sphere with arc paths
//   - "terminal" — auto-typing mock shell session
//
// Selection rules:
//   - SSR always renders globe. Keeps the server response stable so
//     hydration mismatch is impossible.
//   - On hydration, pick randomly (50/50). Each fresh visit lands on
//     one variant or the other — neither becomes "the" home page.
//   - The small switcher button at the top-right of the stage lets
//     the visitor flip to the other variant in place. No persistence
//     beyond the current page session; a refresh re-randomizes.

export function HeroStage() {
  const t = useT();
  const [variant, setVariant] = useState<HeroVariant>("globe");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Math.random is fine here — this is presentational randomness,
    // not anything security-sensitive.
    setVariant(Math.random() < 0.5 ? "globe" : "terminal");
    setHydrated(true);
  }, []);

  const other: HeroVariant = variant === "globe" ? "terminal" : "globe";

  return (
    // pt-9 reserves a 36px strip above the variant for the switcher
    // pill. Without it the pill landed on the terminal's title bar
    // (rectangular variant — title bar fills the top-right corner)
    // while looking fine against the globe (round, recedes from the
    // corner). Reserving the strip keeps placement consistent across
    // both variants and stops the overlap.
    //
    // `relative` so the switcher can absolutely position into that
    // strip. Stage takes the column's full width on lg+ via the
    // parent grid cell; each variant is mx-auto centered inside it.
    <div className="relative pt-9">
      {/* AnimatePresence mode="wait" — the outgoing variant fades
          out completely before the incoming one fades in, so the
          swap reads as a single smooth transition instead of an
          instant flip. Framer-motion is already loaded for the
          sidebar pills, so no extra bundle cost. */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={variant}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: [0.2, 0.7, 0.3, 1] }}
        >
          {variant === "globe" ? <HeroGlobe /> : <HeroTerminal />}
        </motion.div>
      </AnimatePresence>

      {hydrated && (
        <button
          type="button"
          onClick={() => setVariant(other)}
          aria-label={t("hero.variant.aria").replace("{variant}", other)}
          // Larger touch target + readable text size on mobile.
          // Previous px-2.5 py-1 + text-[9.5px] clocked in at ~18px
          // tall, under the 30px comfortable tap target and below
          // legible uppercase mono size.
          className="absolute right-0 top-0 inline-flex min-h-[30px] items-center gap-1.5 rounded-full border border-[var(--color-border-soft)] bg-[var(--color-surface-2)] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-fg-muted)] shadow-[0_2px_8px_rgba(0,0,0,0.06)] backdrop-blur transition-colors hover:text-[var(--color-fg)]"
        >
          <SwapIcon />
          {other}
        </button>
      )}
    </div>
  );
}

function SwapIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 16V4M7 4 3 8M7 4l4 4M17 8v12m0 0 4-4m-4 4-4-4" />
    </svg>
  );
}
