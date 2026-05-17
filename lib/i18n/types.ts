// Locale type + constants. Two locales for now (English + Vietnamese);
// add a third entry to LOCALES and the messages dictionary to grow.

export type Locale = "en" | "vi";

export const LOCALES: readonly Locale[] = ["en", "vi"] as const;
export const DEFAULT_LOCALE: Locale = "en";

// Friendly names shown in the language switcher. The "short" label
// is what readers actually see in the pill; we use VN (the country
// code Vietnamese speakers themselves use) rather than VI (the ISO
// 639-1 language code) because it reads more naturally to the
// audience. Internal locale string stays "vi" to match cookies +
// Accept-Language + Intl APIs.
export const LOCALE_NAMES: Record<Locale, { short: string; long: string }> = {
  en: { short: "EN", long: "English" },
  vi: { short: "VN", long: "Tiếng Việt" },
};
