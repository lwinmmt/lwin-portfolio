// Technical skills, grouped by category. Surfaced on the home Skills section
// and the /uses page (with more detail).

export type SkillGroup = {
  id: string;
  label: string;
  /** Optional Vietnamese variant of the group label. Stack tokens
   *  inside `items` stay in their original English form. */
  labelVi?: string;
  description?: string;
  descriptionVi?: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    label: "Languages",
    labelVi: "Ngôn ngữ lập trình",
    items: ["Python", "TypeScript", "JavaScript", "HTML & CSS", "SQL", "C++"],
  },
  {
    id: "cloud-iot",
    label: "Cloud & IoT",
    labelVi: "Cloud & IoT",
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
    labelVi: "Công cụ AI",
    description: "Used daily as core part of the workflow",
    descriptionVi: "Dùng hằng ngày như một phần cốt lõi của workflow",
    items: ["Claude Code", "Gemini", "ChatGPT", "Kimi"],
  },
];
