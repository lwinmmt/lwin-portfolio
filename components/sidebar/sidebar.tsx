"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { SidebarIcon } from "./sidebar-icon";
import { EmailButton } from "@/components/ui/email-button";
import { profile, navItems, navResources, navContact, type NavLink } from "@/lib/content";
import { isActiveRoute } from "@/lib/nav-utils";

// Collapse state is driven from a data attribute on <html> set by an
// inline script in app/layout.tsx. CSS in globals.css reads the same
// attribute to hide labels and shrink the rail; this lets the toggle
// run as plain DOM mutations with zero React re-renders.
function toggleSidebarCollapsed() {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  const next = html.getAttribute("data-sidebar-collapsed") === "1" ? "0" : "1";
  if (next === "1") html.setAttribute("data-sidebar-collapsed", "1");
  else html.removeAttribute("data-sidebar-collapsed");
  try {
    localStorage.setItem("sidebarCollapsed", next);
  } catch {
    // localStorage may be unavailable in some private modes; fail silent
  }
}

export function Sidebar() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  // next-themes resolves the active mode on the client only. Gate the
  // active-button styling to avoid a hydration mismatch warning.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <aside
      aria-label="Primary navigation"
      className="group/sidebar fixed top-0 left-0 z-40 hidden h-dvh w-[var(--sidebar-w,260px)] flex-col border-r border-[var(--color-border-soft)] bg-[var(--color-bg-sidebar)] px-4 py-7 transition-[width] duration-200 lg:flex"
    >
      {/* Edge tab pinned to the right edge of the sidebar at vertical
          center. Visible by default at 60% opacity (discoverable
          without being heavy), full opacity on hover or focus. */}
      <button
        type="button"
        onClick={toggleSidebarCollapsed}
        aria-label="Toggle sidebar"
        title="Toggle sidebar"
        className="absolute top-1/2 right-0 z-50 inline-flex h-10 w-5 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-md border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] text-[var(--color-fg-faint)] opacity-60 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all duration-150 hover:bg-[var(--color-hover-mute)] hover:text-[var(--color-fg)] hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-ruby)] group-hover/sidebar:opacity-100"
      >
        <span aria-hidden="true" className="sidebar-toggle-icon--collapse">
          <ChevronIcon direction="left" />
        </span>
        <span aria-hidden="true" className="sidebar-toggle-icon--expand">
          <ChevronIcon direction="right" />
        </span>
      </button>
      <div className="sidebar-profile flex items-center gap-3 px-3 pb-6">
        {/* Plain img for maximum compatibility, bypasses Next.js Image quirks */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={profile.photoSrc}
          alt={`${profile.name} portrait`}
          width={44}
          height={44}
          className="h-11 w-11 flex-shrink-0 rounded-full border border-[var(--color-border-default)] object-cover"
        />
        <div className="sidebar-profile-text leading-tight">
          <div className="font-sans text-[15px] font-semibold tracking-[-0.01em] text-[var(--color-fg)]">
            {profile.name}<span className="text-[var(--color-ruby)]">.</span>
          </div>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-fg-faint)]">
            AI &amp; IIoT Engineer
          </div>
        </div>
      </div>

      <NavSection items={navItems} pathname={pathname} />

      <div className="sidebar-section-label sidebar-section-spacer px-3 pt-3 pb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-fg-faint)]">
        Resources
      </div>
      <NavSection items={navResources} pathname={pathname} />

      <div className="sidebar-section-label sidebar-section-spacer px-3 pt-3 pb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-fg-faint)]">
        Stay in touch
      </div>
      <NavSection items={navContact} pathname={pathname} />

      <div className="flex-1" />

      {/* Search opener: full pill when expanded, icon-only button when
          collapsed. CSS in globals.css toggles which one is visible based
          on the collapsed data attribute on <html>. */}
      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event("cmdpalette:open"))}
        className="sidebar-search-full mb-1 flex items-center gap-2 rounded-lg border border-[var(--color-border-soft)] bg-[var(--color-bg-warm)] px-3 py-2 text-left transition-colors hover:border-[var(--color-border-default)]"
        aria-label="Open command palette"
      >
        <SearchIcon />
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-muted)]">
          Search
        </span>
        <kbd className="ml-auto rounded bg-[var(--color-hover-mute)] px-1.5 py-[2px] font-mono text-[10px] text-[var(--color-fg-faint)]">
          &#8984;K
        </kbd>
      </button>
      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event("cmdpalette:open"))}
        className="sidebar-compact-only mb-1 h-9 w-9 items-center justify-center self-center rounded-lg text-[var(--color-fg-muted)] transition-colors hover:bg-[var(--color-hover-mute)] hover:text-[var(--color-fg)]"
        aria-label="Open command palette"
        title="Search (Cmd+K)"
      >
        <SearchIcon />
      </button>

      <div className="sidebar-theme-row mt-2 flex gap-1 rounded-[10px] bg-[var(--color-hover-mute)] p-1">
        {(["light", "dark", "system"] as const).map((mode) => {
          const isActiveTheme = mounted && theme === mode;
          const label = mode === "system" ? "Auto" : mode.charAt(0).toUpperCase() + mode.slice(1);
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
  return (
    <nav className="flex flex-col gap-[1px]">
      {items.map((item) => {
        const active = isActiveRoute(item.href, pathname);
        const className =
          "sidebar-nav-item flex items-center gap-[10px] rounded-lg px-3 py-[7px] text-[13.5px] font-medium transition-colors " +
          (active
            ? "bg-[var(--color-bg-card)] text-[var(--color-fg)] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_0_0_1px_var(--color-border-default)]"
            : "text-[var(--color-fg-muted)] hover:bg-[var(--color-hover-mute)] hover:text-[var(--color-fg)]");

        const inner = (
          <>
            <SidebarIcon name={item.icon} />
            <span className="sidebar-label flex-1">{item.label}</span>
            {item.shortcut && (
              <span className="sidebar-shortcut rounded bg-[var(--color-hover-mute)] px-1.5 py-[2px] font-mono text-[10px] text-[var(--color-fg-faint)]">
                {item.shortcut}
              </span>
            )}
            {item.external && (
              <SidebarIcon
                name="external"
                className="sidebar-external-icon h-[11px] w-[11px] text-[var(--color-fg-faint)]"
              />
            )}
          </>
        );

        // aria-label so screen readers still get the link label even when
        // the visible text is collapsed away.
        const ariaLabel = item.label;

        if (item.href.startsWith("mailto:")) {
          const email = item.href.replace(/^mailto:/, "");
          return (
            <EmailButton
              key={item.href}
              email={email}
              className={className + " w-full"}
              tooltipPlacement="right"
              layout="block"
              ariaLabel={ariaLabel}
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
              aria-label={ariaLabel}
              title={ariaLabel}
            >
              {inner}
            </a>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={className}
            aria-label={ariaLabel}
            title={ariaLabel}
          >
            {inner}
          </Link>
        );
      })}
    </nav>
  );
}

function SearchIcon() {
  return (
    <svg
      width="14"
      height="14"
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
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {direction === "left" ? (
        <path d="m15 18-6-6 6-6" />
      ) : (
        <path d="m9 18 6-6-6-6" />
      )}
    </svg>
  );
}
