// Daily tools, gear, software. Surfaced on /uses to signal AI-native fluency.

export type UsesItem = {
  name: string;
  detail?: string;
  link?: string;
};

export type UsesGroup = {
  id: string;
  label: string;
  description?: string;
  items: UsesItem[];
};

export const usesGroups: UsesGroup[] = [
  {
    id: "ai-tools",
    label: "AI Tools, Daily",
    description:
      "No fixed workflow. I reach for whichever model fits the task and validate the output. The skill is in knowing which to pick and how to frame the ask.",
    items: [
      {
        name: "Claude Code",
        detail: "Coding. CLI + IDE.",
        link: "https://claude.com/claude-code",
      },
      {
        name: "ChatGPT",
        detail: "Quick search, drafting, and image generation.",
        link: "https://chatgpt.com",
      },
      {
        name: "Gemini",
        detail: "Quick research, Google-integrated.",
        link: "https://gemini.google.com",
      },
      {
        name: "Kimi",
        detail: "Long-form essays and research.",
        link: "https://kimi.com",
      },
    ],
  },
  {
    id: "editor",
    label: "Editor & Terminal",
    items: [
      { name: "Sublime Text", detail: "Primary editor. Fast, minimal, dependable.", link: "https://www.sublimetext.com" },
      { name: "VS Code", detail: "Secondary editor when LSP and extensions matter.", link: "https://code.visualstudio.com" },
      { name: "Ghostty", detail: "Terminal. GPU-accelerated, native.", link: "https://ghostty.org" },
      { name: "Homebrew", detail: "macOS package manager.", link: "https://brew.sh" },
    ],
  },
  {
    id: "stack",
    label: "Stack I Reach For",
    items: [
      { name: "Next.js", detail: "App Router, server components." },
      { name: "TypeScript", detail: "Strict mode." },
      { name: "Tailwind CSS", detail: "Utility-first." },
      { name: "shadcn/ui", detail: "Component primitives." },
      { name: "PostgreSQL", detail: "Via Supabase or RDS." },
      { name: "Python", detail: "FastAPI for services, scripting." },
    ],
  },
  {
    id: "iot-stack",
    label: "IoT & Cloud Stack",
    items: [
      { name: "AWS", detail: "EC2, S3, ASG, IoT Core." },
      { name: "Azure", detail: "Fundamentals certified, used for ESMOS DR." },
      { name: "MQTT", detail: "Mosquitto broker, fault-tolerant." },
      { name: "Node-RED", detail: "Visual flow for edge logic." },
      { name: "ESP32 + Raspberry Pi", detail: "Edge hardware." },
      { name: "EdgeX Foundry", detail: "Learning at VNTT, production-scale." },
    ],
  },
  {
    id: "hardware",
    label: "Hardware",
    items: [
      { name: "MacBook Pro M2, 16 inch", detail: "Daily driver." },
    ],
  },
  {
    id: "everyday",
    label: "Everyday Software",
    items: [
      { name: "Raycast", detail: "Spotlight replacement. Launcher, snippets, clipboard history.", link: "https://raycast.com" },
      { name: "Akiflow", detail: "Task management. All my todos and time-blocks live here.", link: "https://akiflow.com" },
      { name: "Bitwarden", detail: "Password manager.", link: "https://bitwarden.com" },
      { name: "Linear", detail: "When projects have a team.", link: "https://linear.app" },
      { name: "Figma", detail: "When a UI needs sketching.", link: "https://figma.com" },
      { name: "Vercel", detail: "Hosting.", link: "https://vercel.com" },
      { name: "GitHub", detail: "Code.", link: "https://github.com" },
    ],
  },
];
