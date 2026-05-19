// Sidebar / nav icon set, sourced from Phosphor (Regular weight).
//
// Previously every icon was inlined as a hand-drawn SVG matched to
// the Lucide vocabulary. Switched to Phosphor because:
//   - It covers every glyph the site needs INCLUDING brand logos
//     (GitHub, LinkedIn, WhatsApp), avoiding the Radix/Heroicons
//     supplement-pack juggling.
//   - One consistent visual style across all 13 icons in use,
//     instead of 13 separately-tuned hand-drawn paths.
//   - Lazy / per-icon imports keep the bundle small (~1KB gz each).
//
// `@phosphor-icons/react/dist/ssr` exports static SVG components that
// do NOT subscribe to the IconContext provider — safe inside server
// components and lighter than the default `@phosphor-icons/react`
// entry point, which is "use client" because of the context.
//
// The string-keyed `name` API is preserved verbatim (home, user, code,
// pen, ...) so every existing call site in the sidebar, mobile dock,
// and content config keeps working without renames. The Phosphor
// component each name resolves to is the only thing that changed.

import {
  ArrowSquareOut,
  DotsThree,
  EnvelopeSimple,
  FileText,
  Folder,
  GithubLogo,
  House,
  Laptop,
  LinkedinLogo,
  Medal,
  Pencil,
  Storefront,
  User,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import type { ComponentType, SVGProps } from "react";

type Props = { name: string; className?: string };

// Phosphor SSR components accept standard SVG props plus `size`,
// `color`, `weight`, `mirrored`. We only ever pass className (which
// Tailwind uses to set h/w via h-[15px] w-[15px] etc.) so a generic
// SVG component type is enough for the typing.
type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

// Keep the case keys identical to the previous switch so every
// caller (lib/content/nav.ts, mobile-dock SHEET_INTERNAL, etc.)
// keeps working. Names like "code" still map to a folder shape;
// renaming would touch ~10 unrelated files for zero functional
// gain.
//
// Some entries map to icons that are temporarily not surfaced in
// any nav config (pen for archived /blog, studio for the hidden CMS
// route). Kept so restoring those routes is a config-file edit
// rather than also having to re-add icon mappings. Sun/Moon/CircleHalf
// (former theme toggle icons) were removed entirely along with the
// next-themes dependency — the site is light-only.
const ICONS: Record<string, IconComponent> = {
  // Active nav (sidebar + mobile dock)
  home: House,
  user: User,
  code: Folder, // case key preserved; renders folder for /projects
  laptop: Laptop,
  medal: Medal,
  highlights: Medal, // alias used by mobile sheet SHEET_INTERNAL
  file: FileText,
  mail: EnvelopeSimple,
  whatsapp: WhatsappLogo,
  github: GithubLogo,
  linkedin: LinkedinLogo,
  external: ArrowSquareOut,
  more: DotsThree,
  // Archived / hidden — present so restore is a one-line nav.ts edit
  pen: Pencil, // /blog (archived)
  studio: Storefront, // /studio (Basic-Auth gated, not in nav)
};

export function SidebarIcon({
  name,
  className = "h-[15px] w-[15px]",
}: Props) {
  const Icon = ICONS[name];
  if (!Icon) return null;
  // aria-hidden on every icon: nav rows carry their own visible
  // labels (Sidebar) or aria-label on the wrapping Link/button
  // (mobile dock). Re-announcing the icon shape would be noise.
  // `focusable="false"` as a string (not boolean) — SVG attribute
  // values are strings, and React emits a dev-mode warning if you
  // pass a JS boolean to a non-boolean attribute. The string form
  // serializes identically and silences the warning.
  return <Icon className={className} aria-hidden focusable="false" />;
}
