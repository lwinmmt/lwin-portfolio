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
    // Hero
    "hero.greeting": "Hi, I'm",
    "hero.studentRole": "Information Systems student",
    "hero.intro.atSchool": "at",
    "hero.intro.iBuild": ". I build",
    "hero.intro.emphasis": "IoT systems and ship products end-to-end",
    "hero.intro.rest": ". Hardware, cloud, and the operating system in between. Engineer by training. Daily AI-tools operator.",
    "hero.rightNow": "Right now",
    "hero.currentRole": "AI & IIoT Engineer",
    "hero.currentRole.at": "at",
    "hero.currentOrgFullName": "Vietnam Technology & Telecommunication Joint Stock Company",
    "hero.cta.resume": "Resume",
    "hero.cta.email": "Email",
    "hero.cta.github": "GitHub",
    "hero.cta.linkedin": "LinkedIn",
    "hero.cta.ariaCurrentRole": "Currently {role} at {org}, opens in new tab",
    // Globe
    "globe.dragToRotate": "Drag to rotate.",
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
    // Hero
    "hero.greeting": "Xin chào, tôi là",
    "hero.studentRole": "sinh viên ngành Hệ thống Thông tin",
    "hero.intro.atSchool": "tại",
    "hero.intro.iBuild": ". Tôi xây dựng",
    "hero.intro.emphasis": "hệ thống IoT và đưa sản phẩm ra thị trường, từ đầu đến cuối",
    "hero.intro.rest": ". Phần cứng, điện toán đám mây, và hệ điều hành ở giữa. Kỹ sư được đào tạo bài bản. Sử dụng công cụ AI hàng ngày.",
    "hero.rightNow": "Hiện tại",
    "hero.currentRole": "Kỹ sư AI & IIoT",
    "hero.currentRole.at": "tại",
    "hero.currentOrgFullName": "Công ty Cổ phần Công nghệ và Viễn thông Việt Nam",
    "hero.cta.resume": "Hồ sơ",
    "hero.cta.email": "Email",
    "hero.cta.github": "GitHub",
    "hero.cta.linkedin": "LinkedIn",
    "hero.cta.ariaCurrentRole": "Hiện đang là {role} tại {org}, mở trong tab mới",
    // Globe
    "globe.dragToRotate": "Kéo để xoay.",
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type MessageKey = keyof typeof messages.en;
