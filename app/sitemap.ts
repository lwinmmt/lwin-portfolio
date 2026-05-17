import type { MetadataRoute } from "next";
import { projects } from "@/lib/content";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n/types";

const BASE = "https://lwinmmt.com";

// Bump this date when material content changes so crawlers re-index
// without burning crawl budget on every deploy.
const CONTENT_LAST_MODIFIED = new Date("2026-05-16");

const STATIC_ROUTES = [
  "",
  "/about",
  "/projects",
  "/highlights",
  "/blog",
  "/uses",
  "/resume",
];

// Both /en/... and /vi/... variants get listed, plus an `alternates`
// block per URL so crawlers (Google in particular) treat them as
// translations of one another rather than competing duplicates. The
// default-locale variant is also linked as x-default for users whose
// language preference doesn't match either explicit locale.
export default function sitemap(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [];

  for (const path of STATIC_ROUTES) {
    const alternateLanguages: Record<string, string> = {
      "x-default": `${BASE}/${DEFAULT_LOCALE}${path}`,
    };
    for (const lang of LOCALES) {
      alternateLanguages[lang] = `${BASE}/${lang}${path}`;
    }
    for (const lang of LOCALES) {
      out.push({
        url: `${BASE}/${lang}${path}`,
        lastModified: CONTENT_LAST_MODIFIED,
        changeFrequency: "monthly",
        priority: path === "" ? 1 : 0.7,
        alternates: { languages: alternateLanguages },
      });
    }
  }

  for (const p of projects) {
    const alternateLanguages: Record<string, string> = {
      "x-default": `${BASE}/${DEFAULT_LOCALE}/projects/${p.slug}`,
    };
    for (const lang of LOCALES) {
      alternateLanguages[lang] = `${BASE}/${lang}/projects/${p.slug}`;
    }
    for (const lang of LOCALES) {
      out.push({
        url: `${BASE}/${lang}/projects/${p.slug}`,
        lastModified: CONTENT_LAST_MODIFIED,
        changeFrequency: "monthly",
        priority: p.featured ? 0.8 : 0.5,
        alternates: { languages: alternateLanguages },
      });
    }
  }

  return out;
}
