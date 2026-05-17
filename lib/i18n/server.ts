// Server-side locale detection. Reads the explicit cookie first
// (set by the LanguageSwitcher); falls back to Accept-Language for
// first-time visitors; defaults to English if neither matches.
//
// getLocale / getT are wrapped in React's `cache()` so a single
// request that calls them from N section components only does the
// cookie + header read once. Without this, each component triggers
// its own resolution and the locale logic runs once per call site
// (the underlying cookies()/headers() helpers are deduped by Next,
// but the validation + Accept-Language parsing is not).

import { cache } from "react";
import { cookies, headers } from "next/headers";
import { messages, type MessageKey } from "./messages";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "./types";

export const LOCALE_COOKIE = "locale";

// Allowlist set built from LOCALES so widening the supported set
// in lib/i18n/types.ts auto-extends the validation guard. Untrusted
// cookie values that match neither entry fall back to DEFAULT_LOCALE
// before they can flow into messages[locale] object access.
const VALID_LOCALES: ReadonlySet<string> = new Set(LOCALES);

function parsePrimaryLanguage(header: string | null): string {
  if (!header) return "";
  return (header.split(",")[0]?.split(";")[0]?.trim() ?? "").toLowerCase();
}

function isLocale(value: string | undefined): value is Locale {
  return value !== undefined && VALID_LOCALES.has(value);
}

export const getLocale = cache(async (): Promise<Locale> => {
  const c = await cookies();
  const explicit = c.get(LOCALE_COOKIE)?.value;
  if (isLocale(explicit)) return explicit;

  const h = await headers();
  const primary = parsePrimaryLanguage(h.get("accept-language"));
  if (primary.startsWith("vi")) return "vi";
  return DEFAULT_LOCALE;
});

// Convenience: get the message map for the current request.
export const getMessages = cache(async () => {
  const locale = await getLocale();
  return messages[locale];
});

// Convenience: a translator function bound to the current request's locale.
// Use in server components: `const t = await getT(); t("nav.home")`.
export const getT = cache(async () => {
  const locale = await getLocale();
  return (key: MessageKey): string =>
    messages[locale][key] ?? messages[DEFAULT_LOCALE][key] ?? key;
});
