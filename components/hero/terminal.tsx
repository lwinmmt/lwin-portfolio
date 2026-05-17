"use client";

import { Terminal } from "@/components/ui/terminal";

// Hero terminal variant — alternative to the canvas globe. Renders an
// auto-typing mock shell session that "introduces" Lwin via cd / cat /
// ls / open commands. Commands are tuned to read both as plausible
// shell output and as a profile blurb in one scan.
//
// Mounted by HeroStage; swap is controlled via localStorage so a
// future visit reloads with the user's previously chosen variant.

const COMMANDS = [
  "whoami",
  "cat about.md",
  "ls projects/",
  "echo $EMAIL",
];

const OUTPUTS: Record<number, string[]> = {
  0: ["lwin mmt"],
  1: [
    "AI & IIoT Engineer @ VNTT",
    "Info Systems student @ SMU",
    "Ho Chi Minh City • GMT+7",
  ],
  2: ["esmos/  royce-connect/  smart-greenhouse/  multi-cloud/"],
  3: ["lwinmmt@gmail.com"],
};

export function HeroTerminal() {
  return (
    <Terminal
      commands={COMMANDS}
      outputs={OUTPUTS}
      username="lwin@portfolio"
      typingSpeed={45}
      delayBetweenCommands={900}
      enableSound
    />
  );
}
