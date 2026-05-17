"use client";

import { LazyMotion, MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

// LazyMotion provider that loads the framer-motion feature set
// (animations + transforms + layout animations) once, asynchronously,
// instead of every `motion.*` import pulling its full bundle.
// Consumers should import `m` (the lightweight proxy) and use
// `<m.div>` / `<m.section>` etc. instead of `<motion.div>`.
//
// domMax (not domAnimation) because the sidebar + language switcher
// pills rely on `layoutId` for the sliding-pill effect, and layout
// animations live in the domMax feature pack. Switching to
// domAnimation would silently break those animations.
//
// LAZY FACTORY (not synchronous import): passing a `() => import(...)`
// arrow to `features` is what makes LazyMotion actually code-split.
// Importing `domMax` at the top of this module synchronously and
// passing the object reference defeats the lazy-load entirely — the
// full feature bundle then sits in the root client chunk on every
// page, costing ~15-20KB gzipped.
//
// reducedMotion="user": framer-motion v10+ honours the OS
// prefers-reduced-motion setting and short-circuits transition
// duration/transforms accordingly. Pairs with the CSS-side @media
// (prefers-reduced-motion: reduce) guards in globals.css so both
// JS-driven animations (HeroStage swap, projects-filter
// AnimatePresence, Reveal stagger, layoutId pills) and CSS keyframes
// fall in line for vestibular-sensitive users.
const loadFeatures = () =>
  import("framer-motion").then((mod) => mod.domMax);

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
