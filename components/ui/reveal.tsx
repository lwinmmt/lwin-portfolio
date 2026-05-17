"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

// Reveal animation: fade + slide-up + blur-out. The blur is the key
// detail; it catches the eye at the exact moment the section enters
// the viewport, like a camera focusing, which is the moment a recruiter
// is deciding whether to keep reading.
const variants: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.2, 0.7, 0.3, 1] },
  },
};

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
  as?: "div" | "section" | "article";
}) {
  const MotionTag =
    as === "section"
      ? motion.section
      : as === "article"
        ? motion.article
        : motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={variants}
      transition={{ duration: 0.5, ease: [0.2, 0.7, 0.3, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}
