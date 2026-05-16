/**
 * Shared navigation helpers used by the sidebar, the mobile dock, and any
 * future nav surfaces. Centralized here so route-matching logic stays in
 * one place.
 */
export function isActiveRoute(href: string, pathname: string): boolean {
  if (href.startsWith("mailto:") || href.startsWith("http")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
