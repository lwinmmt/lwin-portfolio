// Locale type + constants. Two locales for now (English + Vietnamese);
// add a third entry to LOCALES and the messages dictionary to grow.

export type Locale = "en" | "vi";

export const LOCALES: readonly Locale[] = ["en", "vi"] as const;
export const DEFAULT_LOCALE: Locale = "en";

// Friendly names shown in the language switcher.
export const LOCALE_NAMES: Record<Locale, { short: string; long: string }> = {
  en: { short: "EN", long: "English" },
  vi: { short: "VI", long: "Tiếng Việt" },
};
