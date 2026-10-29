import type { Metadata } from "next";
import { profile } from "./content/profile";

// Shared English canonical and social metadata.
export function pageMetadata(
  path: string,
  title: string,
  description: string,
  imagePath = "/opengraph-image",
): Metadata {
  const url = `${profile.siteUrl}/en${path === "/" ? "" : path}`;
  const socialTitle = title.includes(profile.name) ? title : `${title} | ${profile.name}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: profile.name,
      locale: "en_SG",
      type: "website",
      images: [{
        url: `${profile.siteUrl}${imagePath}`,
        width: 1200,
        height: 630,
        alt: socialTitle,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [`${profile.siteUrl}${imagePath}`],
    },
  };
}
