// Server-side locale resolution. Reads from a request-scoped React
// cache that the [lang]/layout.tsx populates from the URL segment.
//
// The previous version called cookies() + headers() to pick a locale
// — that marked every public route as `ƒ Dynamic` and forced a
// serverless function invocation on every Vercel navigation, killing
// the static prefetch path that next/link relies on for instant
// route transitions.
//
// New flow:
//   1. proxy.ts middleware reads the cookie / Accept-Language and
//      rewrites bare paths like /about into /{locale}/about.
//   2. [lang]/layout.tsx receives the locale via params, calls
//      setLocaleForRequest(locale) to seed the cache.
//   3. Server components downstream call getLocale() / getT() and
//      get the seeded value — synchronously, with no dynamic-API
//      reads. Pages can be fully prerendered at build time.
//
// The cache trick relies on React's per-request cache(): calling a
// cached function with the same (empty) args within one render tree
// returns the same object, and mutating that object propagates to
// every downstream caller within that request.

import { cache } from "react";
import { messages, type MessageKey } from "./messages";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "./types";

type LocaleHolder = { locale: Locale };

// Request-scoped holder. Same object reference per render pass.
const getLocaleHolder = cache((): LocaleHolder => ({
  locale: DEFAULT_LOCALE,
}));

/** Called once by [lang]/layout.tsx to seed the request's locale. */
export function setLocaleForRequest(locale: Locale): void {
  getLocaleHolder().locale = locale;
}

const VALID_LOCALES: ReadonlySet<string> = new Set(LOCALES);

/**
 * Page helper: awaits params, validates the lang segment, and seeds
 * the request locale holder. Every server page under app/[lang]/ must
 * call this BEFORE calling getT() / getLocale() / pickLocalized().
 *
 * Why every page, not just the layout: Next.js can render layouts
 * and pages in parallel, so the layout's setLocaleForRequest is not
 * guaranteed to have run before the page reads the locale. In
 * practice the home page happened to work but inner routes (resume,
 * about, uses, etc.) rendered with the default locale, leaking
 * English copy onto Vietnamese pages.
 */
export async function seedLocaleFromParams(
  params: Promise<{ lang: string }>,
): Promise<Locale> {
  const { lang } = await params;
  const locale = VALID_LOCALES.has(lang) ? (lang as Locale) : DEFAULT_LOCALE;
  setLocaleForRequest(locale);
  return locale;
}

export function getLocale(): Locale {
  return getLocaleHolder().locale;
}

export function getMessages(): Record<MessageKey, string> {
  return messages[getLocale()];
}

export function getT(): (key: MessageKey) => string {
  const locale = getLocale();
  const map = messages[locale] as Record<MessageKey, string>;
  const fallback = messages[DEFAULT_LOCALE] as Record<MessageKey, string>;
  return (key) => map[key] ?? fallback[key] ?? key;
}
