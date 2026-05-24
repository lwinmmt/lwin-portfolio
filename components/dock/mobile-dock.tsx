"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { m as motion } from "framer-motion";
import { SidebarIcon } from "@/components/sidebar/sidebar-icon";
import { EmailButton } from "@/components/ui/email-button";
import { navContact, type NavLink } from "@/lib/content";
import { isActiveRoute } from "@/lib/nav-utils";
import { writeLocaleCookie } from "@/lib/i18n/cookie";
import { useLocale, useT } from "@/lib/i18n/client";
import { localeHref, swapLocaleInPath } from "@/lib/i18n/href";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_NAMES,
  type Locale,
} from "@/lib/i18n/types";
import { useRouter } from "next/navigation";
import type { MessageKey } from "@/lib/i18n/messages";

// Mobile dock + overflow "More" sheet. Replaces the desktop sidebar
// for everything <lg. The dock carries the 5 primary nav routes + a
// "More" trigger; everything else (Blog, Highlights, Studio, social
// links, theme, language) lives in the bottom sheet so mobile users
// have parity with the desktop sidebar instead of missing routes.

type DockItem = {
  href: string;
  icon: string;
  labelKey: MessageKey;
};

const DOCK_ITEMS: DockItem[] = [
  { href: "/", icon: "home", labelKey: "nav.home" },
  { href: "/about", icon: "user", labelKey: "nav.about" },
  { href: "/projects", icon: "code", labelKey: "nav.projects" },
  { href: "/uses", icon: "laptop", labelKey: "nav.uses" },
  { href: "/resume", icon: "file", labelKey: "nav.resume" },
];

// Items shown in the overflow sheet. Internal routes first, then
// external contact links, then the controls (theme + language) at
// the bottom as their own toggle blocks.
// /studio is intentionally absent: the CMS is unconfigured, the
// route is Basic-Auth-gated by proxy.ts, and a "Studio" link here
// would look broken. Direct /studio URL still works for the
// maintainer. See lib/content/nav.ts for the same decision in the
// sidebar's resources list.
const SHEET_INTERNAL: DockItem[] = [
  { href: "/highlights", icon: "highlights", labelKey: "nav.highlights" },
];

export function MobileDock() {
  const pathname = usePathname();
  const t = useT();
  const locale = useLocale();
  const [sheetOpen, setSheetOpen] = useState(false);

  // Close the sheet whenever the route changes (e.g. tapping a link).
  useEffect(() => {
    setSheetOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        aria-label={t("nav.aria.mobile")}
        // bottom inset respects the iPhone home-indicator safe area
        // so the pill never sits behind it.
        style={{ bottom: "max(16px, env(safe-area-inset-bottom))" }}
        className="glass-pill fixed left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-full p-2 lg:hidden"
      >
        {DOCK_ITEMS.map((item) => {
          const active = isActiveRoute(item.href, pathname);
          const label = t(item.labelKey);
          // h-11 w-11 = 44x44, the WCAG-AA minimum touch target.
          // The previous h-9 (36px) was below recommendation and
          // mistaps were easy with adjacent items.
          //
          // Sliding pill: the active tab gets a motion.span with a
          // shared layoutId, so framer-motion animates the dark fill
          // between tabs instead of hard-swapping. Same trick the
          // desktop sidebar uses for the theme + locale toggles.
          return (
            <Link
              key={item.href}
              href={localeHref(item.href, locale)}
              aria-label={label}
              className="relative flex h-11 w-11 items-center justify-center rounded-full"
            >
              {active && (
                <motion.span
                  layoutId="mobile-dock-pill"
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-[var(--color-fg)]"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 32,
                    mass: 0.7,
                  }}
                />
              )}
              <SidebarIcon
                name={item.icon}
                className={
                  "relative z-10 h-[18px] w-[18px] transition-colors " +
                  (active
                    ? "text-[var(--color-bg)]"
                    : "text-[var(--color-fg-muted)]")
                }
              />
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          aria-label={t("nav.aria.more")}
          aria-expanded={sheetOpen}
          aria-controls="mobile-more-sheet"
          // No layoutId here. The More button stays a separate
          // surface from the main dock tabs so the route pill
          // doesn't fly off to it (the route stays the active
          // page even when the sheet is open). Sheet-open state
          // gets a subtle outline + accent color instead of a
          // full dark fill so it reads as "menu opener pressed"
          // rather than "currently the active page".
          className={
            "relative flex h-11 w-11 items-center justify-center rounded-full transition-colors " +
            (sheetOpen
              ? "bg-[var(--color-hover-mute)] text-[var(--color-fg)]"
              : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]")
          }
        >
          <SidebarIcon name="more" className="relative z-10 h-[18px] w-[18px]" />
        </button>
      </nav>

      <MobileMoreSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />
    </>
  );
}

function MobileMoreSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useT();
  const locale = useLocale();
  const sheetRef = useRef<HTMLDivElement | null>(null);
  // Remember the element that opened the sheet (the "More" button)
  // so focus can return there on close. Required by WCAG 2.4.3.
  const openerRef = useRef<HTMLElement | null>(null);

  // Esc closes + Tab is trapped inside the sheet + body scroll lock.
  // Tab trap: when focus would leave the sheet (Tab past last item or
  // Shift+Tab before first), wrap to the other end. Without this,
  // Tab from the last sheet button would land on hidden page content
  // behind the backdrop. Disorienting for keyboard users.
  useEffect(() => {
    if (!open) return;
    openerRef.current = document.activeElement as HTMLElement | null;
    const node = sheetRef.current;
    // Move initial focus into the sheet so subsequent Tabs cycle
    // inside it rather than starting from <body>.
    queueMicrotask(() => {
      const first = node?.querySelector<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      first?.focus();
    });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !node) return;
      const focusables = Array.from(
        node.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute("aria-hidden"));
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      // Restore focus to the More button (or whatever opened it).
      queueMicrotask(() => openerRef.current?.focus());
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("nav.aria.moreSheet")}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm lg:hidden"
    >
      <div
        ref={sheetRef}
        id="mobile-more-sheet"
        onClick={(e) => e.stopPropagation()}
        style={{
          paddingBottom: "max(20px, env(safe-area-inset-bottom))",
        }}
        className="w-full max-w-md rounded-t-3xl border-t border-[var(--color-border-soft)] bg-[var(--color-bg-card)] px-5 pt-3 shadow-[0_-12px_40px_rgba(0,0,0,0.18)] animate-slide-up"
      >
        {/* Drag handle hint (decorative). */}
        <div
          aria-hidden="true"
          className="mx-auto mb-3 h-1 w-10 rounded-full bg-[var(--color-border-default)]"
        />

        {/* Internal routes. */}
        <SheetSection label={t("nav.section.resources")}>
          {SHEET_INTERNAL.map((item) => (
            <SheetLink
              key={item.href}
              item={item}
              onClose={onClose}
              t={t}
              locale={locale}
            />
          ))}
        </SheetSection>

        {/* External contact + social (reads from the same navContact
            list the sidebar uses. One source of truth). */}
        <SheetSection label={t("nav.section.stayInTouch")}>
          {navContact.map((item) => (
            <SheetExternalRow
              key={item.href}
              item={item}
              onClose={onClose}
              t={t}
            />
          ))}
        </SheetSection>

        {/* Locale toggle at the bottom. Utility control visually
            separated from navigation. ThemePill was removed when the
            site went light-only (see app/layout.tsx forcedTheme). */}
        <div className="mt-5 pb-4">
          <LocalePill />
        </div>
      </div>
    </div>
  );
}

function SheetSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-3">
      <div className="mb-1.5 px-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-fg-faint)]">
        {label}
      </div>
      <div className="flex flex-col">{children}</div>
    </div>
  );
}

