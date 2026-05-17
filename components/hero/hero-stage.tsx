"use client";

import { useEffect, useState } from "react";
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
    // `relative` so the switcher button can absolutely position against
    // the stage's top-right. Stage takes the column's full width on
    // lg+ via the parent grid cell; each variant is mx-auto centered
    // inside it.
    <div className="relative">
      {variant === "globe" ? <HeroGlobe /> : <HeroTerminal />}

      {hydrated && (
        <button
          type="button"
          onClick={() => setVariant(other)}
          aria-label={`Switch to ${other} variant`}
          // z-10 keeps the button above the canvas / terminal chrome.
          // bg-white/backdrop-blur lets it work cleanly against both
          // the light card (globe) and dark terminal title bar.
          className="absolute right-0 top-0 z-10 inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border-soft)] bg-[var(--color-surface-2)] px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.12em] text-[var(--color-fg-muted)] shadow-[0_2px_8px_rgba(0,0,0,0.06)] backdrop-blur transition-colors hover:text-[var(--color-fg)]"
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
