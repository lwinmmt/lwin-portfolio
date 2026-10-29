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
    label: "Programming & automation",
    labelVi: "Ngôn ngữ lập trình",
    items: [
      "Python", "MicroPython", "PowerShell", "TypeScript",
      "JavaScript", "HTML & CSS", "SQL", "C++",
    ],
  },
  {
    id: "cloud-deployment",
    label: "Cloud & deployment",
    labelVi: "Cloud & IoT",
    items: [
      "Amazon Web Services",
      "Microsoft Azure",
      "Terraform",
      "Docker",
      "Docker Compose",
      "Linux",
    ],
  },
  {
    id: "device-integration",
    label: "Device-to-cloud integration",
    items: [
      "MQTT",
      "Mosquitto",
      "HiveMQ Cloud",
      "Node-RED",
      "EdgeX Foundry",
      "Raspberry Pi",
      "ESP32",
    ],
  },
  {
    id: "product-delivery",
    label: "Product & delivery",
    items: [
      "Requirements gathering", "Figma Make",
      "User acceptance testing", "Service Design Documents",
    ],
  },
  {
    id: "ai-tools",
    label: "AI-assisted development",
    labelVi: "Công cụ AI",
    items: ["Claude Code", "Gemini", "ChatGPT"],
  },
];