function SheetLink({
  item,
  onClose,
  t,
  locale,
}: {
  item: DockItem;
  onClose: () => void;
  t: (key: MessageKey) => string;
  locale: Locale;
}) {
  return (
    <Link
      href={localeHref(item.href, locale)}
      onClick={onClose}
      className="flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-medium text-[var(--color-fg-muted)] transition-colors hover:bg-[var(--color-hover-mute)] hover:text-[var(--color-fg)]"
    >
      <SidebarIcon name={item.icon} className="h-[18px] w-[18px]" />
      <span>{t(item.labelKey)}</span>
    </Link>
  );
}

function SheetExternalRow({
  item,
  onClose,
  t,
}: {
  item: NavLink;
  onClose: () => void;
  t: (key: MessageKey) => string;
}) {
  const className =
    "flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-medium text-[var(--color-fg-muted)] transition-colors hover:bg-[var(--color-hover-mute)] hover:text-[var(--color-fg)]";
  const showExternalGlyph = item.external;
  const inner = (
    <>
      <SidebarIcon name={item.icon} className="h-[18px] w-[18px]" />
      <span className="flex-1">{t(item.labelKey)}</span>
      {showExternalGlyph && (
        <SidebarIcon
          name="external"
          className="h-[12px] w-[12px] text-[var(--color-fg-faint)]"
        />
      )}
    </>
  );

  if (item.href.startsWith("mailto:")) {
    const email = item.href.replace(/^mailto:/, "");
    return (
      <EmailButton
        email={email}
        className={className}
        ariaLabel={t(item.labelKey)}
        tooltipPlacement="top"
        layout="block"
      >
        {inner}
      </EmailButton>
    );
  }

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClose}
      className={className}
    >
      {inner}
    </a>
  );
}

// ThemePill removed. Site is light-only. forcedTheme="light" in
// app/layout.tsx pins the theme regardless of OS preference or any
// previously-stored next-themes value.

function LocalePill() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useT();

  const switchTo = (next: Locale) => {
    if (next === locale) return;
    // See LanguageSwitcher: cookie write for next bare-URL visit,
    // push to the prerendered HTML for the new locale for instant CDN
    // navigation. router.refresh() would only re-render the EN page
    // because the URL is already locale-prefixed.
    writeLocaleCookie(next);
    router.push(swapLocaleInPath(pathname || "/", next));
  };

  return (
    <div className="flex flex-col gap-1.5 rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-bg-warm)] p-2">
      <div className="px-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-[var(--color-fg-faint)]">
        {t("switcher.aria")}
      </div>
      <div className="flex gap-1">
        {LOCALES.map((l) => {
          const active = locale === l || (!locale && l === DEFAULT_LOCALE);
          return (
            <button
              key={l}
              type="button"
              onClick={() => switchTo(l)}
              aria-pressed={active}
              aria-label={LOCALE_NAMES[l].long}
              className="relative h-9 flex-1 rounded-md font-mono text-[11px] font-medium uppercase tracking-[0.14em] transition-colors"
            >
              {active && (
                <motion.span
                  layoutId="mobile-locale-pill"
                  aria-hidden="true"
                  className="absolute inset-0 rounded-md bg-[var(--color-fg)]"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 32,
                    mass: 0.7,
                  }}
                />
              )}
              <span
                className={
                  "relative z-10 " +
                  (active
                    ? "text-[var(--color-bg)]"
                    : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]")
                }
              >
                {LOCALE_NAMES[l].short}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
