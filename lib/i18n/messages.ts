import type { Locale } from "./types";

// Translation dictionary. Add a new key under BOTH locales when you need
// a new translated string. Keys use dot.notation for grouping.
//
// Phase 1 covers sidebar nav + sidebar chrome. Hero, about, projects,
// experience, etc. follow in subsequent phases.

export const messages = {
  en: {
    // Sidebar navigation labels
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.blog": "Blog",
    "nav.uses": "Uses",
    "nav.highlights": "Highlights",
    "nav.resume": "Resume",
    "nav.studio": "Studio",
    "nav.email": "Email",
    "nav.whatsapp": "WhatsApp",
    "nav.github": "GitHub",
    "nav.linkedin": "LinkedIn",
    // Sidebar section headings
    "nav.section.resources": "Resources",
    "nav.section.stayInTouch": "Stay in touch",
    // Sidebar chrome
    "sidebar.subtitle": "AI & IIoT Engineer",
    "sidebar.search": "Search",
    // Language switcher
    "switcher.aria": "Language",
  },
  vi: {
    // Sidebar navigation
    "nav.home": "Trang chủ",
    "nav.about": "Giới thiệu",
    "nav.projects": "Dự án",
    "nav.blog": "Blog",
    "nav.uses": "Công cụ",
    "nav.highlights": "Điểm nổi bật",
    "nav.resume": "Hồ sơ",
    "nav.studio": "Studio",
    "nav.email": "Email",
    "nav.whatsapp": "WhatsApp",
    "nav.github": "GitHub",
    "nav.linkedin": "LinkedIn",
    // Section headings
    "nav.section.resources": "Tài nguyên",
    "nav.section.stayInTouch": "Liên hệ",
    // Sidebar chrome
    "sidebar.subtitle": "Kỹ sư AI & IIoT",
    "sidebar.search": "Tìm kiếm",
    // Language switcher
    "switcher.aria": "Ngôn ngữ",
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type MessageKey = keyof typeof messages.en;
