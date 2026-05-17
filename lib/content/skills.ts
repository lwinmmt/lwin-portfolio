// Technical skills, grouped by category. Surfaced on the home Skills section
// and the /uses page (with more detail).

export type SkillGroup = {
  id: string;
  label: string;
  description?: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    label: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "HTML & CSS", "SQL", "C++"],
  },
  {
    id: "cloud-iot",
    label: "Cloud & IoT",
    items: [
      "Amazon Web Services",
      "Azure Fundamentals",
      "MQTT",
      "Node-RED",
      "EdgeX Foundry",
      "Raspberry Pi",
      "ESP32",
      "Linux",
    ],
  },
  {
    id: "ai-tools",
    label: "AI Tools",
    description: "Used daily as core part of the workflow",
    items: ["Claude Code", "Gemini", "ChatGPT", "Kimi"],
  },
];
