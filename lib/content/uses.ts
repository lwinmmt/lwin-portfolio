// Daily tools, gear, software. Surfaced on /uses to signal AI-native
// fluency for the featured sections, and proven breadth via the
// "Tools I've worked with" chip block at the bottom.

export type UsesItem = {
  name: string;
  detail?: string;
  /** Optional Vietnamese variant of the detail line. Tool names
   *  themselves stay in their original English form. */
  detailVi?: string;
  link?: string;
};

export type UsesGroup = {
  id: string;
  label: string;
  /** Optional Vietnamese variant of the group label. */
  labelVi?: string;
  description?: string;
  descriptionVi?: string;
  items: UsesItem[];
};

/** Featured groups. Each renders with per-item descriptions and is
 *  laid out distinctly on the page (AI tools as a hero band,
 *  Languages as a chip strip with no descriptions, Editor +
 *  Everyday side-by-side at the bottom with Hardware merged into
 *  Everyday as a tagged prefix). */
export const usesGroups: UsesGroup[] = [
  {
    "id": "ai-tools",
    "label": "AI-assisted development",
    "description": "I use AI to assist implementation, scripting, research and iteration. My work includes framing the problem, choosing the architecture, reviewing output and integrating the result.",
    "items": [
      {
        "name": "Claude Code",
        "detail": "Coding. CLI + IDE.",
        "link": "https://claude.com/claude-code"
      },
      {
        "name": "ChatGPT",
        "detail": "Quick search, drafting, and image generation.",
        "link": "https://chatgpt.com"
      },
      {
        "name": "Gemini",
        "detail": "Quick research, Google-integrated.",
        "link": "https://gemini.google.com"
      },
      {
        "name": "Kimi",
        "detail": "Long-form essays and research.",
        "link": "https://kimi.com"
      }
    ]
  },
  {
    "id": "languages",
    "label": "Languages",
    "items": [
      {
        "name": "Python"
      },
      {
        "name": "TypeScript / JavaScript"
      },
      {
        "name": "SQL"
      },
      {
        "name": "HTML"
      },
      {
        "name": "CSS"
      },
      {
        "name": "MicroPython"
      },
      {
        "name": "PowerShell"
      },
      {
        "name": "C++"
      }
    ]
  },
  {
    "id": "editor",
    "label": "Editor & Terminal",
    "items": [
      {
        "name": "Sublime Text",
        "detail": "Quick notes, drafts and text editing.",
        "link": "https://www.sublimetext.com"
      },
      {
        "name": "VS Code",
        "detail": "Code editing and project development.",
        "link": "https://code.visualstudio.com"
      },
      {
        "name": "Ghostty",
        "detail": "Terminal. GPU-accelerated, native.",
        "link": "https://ghostty.org"
      },
      {
        "name": "Homebrew",
        "detail": "macOS package manager.",
        "link": "https://brew.sh"
      },
      {
        "name": "Overleaf",
        "detail": "LaTeX resume editing and document preparation.",
        "link": "https://www.overleaf.com/"
      }
    ]
  },
  {
    "id": "hardware",
    "label": "Hardware",
    "items": [
      {
        "name": "MacBook Pro M2, 16 inch",
        "detail": "Development laptop."
      }
    ]
  },
  {
    "id": "everyday",
    "label": "Productivity & software",
    "items": [
      {
        "name": "Raycast",
        "detail": "Spotlight replacement. Launcher, snippets, clipboard history.",
        "link": "https://raycast.com"
      },
      {
        "name": "Akiflow",
        "detail": "Task management and time blocking.",
        "link": "https://akiflow.com"
      },
      {
        "name": "Bitwarden",
        "detail": "Password manager.",
        "link": "https://bitwarden.com"
      },
      {
        "name": "Linear",
        "detail": "Team project and issue tracking.",
        "link": "https://linear.app"
      },
      {
        "name": "Comet",
        "detail": "Browser with AI-assisted research tools.",
        "link": "https://comet.perplexity.ai"
      },
      {
        "name": "Notion",
        "detail": "Notes, documentation and drafts.",
        "link": "https://notion.so"
      }
    ]
  }
];

/** Tools-I've-worked-with chip block. Each sub-group renders as a
 *  small uppercase label above a row of name chips, no per-item
 *  description. The block sits at the bottom of /uses to round out
 *  the page with proven breadth without claiming daily use. */
export type WorkedWithGroup = {
  id: string;
  label: string;
  labelVi: string;
  items: string[];
};

export const workedWithGroups: WorkedWithGroup[] = [
  {
    "id": "web-ui",
    "label": "Web & UI",
    "labelVi": "Web & UI",
    "items": [
      "Next.js",
      "React",
      "Tailwind CSS",
      "shadcn/ui",
      "magic ui",
      "Aceternity UI",
      "React Native"
    ]
  },
  {
    "id": "backend-data",
    "label": "Backend & data",
    "labelVi": "Backend & dữ liệu",
    "items": [
      "Node.js",
      "PostgreSQL",
      "MySQL",
      "InfluxDB"
    ]
  },
  {
    "id": "cloud-deploy",
    "label": "Cloud & deploy",
    "labelVi": "Cloud & triển khai",
    "items": [
      "AWS",
      "Azure",
      "Cloudflare",
      "Vercel",
      "Railway",
      "GitHub",
      "Terraform",
      "Amazon EKS",
      "Azure AKS",
      "Aurora Global Database",
      "GCP Cloud DNS"
    ]
  },
  {
    "id": "infra-ops",
    "label": "Infra & ops",
    "labelVi": "Infra & ops",
    "items": [
      "Docker",
      "VMware",
      "VirtualBox",
      "Nginx",
      "Apache",
      "Grafana",
      "Ubuntu",
      "Windows Server 2012",
      "Docker Compose",
      "Active Directory",
      "Rufus",
      "Chocolatey for Business (proof of concept)"
    ]
  },
  {
    "id": "iot-embedded",
    "label": "IoT & embedded",
    "labelVi": "IoT & embedded",
    "items": [
      "ESP32",
      "Raspberry Pi",
      "Arduino",
      "MQTT / Mosquitto",
      "Node-RED",
      "EdgeX Foundry",
      "Industrial RTUs",
      "HiveMQ Cloud",
      "DHT22",
      "Modbus TCP (simulators)",
      "Siemens S7 (simulators)"
    ]
  },
  {
    "id": "networking-security",
    "label": "Networking & security",
    "labelVi": "Mạng & bảo mật",
    "items": [
      "Cisco Packet Tracer",
      "Nmap",
      "Wireshark",
      "OpenVPN",
      "WireGuard"
    ]
  },
  {
    "id": "design-diagrams",
    "label": "Design & diagrams",
    "labelVi": "Thiết kế & sơ đồ",
    "items": [
      "Figma",
      "Excalidraw",
      "Eraser",
      "Figma Make",
      "Service Design Documents"
    ]
  },
  {
    "id": "business-operations",
    "label": "Business & operations",
    "labelVi": "Business & operations",
    "items": [
      "Shopify",
      "Meta Business Suite",
      "WordPress",
      "Asana",
      "User acceptance testing"
    ]
  }
];
