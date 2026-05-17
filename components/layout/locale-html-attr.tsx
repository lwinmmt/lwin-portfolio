"use client";

import { useEffect } from "react";
import { useLocale } from "@/lib/i18n/client";

// Sets <html lang> to match the active route locale on the client.
//
// Why: Next.js requires <html> to live in the ROOT layout (app/layout.tsx),
// which is shared across both /en/* and /vi/* prerendered pages, so it can
// only hardcode a single lang attribute. The root sets lang="en" as a
// baseline; this client effect runs once per [lang] layout mount and
// updates document.documentElement.lang to the actual locale.
//
// Crawlers that render JS (Google, Bing) pick up the corrected attribute
// at index time. Initial HTML still ships with a valid lang so screen
// readers and non-JS crawlers see a sensible default.
export function LocaleHtmlAttr() {
  const locale = useLocale();
  useEffect(() => {
    if (document.documentElement.lang !== locale) {
      document.documentElement.lang = locale;
    }
  }, [locale]);
  return null;
}
