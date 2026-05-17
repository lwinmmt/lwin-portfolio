import { profile } from "@/lib/content";

// Escape characters that could break out of a <script> tag if a string
// in the JSON-LD payload ever happens to contain them. JSON parsers
// accept these \uXXXX escapes, so the rendered structured data still
// validates. Today the payload is fully server-controlled (profile +
// project metadata), but defensive encoding costs nothing.
//
// U+2028 (LINE SEPARATOR) and U+2029 (PARAGRAPH SEPARATOR) get the
// same treatment. They are legal inside JSON string values but were
// historically illegal in raw JavaScript source, so an inline
// <script>...</script> containing them could break in older parsers.
//
// Both regex sources use explicit \uXXXX escape sequences (NOT literal
// characters). Writing the literal U+2028 / U+2029 bytes into this
// file is editor-hostile: a linter or save-hook normalising "invisible
// whitespace" to ASCII space silently turns these into ASCII-space
// replacers and breaks the defence-in-depth escaping. The constructor
// form keeps the source file ASCII-only.
const U2028 = new RegExp(String.fromCharCode(0x2028), "g");
const U2029 = new RegExp(String.fromCharCode(0x2029), "g");

function safeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(U2028, "\\u2028")
    .replace(U2029, "\\u2029");
}

/**
 * JSON-LD Person schema. Mount on the home page so Google rich results
 * can surface the right entity. Kept as a Server Component since this is
 * static metadata, not client state.
 */
export function PersonJsonLd() {
  // NOTE: `email` is intentionally omitted from this JSON-LD payload.
  // Scrapers routinely harvest <script type="application/ld+json">
  // blocks, so emitting the raw address here would defeat the
  // mailto-on-click obfuscation done in EmailButton. The schema.org
  // Person SEO benefit of a machine-readable email is negligible
  // (Google primarily uses the address for sitelinks, not ranking).
  // GitHub + LinkedIn sameAs already gives crawlers two contact paths.
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    alternateName: "Lwin Min Min Thant",
    jobTitle: profile.currentRole,
    worksFor: { "@type": "Organization", name: profile.currentOrg },
    url: "https://lwinmmt.com",
    sameAs: [profile.github, profile.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location,
    },
    image: profile.photoSrc,
    description:
      "Information Systems student at Singapore Management University. AI & IIoT Engineer at VNTT in Ho Chi Minh City. I build IoT systems and ship products end-to-end.",
  };
  return (
    <script
      type="application/ld+json"
       
      dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }}
    />
  );
}

/**
 * JSON-LD BreadcrumbList for project detail pages. Helps Google show
 * Home > Projects > [project title] in rich results.
 */
export function ProjectBreadcrumbsJsonLd({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  const base = "https://lwinmmt.com";
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: base },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${base}/projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `${base}/projects/${slug}`,
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
       
      dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }}
    />
  );
}
