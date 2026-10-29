import type { Locale } from "./types";

// Prefix an internal href with the active locale so next/link prefetch
// and click navigation hit the CDN-cached static HTML directly,
// bypassing the proxy rewrite. Without this, every navigation goes
// /about -> proxy.ts -> /{locale}/about, adding a middleware
// invocation (~5-20ms warm, ~30-50ms cold) per click.
//
// External, mailto, and hash hrefs pass through unchanged.
export function localeHref(href: string, locale: Locale): string {
  if (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("#") ||
    href.startsWith("//")
  ) {
    return href;
  }
  // Already locale-prefixed: leave alone (defensive).
  if (href === `/${locale}` || href.startsWith(`/${locale}/`)) return href;
  if (href === "/") return `/${locale}`;
  return `/${locale}${href}`;
}
