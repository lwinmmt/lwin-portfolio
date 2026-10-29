// Only English is publicly served. The legacy Vietnamese content type
// remains compatible with existing data while pages are reviewed in stages.

export type Locale = "en" | "vi";

export const LOCALES: readonly Locale[] = ["en"] as const;
export const DEFAULT_LOCALE: Locale = "en";
