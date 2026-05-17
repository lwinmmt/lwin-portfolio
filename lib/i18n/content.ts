import type { Locale } from "./types";

// Field-level i18n helper. Content data files keep their English
// values as the primary fields (description, role, etc.) and add an
// optional *Vi twin (descriptionVi, roleVi, etc.) for the Vietnamese
// translation. Components call pickLocalized() per field and pass
// the current locale. Falls back to English if the Vi variant is
// missing or empty so the call site never has to null-check.
//
// We deliberately do NOT translate proper nouns or technical tokens
// inside fields. Company names, tech stack names, person names, and
// city names stay in their original form. Only the descriptive prose
// around those tokens gets translated.

export function pickLocalized<T>(
  en: T,
  vi: T | undefined,
  locale: Locale,
): T {
  if (locale !== "vi") return en;
  if (vi === undefined || vi === null) return en;
  if (typeof vi === "string" && vi.trim().length === 0) return en;
  if (Array.isArray(vi) && vi.length === 0) return en;
  return vi;
}
