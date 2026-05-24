import type { Locale } from "./types";

/**
 * Single source of truth for writing the locale cookie from the
 * client. Both the sidebar LanguageSwitcher and the floating
 * LocalePromptBanner used to do this inline with the same flags;
 * keeping it here means a future change (rename, attribute add,
 * max-age tweak) lands in one place instead of three.
 *
 * SameSite=Lax is enough. The cookie is read server-side for
 * locale negotiation only; no cross-site auth risk.
 *
 * `Secure` is added only over HTTPS so localhost dev keeps working.
 */
export function writeLocaleCookie(next: Locale): void {
  if (typeof document === "undefined") return;
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? "; Secure"
      : "";
  document.cookie = `locale=${next}; path=/; max-age=31536000; samesite=lax${secure}`;
}
