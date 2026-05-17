// Shared constants for the hero variant switcher. Kept in a plain TS
// module (no "use client") so both the floating switcher and the hero
// stage can import without dragging client-only imports through their
// module graphs.

export type HeroVariant = "globe" | "terminal";

export const HERO_VARIANT_STORAGE_KEY = "lwin.hero.variant";

// Custom event dispatched on the window when the switcher flips the
// variant. The hero stage listens for this so it can update in place
// without a page reload. Native storage events only fire across tabs,
// not within the same tab, so we need our own bus.
export const HERO_VARIANT_EVENT = "lwin:hero-variant-change";
