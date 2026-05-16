import type { Metadata } from "next";

// Metadata for /projects index lives here because the page itself is a
// Client Component (needed for filter state). The dynamic /projects/[slug]
// page exports its own generateMetadata, which overrides this default.
export const metadata: Metadata = {
  title: "Projects",
  description:
    "Production work, coursework (Singapore Management University and Singapore Polytechnic), and projects I started myself.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
