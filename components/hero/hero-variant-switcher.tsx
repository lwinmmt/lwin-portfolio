"use client";

import { useEffect, useState } from "react";
import {
  HERO_VARIANT_EVENT,
  HERO_VARIANT_STORAGE_KEY,
  type HeroVariant,
} from "./hero-variant";

// Temporary dev affordance: floating bottom-right pill that flips the
// hero variant between globe and terminal. Lives at the layout level
// so it's reachable from any page, not just /. Once the chosen
// variant is locked in, delete this component, its mount in
// layout.tsx, the unused variant component, and HeroStage's variant
// switching logic.

const VARIANTS: HeroVariant[] = ["globe", "terminal"];

export function HeroVariantSwitcher() {
  const [variant, setVariant] = useState<HeroVariant>("globe");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    try {
      const saved = window.localStorage.getItem(HERO_VARIANT_STORAGE_KEY);
      if (saved === "globe" || saved === "terminal") setVariant(saved);
    } catch {
      // Private mode / storage disabled — fall through with default.
    }
  }, []);

  const select = (next: HeroVariant) => {
    setVariant(next);
    try {
      window.localStorage.setItem(HERO_VARIANT_STORAGE_KEY, next);
    } catch {
      // Best-effort persist.
    }
    window.dispatchEvent(
      new CustomEvent(HERO_VARIANT_EVENT, { detail: next }),
    );
  };

  // Hydration gate: avoid mismatching the SSR'd null with the post-
  // hydration pill. The switcher is a dev affordance, so a flash-in is
  // acceptable.
  if (!hydrated) return null;

  return (
    <div
      role="tablist"
      aria-label="Hero variant (dev preview)"
      className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-1 rounded-full border border-[var(--color-border-soft)] bg-[var(--color-surface-2)] p-1 font-mono text-[10px] uppercase tracking-[0.12em] shadow-[0_8px_24px_rgba(0,0,0,0.12)] backdrop-blur"
    >
      <span
        aria-hidden="true"
        className="px-2 text-[9px] text-[var(--color-fg-faint)]"
      >
        hero
      </span>
      {VARIANTS.map((v) => {
        const active = v === variant;
        return (
          <button
            key={v}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => select(v)}
            className={`rounded-full px-3 py-1 transition-colors ${
              active
                ? "bg-[var(--color-fg)] text-[var(--color-bg)]"
                : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
            }`}
          >
            {v}
          </button>
        );
      })}
    </div>
  );
}
