"use client";

import { Terminal } from "@/components/ui/terminal";
import { useT } from "@/lib/i18n/client";

// Hero terminal variant — alternative to the canvas globe. Renders an
// auto-typing mock shell session that "introduces" Lwin via cd / cat /
// ls / open commands. The COMMANDS themselves stay English (universal
// shell syntax — `whoami`, `cat about.md`) but the OUTPUTS describe
// Lwin's role and translate via i18n keys so VI readers see VI prose.

const COMMANDS = [
  "whoami",
  "cat about.md",
  "ls projects/",
  "echo $EMAIL",
];

export function HeroTerminal() {
  const t = useT();
  const outputs: Record<number, string[]> = {
    0: ["lwin mmt"],
    1: [
      t("hero.terminal.role"),
      t("hero.terminal.school"),
      t("hero.terminal.location"),
    ],
    2: ["esmos/  royce-connect/  smart-greenhouse/  multi-cloud/"],
    3: ["lwinmmt@gmail.com"],
  };
  return (
    <Terminal
      commands={COMMANDS}
      outputs={outputs}
      username="lwin@portfolio"
      typingSpeed={45}
      delayBetweenCommands={900}
      enableSound
    />
  );
}
