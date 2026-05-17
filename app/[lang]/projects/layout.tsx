import type { Metadata } from "next";
import { seedLocaleFromParams } from "@/lib/i18n/server";
import { messages } from "@/lib/i18n/messages";

// Metadata for /projects index lives here because the page itself is a
// Client Component (needed for filter state). The dynamic /projects/[slug]
// page exports its own generateMetadata, which overrides this default.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const locale = await seedLocaleFromParams(params);
  const m = messages[locale];
  return {
    title: m["page.title.projects"],
    description: m["page.description.projects"],
  };
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
