import type { Metadata } from "next";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Hero } from "@/components/sections/hero";
import { Highlights } from "@/components/sections/highlights";
import { Experience } from "@/components/sections/experience";
import { Education } from "@/components/sections/education";
import { SkillsStack } from "@/components/sections/skills-stack";
import { PersonJsonLd } from "@/components/structured-data";
import { Reveal } from "@/components/ui/reveal";
import { seedLocaleFromParams } from "@/lib/i18n/server";
import { messages } from "@/lib/i18n/messages";
import { LOCALES, type Locale } from "@/lib/i18n/types";

const VALID_LOCALES: ReadonlySet<string> = new Set(LOCALES);

// Per-locale metadata for the home route. Inherits openGraph + twitter
// blocks from app/[lang]/layout.tsx generateMetadata. Sets the
// absolute title so the route-level template does not double-up.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!VALID_LOCALES.has(lang)) return {};
  const locale = lang as Locale;
  const m = messages[locale];
  return {
    title: { absolute: m["meta.title.default"] },
    description: m["meta.description"],
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  await seedLocaleFromParams(params);
  return (
    <DashboardShell>
      <PersonJsonLd />
      {/* Hero has its own staggered fade-up animations on first paint; the
          rest of the page sections fade + blur in as they enter the
          viewport via Reveal. */}
      <Hero />
      <Reveal>
        <Experience />
      </Reveal>
      <Reveal>
        <Highlights />
      </Reveal>
      {/* FeaturedProjects intentionally removed from home. The
          homepage was getting long and recent highlights already
          carries the "look what I'm shipping" signal. The full
          projects list lives at /projects. */}
      <Reveal>
        <Education />
      </Reveal>
      <Reveal>
        <SkillsStack />
      </Reveal>
    </DashboardShell>
  );
}
