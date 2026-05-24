"use client";

import { useEffect, useRef, useState } from "react";
import { useT } from "@/lib/i18n/client";

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
 *   - Copy the email to the clipboard, show the "Copied" toast, done.
 *   - The default mailto: navigation is suppressed (e.preventDefault).
 *     Previously the anchor also fired the mailto so users with a mail
 *     client got a compose window. Useful on desktop, intrusive on
 *     mobile (every phone has a default mail app, so a tap always
 *     yanked the user out of the page). Behaviour now matches across
 *     platforms: clipboard only.
 *
 * The href stays "mailto:..." so right-click "Copy Email Address" still
 * works on desktop, the anchor still reads as an email link to screen
 * readers, and long-press on mobile surfaces the OS share/copy sheet.
 */
export function EmailButton({
  email,
  className,
  children,
  ariaLabel,
  tooltipPlacement = "top",
  layout = "inline",
}: EmailButtonProps) {
  const t = useT();
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear the toast timer on unmount so a pending setCopied doesn't
  // fire on an unmounted node. React warns about that and it leaks
  // the timer.
  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  async function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    // Suppress the mailto: navigation. On mobile every tap was opening
    // the OS mail app which felt intrusive; on desktop the user can
    // still right-click -> Copy Email Address if they want the raw
    // string, or paste from clipboard after the toast fires.
    e.preventDefault();
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
        setCopied(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Clipboard blocked (browser policy, insecure context, etc.).
      // No toast in that case; the user can long-press the link to
      // copy via the OS share/context sheet as a fallback.
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
        aria-label={ariaLabel ?? t("email.aria.fallback").replace("{email}", email)}
        title={email}
      >
        {children}
      </a>
      <span
        aria-live="polite"
        // max-w-[90vw] + truncate so the toast cannot overflow the
        // viewport on narrow phones when the email address is long.
        // The previous whitespace-nowrap with no width cap let the
        // tooltip clip the right edge of the screen when the trigger
        // sat near the left edge of a 360px viewport.
        className={`pointer-events-none absolute z-50 max-w-[90vw] truncate rounded-md bg-[var(--color-fg)] px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-bg)] shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-200 ${positionBase} ${stateClass}`}
      >
        {t("email.toast.copied").replace("{email}", email)}
      </span>
    </span>
  );
}
