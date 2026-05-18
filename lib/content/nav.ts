// Sidebar navigation groups. Shortcut letters power the keyboard shortcuts.
//
// `label` is the English fallback / English-only consumers like the cmd
// palette and keyboard-nav use it as-is. `labelKey` is the i18n key the
// sidebar uses via useT() to render the localized label.

import { profile } from "./profile";
import type { MessageKey } from "@/lib/i18n/messages";

export type NavLink = {
  href: string;
  label: string;
  labelKey: MessageKey;
  shortcut?: string;
  icon: string;
  external?: boolean;
};

// /blog is archived (see .archive/blog/README.md). Shortcut numbers
// re-flow so they stay contiguous (no skipped 4).
export const navItems: NavLink[] = [
  { href: "/", label: "Home", labelKey: "nav.home", shortcut: "1", icon: "home" },
  { href: "/about", label: "About", labelKey: "nav.about", shortcut: "2", icon: "user" },
  { href: "/projects", label: "Projects", labelKey: "nav.projects", shortcut: "3", icon: "code" },
  { href: "/uses", label: "Uses", labelKey: "nav.uses", shortcut: "4", icon: "laptop" },
];

// /studio intentionally NOT listed here. The route + code stay
// (proxy.ts Basic-Auth gate + sanity/ folder + sanity.config.ts) so
// when Lwin wires up the CMS later it's a config-flip, not a rewrite.
// Until then the link doesn't surface anywhere user-visible: not in
// the sidebar, not in the mobile sheet, not in the cmd palette.
// Direct /studio access still works for the maintainer.
export const navResources: NavLink[] = [
  { href: "/highlights", label: "Highlights", labelKey: "nav.highlights", shortcut: "5", icon: "medal" },
  { href: "/resume", label: "Resume", labelKey: "nav.resume", shortcut: "6", icon: "file" },
];

export const navContact: NavLink[] = [
  // No keyboard shortcuts on stay-in-touch items: they are not pages, they
  // open mail clients or external sites. Visual badges would suggest they
  // are navigable like the rest of the nav, which they are not.
  { href: `mailto:${profile.email}`, label: "Email", labelKey: "nav.email", icon: "mail" },
  { href: "https://wa.me/6593849006", label: "WhatsApp", labelKey: "nav.whatsapp", icon: "whatsapp", external: true },
  { href: profile.github, label: "GitHub", labelKey: "nav.github", icon: "github", external: true },
  { href: profile.linkedin, label: "LinkedIn", labelKey: "nav.linkedin", icon: "linkedin", external: true },
];
