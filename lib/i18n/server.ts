// Server-side locale detection. Reads the explicit cookie first
// (set by the LanguageSwitcher); falls back to Accept-Language for
// first-time visitors; defaults to English if neither matches.

import { cookies, headers } from "next/headers";
import { messages, type MessageKey } from "./messages";
import { DEFAULT_LOCALE, type Locale } from "./types";

export const LOCALE_COOKIE = "locale";

function parsePrimaryLanguage(header: string | null): string {
  if (!header) return "";
  return (header.split(",")[0]?.split(";")[0]?.trim() ?? "").toLowerCase();
}

export async function getLocale(): Promise<Locale> {
  const c = await cookies();
  const explicit = c.get(LOCALE_COOKIE)?.value;
  if (explicit === "vi" || explicit === "en") return explicit;

  const h = await headers();
  const primary = parsePrimaryLanguage(h.get("accept-language"));
  if (primary.startsWith("vi")) return "vi";
  return DEFAULT_LOCALE;
}

// Convenience: get the message map for the current request.
export async function getMessages() {
  const locale = await getLocale();
  return messages[locale];
}

// Convenience: a translator function bound to the current request's locale.
// Use in server components: `const t = await getT(); t("nav.home")`.
export async function getT() {
  const locale = await getLocale();
  return (key: MessageKey): string =>
    messages[locale][key] ?? messages[DEFAULT_LOCALE][key] ?? key;
}
