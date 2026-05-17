"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  navItems,
  navResources,
  navContact,
  projects,
  profile,
  type NavLink,
  type ProjectCategory,
} from "@/lib/content";
import { useLocale, useT } from "@/lib/i18n/client";
import { pickLocalized } from "@/lib/i18n/content";
import type { MessageKey } from "@/lib/i18n/messages";
import type { Locale } from "@/lib/i18n/types";
import { useModKey } from "@/lib/use-mod-key";

type PaletteGroup = "Pages" | "Projects" | "Actions";

type PaletteItem = {
  id: string;
  label: string;
  hint?: string;
  group: PaletteGroup;
  shortcut?: string;
  /** Either a route for router.push or an absolute URL for window.open. */
  href: string;
  external?: boolean;
  /** Synonym tokens for matching. Lowercase. */
  search: string;
};

const GROUP_ORDER: PaletteGroup[] = ["Pages", "Projects", "Actions"];

const GROUP_LABEL_KEY: Record<PaletteGroup, MessageKey> = {
  Pages: "cmd.group.pages",
  Projects: "cmd.group.projects",
  Actions: "cmd.group.actions",
};

const PROJECT_CATEGORY_KEY: Record<ProjectCategory, MessageKey> = {
  Projects: "projects.category.Projects",
  Coursework: "projects.category.Coursework",
};

function buildItems(
  t: (k: MessageKey) => string,
  locale: Locale,
): PaletteItem[] {
  const navAll: NavLink[] = [...navItems, ...navResources, ...navContact];
  const pages: PaletteItem[] = navAll.map((n) => {
    const label = t(n.labelKey);
    const hint = n.href.startsWith("mailto:")
      ? t("cmd.hint.email")
      : n.href.startsWith("http")
        ? t("cmd.hint.external")
        : t("cmd.hint.page");
    return {
      id: `nav:${n.href}`,
      label,
      hint,
      group: "Pages" as const,
      shortcut: n.shortcut,
      href: n.href,
      external: n.external || n.href.startsWith("http"),
      search: `${label} ${n.label} ${n.href}`.toLowerCase(),
    };
  });

  const projectItems: PaletteItem[] = projects.map((p) => {
    const label = pickLocalized(p.title, p.titleVi, locale);
    return {
      id: `project:${p.slug}`,
      label,
      hint: t(PROJECT_CATEGORY_KEY[p.category]),
      group: "Projects" as const,
      href: `/projects/${p.slug}`,
      // Include both EN and VI strings in the search blob so users
      // typing in either language still find the project.
      search: `${label} ${p.title} ${p.tags.join(" ")} ${p.course ?? ""}`.toLowerCase(),
    };
  });

  const actionHint = t("cmd.hint.action");
  const externalHint = t("cmd.hint.external");
  const actions: PaletteItem[] = [
    {
      id: "action:resume",
      label: t("cmd.action.resumePdf"),
      hint: actionHint,
      group: "Actions",
      href: "/resume/lwinmmt-resume.pdf",
      external: true,
      search: "download resume pdf cv hồ sơ",
    },
    {
      id: "action:email",
      label: t("cmd.action.email").replace("{email}", profile.email),
      hint: actionHint,
      group: "Actions",
      href: `mailto:${profile.email}`,
      external: true,
      search: `email mail contact ${profile.email}`,
    },
    {
      id: "action:github",
      label: t("cmd.action.github"),
      hint: externalHint,
      group: "Actions",
      href: profile.github,
      external: true,
      search: "github code repo",
    },
    {
      id: "action:linkedin",
      label: t("cmd.action.linkedin"),
      hint: externalHint,
      group: "Actions",
      href: profile.linkedin,
      external: true,
      search: "linkedin contact",
    },
  ];

  return [...pages, ...projectItems, ...actions];
}

