// Sidebar navigation groups. Shortcut letters power the keyboard shortcuts (future feature).

import { profile } from "./profile";

export type NavLink = {
  href: string;
  label: string;
  shortcut?: string;
  icon: string;
  external?: boolean;
};

export const navItems: NavLink[] = [
  { href: "/", label: "Home", shortcut: "1", icon: "home" },
  { href: "/about", label: "About", shortcut: "2", icon: "user" },
  { href: "/projects", label: "Projects", shortcut: "3", icon: "code" },
  { href: "/blog", label: "Blog", shortcut: "4", icon: "pen" },
  { href: "/uses", label: "Uses", shortcut: "5", icon: "laptop" },
];

export const navResources: NavLink[] = [
  { href: "/highlights", label: "Highlights", shortcut: "6", icon: "medal" },
  { href: "/resume", label: "Resume", shortcut: "7", icon: "file" },
  { href: "/studio", label: "Studio", icon: "laptop" },
];

export const navContact: NavLink[] = [
  // No keyboard shortcuts on stay-in-touch items: they are not pages, they
  // open mail clients or external sites. Visual badges would suggest they
  // are navigable like the rest of the nav, which they are not.
  { href: `mailto:${profile.email}`, label: "Email", icon: "mail" },
  { href: "https://wa.me/6593849006", label: "WhatsApp", icon: "whatsapp", external: true },
  { href: profile.github, label: "GitHub", icon: "github", external: true },
  { href: profile.linkedin, label: "LinkedIn", icon: "linkedin", external: true },
];
