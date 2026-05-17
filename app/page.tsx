import type { Metadata } from "next";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Hero } from "@/components/sections/hero";
import { Highlights } from "@/components/sections/highlights";
import { Experience } from "@/components/sections/experience";
import { Education } from "@/components/sections/education";
import { SkillsStack } from "@/components/sections/skills-stack";
import { PersonJsonLd } from "@/components/structured-data";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  // Use full title so we do not double up with the layout template.
  title: {
    absolute: "Lwin MMT, AI and IIoT Engineer",
  },
  description:
    "Information Systems student at Singapore Management University. AI & IIoT Engineer at VNTT in Ho Chi Minh City. I build IoT systems and ship products end-to-end.",
};

export default function Home() {
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
      {/* FeaturedProjects intentionally removed from home — the
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
