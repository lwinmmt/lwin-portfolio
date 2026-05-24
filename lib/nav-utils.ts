import { LOCALES } from "./i18n/types";

/**
 * Shared navigation helpers used by the sidebar, the mobile dock, and any
 * future nav surfaces. Centralized here so route-matching logic stays in
 * one place.
 */

// Strip the leading /{locale} segment from a pathname so route-active
// checks can compare against bare hrefs (/about, /projects) regardless
// of which locale the visitor is in. Without this, every nav item
// lost its active highlight after the URL-segment i18n landed.
// pathname is always /en/about or /vi/about now, never the bare
// /about that the nav config stores.
function stripLocalePrefix(pathname: string): string {
  for (const lang of LOCALES) {
    if (pathname === `/${lang}`) return "/";
    if (pathname.startsWith(`/${lang}/`)) {
      return pathname.slice(`/${lang}`.length);
    }
  }
  return pathname;
}

export function isActiveRoute(href: string, pathname: string): boolean {
  if (href.startsWith("mailto:") || href.startsWith("http")) return false;
  const stripped = stripLocalePrefix(pathname);
  if (href === "/") return stripped === "/";
  return stripped === href || stripped.startsWith(`${href}/`);
}
