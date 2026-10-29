import type { MetadataRoute } from "next";
import { profile } from "@/lib/content/profile";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Studio is auth-gated by Sanity but no value to indexing.
      disallow: ["/studio", "/studio/"],
    },
    sitemap: `${profile.siteUrl}/sitemap.xml`,
    host: profile.siteUrl,
  };
}
