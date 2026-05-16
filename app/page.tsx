import type { Metadata } from "next";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Hero } from "@/components/sections/hero";
import { Highlights } from "@/components/sections/highlights";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Experience } from "@/components/sections/experience";
import { Education } from "@/components/sections/education";
import { SkillsStack } from "@/components/sections/skills-stack";
import { PersonJsonLd } from "@/components/structured-data";

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
      <Hero />
      <Experience />
      <Highlights />
      <FeaturedProjects />
      <Education />
      <SkillsStack />
    </DashboardShell>
  );
}
