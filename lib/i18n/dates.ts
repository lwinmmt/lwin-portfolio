import type { Locale } from "./types";

// Map every English month name (full + abbrev, any case) to its 1-12
// number. The regex below greps out month tokens in date strings; we
// look up the number and emit "M/YYYY" so VN reads as "5/2024" instead
// of "May 2024". Vietnamese convention prefers numeric months in
// short-form dates.
const MONTH_NUMBERS: Record<string, number> = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
  jan: 1, feb: 2, mar: 3, apr: 4, jun: 6, jul: 7, aug: 8,
  sep: 9, sept: 9, oct: 10, nov: 11, dec: 12,
};

// Single regex that catches "<Month> <YYYY>" OR a bare "<Month>".
// Word boundaries on both sides so "May" inside "MayBe" doesn't match.
// Case-insensitive so "MAY 2024" (highlights uppercase) and
// "May 2024" (everywhere else) both translate.
const MONTH_WITH_YEAR =
  /\b(January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sept|Sep|Oct|Nov|Dec)\b(?:\s+(\d{4}))?/gi;

/**
 * Localize a freeform English date string into the active locale.
 * `en`: returns the input unchanged. `vi`: rewrites month names to
 * numbers, swaps "to" for "đến", and replaces "Present" with "nay".
 *
 * Examples (en -> vi):
 *   "May 2026 to Present"       -> "5/2026 đến nay"
 *   "Jan 2024"                  -> "1/2024"
 *   "MAY 2026"                  -> "5/2026"
 *   "January 2025 to April 2025"-> "1/2025 đến 4/2025"
 *   "2018 to 2021"              -> "2018 đến 2021"
 *
 * Data lives as a single English string per item (no per-item
 * datesVi override needed) — the formatter is deterministic enough
 * that one source covers both locales. If a record ever needs a
 * special wording, add a `datesVi` field on the type and pass it
 * through pickLocalized at the callsite.
 */
export function formatDates(dates: string, locale: Locale): string {
  if (locale === "en" || !dates) return dates;
  let s = dates.replace(MONTH_WITH_YEAR, (_, month: string, year?: string) => {
    const num = MONTH_NUMBERS[month.toLowerCase()];
    if (!num) return _;
    return year ? `${num}/${year}` : String(num);
  });
  // "to Present" must come before bare "to" so we don't translate
  // "to" first and miss the "Present" specialization.
  s = s.replace(/\bto Present\b/gi, "đến nay");
  s = s.replace(/\bPresent\b/g, "nay");
  s = s.replace(/\bto\b/g, "đến");
  return s;
}
