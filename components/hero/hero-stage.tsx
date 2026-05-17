"use client";

import { useEffect, useState } from "react";
import { HeroGlobe } from "./globe";
import { HeroTerminal } from "./terminal";
import {
  HERO_VARIANT_STORAGE_KEY,
  HERO_VARIANT_EVENT,
  type HeroVariant,
} from "./hero-variant";

// Hero right-column stage. Renders one of two variants:
//   - "globe"    — the canvas Fibonacci dot sphere with arc paths
//   - "terminal" — the mock shell session that auto-types a profile
//
// The switcher is rendered separately by HeroVariantSwitcher, which
// lives at the layout level (floating bottom-right) so it doesn't
// compete with the hero chips for column space. Both components share
// the same localStorage key and listen for a CustomEvent so a click on
// the switcher updates the stage in-place without a reload.

export function HeroStage() {
  const [variant, setVariant] = useState<HeroVariant>("globe");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(HERO_VARIANT_STORAGE_KEY);
      if (saved === "globe" || saved === "terminal") setVariant(saved);
    } catch {
      // Private mode / storage disabled — fall through with default.
    }

    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<HeroVariant>).detail;
      if (detail === "globe" || detail === "terminal") setVariant(detail);
    };
    window.addEventListener(HERO_VARIANT_EVENT, onChange);
    return () => window.removeEventListener(HERO_VARIANT_EVENT, onChange);
  }, []);

  return variant === "globe" ? <HeroGlobe /> : <HeroTerminal />;
}
