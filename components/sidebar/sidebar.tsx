"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { SidebarIcon } from "./sidebar-icon";
import { EmailButton } from "@/components/ui/email-button";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { profile, navItems, navResources, navContact, type NavLink } from "@/lib/content";
import { isActiveRoute } from "@/lib/nav-utils";
import { useT } from "@/lib/i18n/client";
import { useModKey } from "@/lib/use-mod-key";

export function Sidebar() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const t = useT();
  const modKey = useModKey();
  // next-themes resolves the active mode on the client only. Gate the
  // active-button styling to avoid a hydration mismatch warning.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <aside
      aria-label="Primary navigation"
      className="fixed top-0 left-0 z-40 hidden h-dvh w-[260px] flex-col border-r border-[var(--color-border-soft)] bg-[var(--color-bg-sidebar)] px-4 py-7 lg:flex"
    >
      <div className="flex items-center gap-3 px-3 pb-6">
        {/* Plain img for maximum compatibility, bypasses Next.js Image quirks */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={profile.photoSrc}
          alt={`${profile.name} portrait`}
          width={44}
          height={44}
          className="h-11 w-11 flex-shrink-0 rounded-full border border-[var(--color-border-default)] object-cover"
        />
        <div className="leading-tight">
          <div className="font-sans text-[15px] font-semibold tracking-[-0.01em] text-[var(--color-fg)]">
            {profile.name}<span className="text-[var(--color-ruby)]">.</span>
          </div>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-fg-faint)]">
            {t("sidebar.subtitle")}
          </div>
        </div>
      </div>

      <NavSection items={navItems} pathname={pathname} />

      <div className="px-3 pt-3 pb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-fg-faint)]">
        {t("nav.section.resources")}
      </div>
      <NavSection items={navResources} pathname={pathname} />

      <div className="px-3 pt-3 pb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-fg-faint)]">
        {t("nav.section.stayInTouch")}
      </div>
      <NavSection items={navContact} pathname={pathname} />

      <div className="flex-1" />

      {/* Cmd+K palette opener. */}
      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event("cmdpalette:open"))}
        className="mb-1 flex items-center gap-2 rounded-lg border border-[var(--color-border-soft)] bg-[var(--color-bg-warm)] px-3 py-2 text-left transition-colors hover:border-[var(--color-border-default)]"
        aria-label="Open command palette"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[var(--color-fg-muted)]"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-muted)]">
          {t("sidebar.search")}
        </span>
        <kbd className="ml-auto rounded bg-[var(--color-hover-mute)] px-1.5 py-[2px] font-mono text-[10px] text-[var(--color-fg-faint)]">
          {modKey.glyph}K
        </kbd>
      </button>

      <LanguageSwitcher />

      <div className="mt-2 flex gap-1 rounded-[10px] bg-[var(--color-hover-mute)] p-1">
        {(["light", "dark", "system"] as const).map((mode) => {
          const isActiveTheme = mounted && theme === mode;
          const label =
            mode === "system"
              ? t("theme.auto")
              : mode === "light"
                ? t("theme.light")
                : t("theme.dark");
          return (
            <button
              key={mode}
              type="button"
              onClick={() => setTheme(mode)}
              className={
                "flex-1 rounded-[7px] py-1.5 text-[11.5px] font-medium transition-colors " +
                (isActiveTheme
                  ? "bg-[var(--color-bg-card)] text-[var(--color-fg)] shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                  : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]")
              }
              aria-pressed={isActiveTheme}
            >
              {label}
            </button>
          );
        })}
      </div>
    </aside>
  );
}

function NavSection({ items, pathname }: { items: NavLink[]; pathname: string }) {
  const t = useT();
  return (
    <nav className="flex flex-col gap-[1px]">
      {items.map((item) => {
        const active = isActiveRoute(item.href, pathname);
        const className =
          "flex items-center gap-[10px] rounded-lg px-3 py-[7px] text-[13.5px] font-medium transition-colors " +
          (active
            ? "bg-[var(--color-bg-card)] text-[var(--color-fg)] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_0_0_1px_var(--color-border-default)]"
            : "text-[var(--color-fg-muted)] hover:bg-[var(--color-hover-mute)] hover:text-[var(--color-fg)]");

        const label = t(item.labelKey);
        const inner = (
          <>
            <SidebarIcon name={item.icon} />
            <span className="flex-1">{label}</span>
            {item.shortcut && (
              <span className="rounded bg-[var(--color-hover-mute)] px-1.5 py-[2px] font-mono text-[10px] text-[var(--color-fg-faint)]">
                {item.shortcut}
              </span>
            )}
            {item.external && (
              <SidebarIcon name="external" className="h-[11px] w-[11px] text-[var(--color-fg-faint)]" />
            )}
          </>
        );

        if (item.href.startsWith("mailto:")) {
          const email = item.href.replace(/^mailto:/, "");
          return (
            <EmailButton
              key={item.href}
              email={email}
              className={className + " w-full"}
              tooltipPlacement="right"
              layout="block"
              ariaLabel={label}
            >
              {inner}
            </EmailButton>
          );
        }

        if (item.external) {
          return (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {inner}
            </a>
          );
        }

        return (
          <Link key={item.href} href={item.href} className={className}>
            {inner}
          </Link>
        );
      })}
    </nav>
  );
}
