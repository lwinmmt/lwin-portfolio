"use client";

import { LazyMotion, domMax } from "framer-motion";
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
// Net saving vs the default `motion` proxy: ~15-20KB gzipped on
// every page that mounts a motion element.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domMax}>{children}</LazyMotion>;
}
