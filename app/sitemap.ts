import type { MetadataRoute } from "next";
import { projects } from "@/lib/content";

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

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_ROUTES.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
  const projectEntries = projects.map((p) => ({
    url: `${BASE}/projects/${p.slug}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: p.featured ? 0.8 : 0.5,
  }));
  return [...staticEntries, ...projectEntries];
}