export function CmdPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const t = useT();
  const locale = useLocale();
  const modKey = useModKey();

  // Rebuild when locale or t() changes so labels stay in the active
  // language. t identity changes per LocaleProvider re-render.
  const items = useMemo(() => buildItems(t, locale), [t, locale]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) => it.search.includes(q));
  }, [items, query]);

  const grouped = useMemo(() => {
    const map = new Map<PaletteItem["group"], PaletteItem[]>();
    for (const it of filtered) {
      const arr = map.get(it.group) ?? [];
      arr.push(it);
      map.set(it.group, arr);
    }
    return GROUP_ORDER.map((g) => ({ group: g, items: map.get(g) ?? [] })).filter(
      (g) => g.items.length > 0,
    );
  }, [filtered]);

  const flat = useMemo(() => grouped.flatMap((g) => g.items), [grouped]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIdx(0);
  }, []);

  // Global Cmd+K / Ctrl+K trigger, plus a CustomEvent escape hatch so
  // any sidebar button can open the palette without prop-drilling.
  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    const opener = () => setOpen(true);
    window.addEventListener("keydown", keyHandler);
    window.addEventListener("cmdpalette:open", opener);
    return () => {
      window.removeEventListener("keydown", keyHandler);
      window.removeEventListener("cmdpalette:open", opener);
    };
  }, []);

  // Focus input when opening, lock body scroll, handle Esc.
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = requestAnimationFrame(() => inputRef.current?.focus());
    const escHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    };
    document.addEventListener("keydown", escHandler);
    return () => {
      document.body.style.overflow = original;
      cancelAnimationFrame(t);
      document.removeEventListener("keydown", escHandler);
    };
  }, [open, close]);

  // Reset activeIdx when filter changes.
  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  const runItem = useCallback(
    (item: PaletteItem) => {
      close();
      if (item.external) {
        if (item.href.startsWith("mailto:")) {
          window.location.href = item.href;
        } else {
          window.open(item.href, "_blank", "noopener,noreferrer");
        }
        return;
      }
      router.push(item.href);
    },
    [close, router],
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, Math.max(flat.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = flat[activeIdx];
      if (item) runItem(item);
    }
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("cmd.aria.dialog")}
      className="fixed inset-0 z-[60] flex items-start justify-center bg-[rgba(15,23,42,0.75)] p-4 pt-[14vh] backdrop-blur-sm"
      onClick={close}
    >
      <div
        className="glass-overlay w-full max-w-[560px] overflow-hidden rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-bg-card)] shadow-[0_24px_64px_rgba(0,0,0,0.25)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-[var(--color-border-soft)] px-4 py-3">
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
          <input
            ref={inputRef}
            type="text"
            placeholder={t("cmd.placeholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            className="flex-1 bg-transparent font-sans text-[14px] text-[var(--color-fg)] outline-none placeholder:text-[var(--color-fg-faint)]"
            aria-label={t("cmd.aria")}
          />
          <kbd className="rounded bg-[var(--color-hover-mute)] px-1.5 py-[2px] font-mono text-[10px] text-[var(--color-fg-faint)]">
            Esc
          </kbd>
        </div>
        <div ref={listRef} className="max-h-[60vh] overflow-y-auto py-2">
          {grouped.length === 0 ? (
            <div className="px-4 py-8 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-faint)]">
              {t("cmd.empty").replace("{q}", query)}
            </div>
          ) : (
            grouped.map(({ group, items: rows }) => (
              <div key={group} className="mb-2 last:mb-0">
                <div className="px-4 pt-2 pb-1 font-mono text-[9.5px] uppercase tracking-[0.16em] text-[var(--color-fg-faint)]">
                  {t(GROUP_LABEL_KEY[group])}
                </div>
                {rows.map((item) => {
                  const flatIdx = flat.indexOf(item);
                  const isActive = flatIdx === activeIdx;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => runItem(item)}
                      onMouseEnter={() => setActiveIdx(flatIdx)}
                      className={
                        "flex w-full items-center justify-between gap-3 px-4 py-2 text-left font-sans text-[13.5px] transition-colors " +
                        (isActive
                          ? "bg-[var(--color-hover-mute)] text-[var(--color-fg)]"
                          : "text-[var(--color-fg-soft)] hover:bg-[var(--color-hover-mute)]")
                      }
                    >
                      <span className="min-w-0 flex-1 truncate">{item.label}</span>
                      <span className="flex shrink-0 items-center gap-2">
                        {item.hint && (
                          <span className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-[var(--color-fg-faint)]">
                            {item.hint}
                          </span>
                        )}
                        {item.shortcut && (
                          <kbd className="rounded bg-[var(--color-hover-mute)] px-1.5 py-[2px] font-mono text-[10px] text-[var(--color-fg-faint)]">
                            {item.shortcut}
                          </kbd>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
        <div className="flex items-center justify-between border-t border-[var(--color-border-soft)] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-fg-faint)]">
          <span className="inline-flex items-center gap-2">
            <kbd className="rounded bg-[var(--color-hover-mute)] px-1.5 py-[2px] text-[var(--color-fg-soft)]">
              ↑↓
            </kbd>
            {t("cmd.footer.navigate")}
          </span>
          <span className="inline-flex items-center gap-2">
            <kbd className="rounded bg-[var(--color-hover-mute)] px-1.5 py-[2px] text-[var(--color-fg-soft)]">
              Enter
            </kbd>
            {t("cmd.footer.open")}
          </span>
          <span className="inline-flex items-center gap-2">
            <kbd className="rounded bg-[var(--color-hover-mute)] px-1.5 py-[2px] text-[var(--color-fg-soft)]">
              {modKey.glyph}K
            </kbd>
            {t("cmd.footer.toggle")}
          </span>
        </div>
      </div>
    </div>
  );
}
