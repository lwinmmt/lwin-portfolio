"use client";

import { m as motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

// Reveal animation: fade + slide-up + blur-out. The blur is the key
// detail; it catches the eye at the exact moment the section enters
// the viewport, like a camera focusing, which is the moment a recruiter
// is deciding whether to keep reading.
//
// `transition` lives on the element (not inside the variant) so the
// per-instance `delay` prop can stagger reveals. Putting it in both
// places means framer-motion picks one and silently drops the other.
//
// CAUTION: the visible state keeps `filter: blur(0px)` and `transform`,
// which create a containing block for `position: fixed` descendants.
// Don't render a fixed modal/dialog inside a <Reveal> — it will be
// trapped in this stacking context (sidebar / hero switcher will
// appear in front of it). Use createPortal to escape, like the
// lightbox does in components/ui/lightbox.tsx.
const variants: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const EASE = [0.2, 0.7, 0.3, 1] as const;
const DURATION = 0.55;

// Pre-built map of motion components so we do not re-derive the
// MotionTag on every render via a ternary chain.
const MOTION_TAGS = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
} as const;

/**
 * Standardized scroll-reveal wrapper. Wrap any section body in
 * <Reveal>...</Reveal>. The block fades + slides up the first time it
 * enters the viewport. One viewport once flag keeps it from re-firing on
 * scroll-back.
 *
 * Pass `delay` to stagger reveals manually when you do not want a parent
 * variants chain.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: keyof typeof MOTION_TAGS;
}) {
  const MotionTag = MOTION_TAGS[as];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={variants}
      transition={{ duration: DURATION, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}
