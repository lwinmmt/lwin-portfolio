import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Studio is auth-gated by Sanity but no value to indexing.
      disallow: ["/studio", "/studio/"],
    },
    sitemap: "https://lwinmmt.com/sitemap.xml",
    host: "https://lwinmmt.com",
  };
}
