"use client";

import { useEffect, useRef } from "react";

/**
 * Hero name H1 with a ruby gradient highlight that follows the cursor
 * horizontally across the parent section. Resting state is solid fg
 * color; on mouse-enter the gradient kicks in and tracks cursor X.
 *
 * The ruby period stays a solid color (separate span) so it remains
 * the visual full-stop regardless of where the gradient is.
 */
export function AnimatedName({ name }: { name: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const section = el.closest("section");
    if (!section) return;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const xPct = ((e.clientX - rect.left) / rect.width) * 100;
      el.style.setProperty(
        "--sweep-x",
        `${Math.max(0, Math.min(100, xPct))}%`,
      );
    };
    const onLeave = () => {
      el.style.setProperty("--sweep-x", "50%");
    };
    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <span
      ref={ref}
      style={{
        // A narrow ruby band that tracks cursor X. Outside the band the
        // text is solid fg color. The band is ~25% wide of the text.
        background:
          "linear-gradient(90deg, var(--color-fg) 0%, var(--color-fg) calc(var(--sweep-x, 50%) - 18%), var(--color-ruby) var(--sweep-x, 50%), var(--color-fg) calc(var(--sweep-x, 50%) + 18%), var(--color-fg) 100%)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
        // Position is set on first interaction; default to centre.
        transition: "background-position 0.05s linear",
      }}
    >
      {name}
    </span>
  );
}
