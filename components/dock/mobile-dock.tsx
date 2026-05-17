"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { SidebarIcon } from "@/components/sidebar/sidebar-icon";
import { EmailButton } from "@/components/ui/email-button";
import { navContact, type NavLink } from "@/lib/content";
import { isActiveRoute } from "@/lib/nav-utils";
import { writeLocaleCookie } from "@/lib/i18n/cookie";
import { useLocale, useT } from "@/lib/i18n/client";
import { localeHref } from "@/lib/i18n/href";
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
  { href: "/blog", icon: "pen", labelKey: "nav.blog" },
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
          const itemClass =
            "flex h-11 w-11 items-center justify-center rounded-full transition-colors " +
            (active
              ? "bg-[var(--color-fg)] text-[var(--color-bg)]"
              : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]");

          return (
            <Link
              key={item.href}
              href={localeHref(item.href, locale)}
              aria-label={label}
              className={itemClass}
            >
              <SidebarIcon name={item.icon} className="h-[18px] w-[18px]" />
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          aria-label={t("nav.aria.more")}
          aria-expanded={sheetOpen}
          aria-controls="mobile-more-sheet"
          className={
            "flex h-11 w-11 items-center justify-center rounded-full transition-colors " +
            (sheetOpen
              ? "bg-[var(--color-fg)] text-[var(--color-bg)]"
              : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]")
          }
        >
          <SidebarIcon name="more" className="h-[18px] w-[18px]" />
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

  // Esc closes + body scroll lock while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
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
            list the sidebar uses — one source of truth). */}
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

        {/* Theme + locale at the bottom — utility controls visually
            separated from navigation. */}
        <div className="mt-5 grid grid-cols-2 gap-3 pb-4">
          <ThemePill />
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

function ThemePill() {
  const { theme, setTheme } = useTheme();
  const t = useT();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const modes = [
    { id: "light", icon: "sun", label: t("theme.light") },
    { id: "dark", icon: "moon", label: t("theme.dark") },
    { id: "system", icon: "auto", label: t("theme.auto") },
  ] as const;

  return (
    <div className="flex flex-col gap-1.5 rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-bg-warm)] p-2">
      <div className="px-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-[var(--color-fg-faint)]">
        {t("theme.label")}
      </div>
      <div className="flex gap-1">
        {modes.map((m) => {
          const active = mounted && theme === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setTheme(m.id)}
              aria-pressed={active}
              aria-label={m.label}
              className={
                "flex h-9 flex-1 items-center justify-center rounded-md text-[12px] transition-colors " +
                (active
                  ? "bg-[var(--color-fg)] text-[var(--color-bg)]"
                  : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]")
              }
            >
              <SidebarIcon name={m.icon} className="h-[14px] w-[14px]" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function LocalePill() {
  const locale = useLocale();
  const router = useRouter();
  const t = useT();

  const switchTo = (next: Locale) => {
    if (next === locale) return;
    writeLocaleCookie(next);
    router.refresh();
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
              className={
                "h-9 flex-1 rounded-md font-mono text-[11px] font-medium uppercase tracking-[0.14em] transition-colors " +
                (active
                  ? "bg-[var(--color-fg)] text-[var(--color-bg)]"
                  : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]")
              }
            >
              {LOCALE_NAMES[l].short}
            </button>
          );
        })}
      </div>
    </div>
  );
}
