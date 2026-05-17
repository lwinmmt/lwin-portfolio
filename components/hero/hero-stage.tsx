"use client";

import { useEffect, useState } from "react";
import { HeroGlobe } from "./globe";
import { HeroTerminal } from "./terminal";

// Hero right-column stage. Renders one of two variants:
//   - "globe"    — the canvas Fibonacci dot sphere with arc paths
//   - "terminal" — the mock shell session that auto-types a profile
//
// Choice is persisted in localStorage so refresh keeps the same look.
// The switcher pill renders below the stage and is dev-friendly: a
// single click flips the variant and saves it. Once Lwin settles on
// one, we can delete the switcher + the unused variant.
//
// SSR always renders the globe to keep the server payload stable. If
// the user previously picked terminal, we swap to it after hydration.
// There's a brief flash on first paint, which is fine for iteration —
// the final shipped version will hardcode whichever one wins.

const STORAGE_KEY = "lwin.hero.variant";
type Variant = "globe" | "terminal";
const VARIANTS: Variant[] = ["globe", "terminal"];

export function HeroStage() {
  const [variant, setVariant] = useState<Variant>("globe");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "globe" || saved === "terminal") setVariant(saved);
    } catch {
      // Private mode / storage disabled — fall through with default.
    }
  }, []);

  const select = (next: Variant) => {
    setVariant(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Best-effort persist; the in-memory state still flips.
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {variant === "globe" ? <HeroGlobe /> : <HeroTerminal />}

      {hydrated && (
        <div
          role="tablist"
          aria-label="Hero variant"
          className="inline-flex items-center gap-1 rounded-full border border-[var(--color-border-soft)] bg-[var(--color-surface-2)] p-1 font-mono text-[10px] uppercase tracking-[0.12em] backdrop-blur"
        >
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
      )}
    </div>
  );
}
