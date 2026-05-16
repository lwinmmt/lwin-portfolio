"use client";

import { useRef, useState } from "react";

type EmailButtonProps = {
  email: string;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
  /** Position of the copied-tooltip relative to the trigger. */
  tooltipPlacement?: "top" | "right";
  /** Override the wrapper layout. Use "block" for nav rows that should fill width. */
  layout?: "inline" | "block";
};

/**
 * Click behavior:
 *   1. Always copy the email to the clipboard so the user can paste it.
 *   2. Also fire the default mailto: navigation. If the user has a mail
 *      client configured, the compose window opens. If not, they still got
 *      the address from the clipboard and see a "Copied" toast.
 *
 * This solves the broken-mailto frustration without breaking native behavior
 * for users who do have a client set up.
 */
export function EmailButton({
  email,
  className,
  children,
  ariaLabel,
  tooltipPlacement = "top",
  layout = "inline",
}: EmailButtonProps) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function handleClick() {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
        setCopied(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Clipboard blocked. Mailto still fires below.
    }
  }

  // Position the toast relative to the trigger.
  const positionBase =
    tooltipPlacement === "right"
      ? "left-full top-1/2 -translate-y-1/2 ml-3"
      : "bottom-full left-1/2 -translate-x-1/2 mb-2";

  // Active/inactive state lives in its own pair of transforms that do not
  // conflict with the position base above. Tailwind's class merging would
  // otherwise pick the last translate-* and we would lose the slide-in.
  const stateClass = copied
    ? "opacity-100 scale-100"
    : "opacity-0 scale-95 pointer-events-none";

  const wrapperLayout =
    layout === "block" ? "relative flex w-full" : "relative inline-flex";

  return (
    <span className={wrapperLayout}>
      <a
        href={`mailto:${email}`}
        onClick={handleClick}
        className={className}
        aria-label={ariaLabel ?? `Email ${email}`}
        title={email}
      >
        {children}
      </a>
      <span
        aria-live="polite"
        className={`pointer-events-none absolute z-50 whitespace-nowrap rounded-md bg-[var(--color-fg)] px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-bg)] shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-200 ${positionBase} ${stateClass}`}
      >
        Copied {email}
      </span>
    </span>
  );
}
