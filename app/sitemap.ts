import type { MetadataRoute } from "next";
import { projects, profile } from "@/lib/content";

const CONTENT_LAST_MODIFIED = new Date("2026-10-29");
const STATIC_ROUTES = ["", "/about", "/projects", "/highlights", "/uses", "/resume"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC_ROUTES.map((path) => ({
      url: `${profile.siteUrl}/en${path}`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...projects.map((project) => ({
      url: `${profile.siteUrl}/en/projects/${project.slug}`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: project.featured ? 0.8 : 0.5,
    })),
  ];
}
