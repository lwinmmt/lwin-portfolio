import { LOCALES, type Locale } from "./types";

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

// Swap whatever leading /{lang} the path has for /{next}. Used by the
// locale switcher: from /en/about, switching to vi must produce
// /vi/about so the browser navigates to the prerendered VI HTML.
// router.refresh() on /en/about would just re-render the EN page
// (cookie change is ignored once the locale is baked into the URL).
//
// Handles bare paths defensively too: /about -> /{next}/about,
// / -> /{next}.
export function swapLocaleInPath(pathname: string, next: Locale): string {
  for (const lang of LOCALES) {
    if (pathname === `/${lang}`) return `/${next}`;
    if (pathname.startsWith(`/${lang}/`)) {
      return `/${next}${pathname.slice(`/${lang}`.length)}`;
    }
  }
  if (pathname === "/" || pathname === "") return `/${next}`;
  return `/${next}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}
