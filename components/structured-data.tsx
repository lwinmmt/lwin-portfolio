import { profile } from "@/lib/content";

/**
 * JSON-LD Person schema. Mount on the home page so Google rich results
 * can surface the right entity. Kept as a Server Component since this is
 * static metadata, not client state.
 */
export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.currentRole,
    worksFor: {
      "@type": "Organization",
      name: profile.currentOrgFullName,
      url: profile.currentOrgLink,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: profile.school,
      url: profile.schoolLink,
    },
    url: "https://lwinmmt.com",
    email: `mailto:${profile.email}`,
    sameAs: [profile.github, profile.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location,
    },
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * JSON-LD BreadcrumbList for project case study pages. Helps Google
 * render breadcrumbs in search results.
 */
export function ProjectBreadcrumbsJsonLd({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Projects",
        item: "https://lwinmmt.com/projects",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: `https://lwinmmt.com/projects/${slug}`,
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
