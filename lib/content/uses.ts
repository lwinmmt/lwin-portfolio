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

/** Featured groups — each renders with per-item descriptions and is
 *  laid out distinctly on the page (AI tools as a hero band,
 *  Languages as a chip strip with no descriptions, Editor +
 *  Everyday side-by-side at the bottom with Hardware merged into
 *  Everyday as a tagged prefix). */
export const usesGroups: UsesGroup[] = [
  {
    id: "ai-tools",
    label: "AI Tools, Daily",
    labelVi: "Công cụ AI dùng hằng ngày",
    description:
      "No fixed workflow. I reach for whichever model fits the task and validate the output. The skill is in knowing which to pick and how to frame the ask.",
    descriptionVi:
      "Không có workflow cố định. Tôi dùng model nào phù hợp với việc đó và kiểm chứng kết quả. Kỹ năng nằm ở chỗ biết chọn cái nào và biết đặt câu hỏi thế nào.",
    items: [
      {
        name: "Claude Code",
        detail: "Coding. CLI + IDE.",
        detailVi: "Lập trình. CLI + IDE.",
        link: "https://claude.com/claude-code",
      },
      {
        name: "ChatGPT",
        detail: "Quick search, drafting, and image generation.",
        detailVi: "Tìm kiếm nhanh, viết nháp, và tạo ảnh.",
        link: "https://chatgpt.com",
      },
      {
        name: "Gemini",
        detail: "Quick research, Google-integrated.",
        detailVi: "Nghiên cứu nhanh, tích hợp Google.",
        link: "https://gemini.google.com",
      },
      {
        name: "Kimi",
        detail: "Long-form essays and research.",
        detailVi: "Viết dài và nghiên cứu chuyên sâu.",
        link: "https://kimi.com",
      },
    ],
  },
  {
    id: "languages",
    label: "Languages",
    labelVi: "Ngôn ngữ",
    items: [
      // Chip-only — no detail. Names alone carry enough signal for
      // mainstream languages and HTML/CSS. Python first because it
      // is the most familiar / most-reached-for.
      { name: "Python" },
      { name: "TypeScript / JavaScript" },
      { name: "SQL" },
      { name: "HTML" },
      { name: "CSS" },
    ],
  },
  {
    id: "editor",
    label: "Editor & Terminal",
    labelVi: "Editor & Terminal",
    items: [
      {
        name: "Sublime Text",
        detail:
          "Scratchpad. Quick notes, paste-and-tidy, off-the-record drafts.",
        detailVi:
          "Sổ tay nháp. Ghi nhanh, dán-rồi-dọn, bản nháp tạm.",
        link: "https://www.sublimetext.com",
      },
      {
        name: "VS Code",
        detail: "Primary IDE. Where actual code gets written.",
        detailVi: "IDE chính. Nơi code thực sự được viết.",
        link: "https://code.visualstudio.com",
      },
      {
        name: "Ghostty",
        detail: "Terminal. GPU-accelerated, native.",
        detailVi: "Terminal. Tăng tốc GPU, native.",
        link: "https://ghostty.org",
      },
      {
        name: "Homebrew",
        detail: "macOS package manager.",
        detailVi: "Trình quản lý package cho macOS.",
        link: "https://brew.sh",
      },
    ],
  },
  {
    id: "hardware",
    label: "Hardware",
    labelVi: "Phần cứng",
    items: [
      {
        name: "MacBook Pro M2, 16 inch",
        detail: "Daily driver.",
        detailVi: "Máy chính dùng hằng ngày.",
      },
    ],
  },
  {
    id: "everyday",
    label: "Everyday Software",
    labelVi: "Phần mềm hằng ngày",
    items: [
      {
        name: "Raycast",
        detail:
          "Spotlight replacement. Launcher, snippets, clipboard history.",
        detailVi:
          "Thay thế Spotlight. Launcher, snippet, lịch sử clipboard.",
        link: "https://raycast.com",
      },
      {
        name: "Akiflow",
        detail: "Task management. All my todos and time-blocks live here.",
        detailVi:
          "Quản lý công việc. Tất cả todo và time-block của tôi nằm ở đây.",
        link: "https://akiflow.com",
      },
      {
        name: "Bitwarden",
        detail: "Password manager.",
        detailVi: "Trình quản lý mật khẩu.",
        link: "https://bitwarden.com",
      },
      {
        name: "Linear",
        detail: "When projects have a team.",
        detailVi: "Khi dự án có nhiều người trong team.",
        link: "https://linear.app",
      },
      {
        name: "Comet",
        detail: "Daily browser. Perplexity's AI-native build.",
        detailVi: "Trình duyệt chính. Bản AI-native của Perplexity.",
        link: "https://comet.perplexity.ai",
      },
      {
        name: "Notion",
        detail: "Notes, drafts, second brain.",
        detailVi: "Ghi chú, bản nháp, bộ não thứ hai.",
        link: "https://notion.so",
      },
    ],
  },
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
    id: "web-ui",
    label: "Web & UI",
    labelVi: "Web & UI",
    items: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "shadcn/ui",
      "magic ui",
      "Aceternity UI",
    ],
  },
  {
    id: "backend-data",
    label: "Backend & data",
    labelVi: "Backend & dữ liệu",
    items: ["Node.js", "PostgreSQL", "MySQL"],
  },
  {
    id: "cloud-deploy",
    label: "Cloud & deploy",
    labelVi: "Cloud & triển khai",
    items: ["AWS", "Azure", "Cloudflare", "Vercel", "Railway", "GitHub"],
  },
  {
    id: "infra-ops",
    label: "Infra & ops",
    labelVi: "Infra & ops",
    items: [
      "Docker",
      "VMware",
      "VirtualBox",
      "Nginx",
      "Apache",
      "Grafana",
      "Ubuntu",
      "Windows Server 2012",
    ],
  },
  {
    id: "iot-embedded",
    label: "IoT & embedded",
    labelVi: "IoT & embedded",
    items: [
      "ESP32",
      "Raspberry Pi",
      "Arduino",
      "MQTT / Mosquitto",
      "Node-RED",
      "EdgeX Foundry",
      "Industrial RTUs",
    ],
  },
  {
    id: "networking-security",
    label: "Networking & security",
    labelVi: "Mạng & bảo mật",
    items: [
      "Cisco Packet Tracer",
      "Nmap",
      "Wireshark",
      "OpenVPN",
      "WireGuard",
    ],
  },
  {
    id: "design-diagrams",
    label: "Design & diagrams",
    labelVi: "Thiết kế & sơ đồ",
    items: ["Figma", "Excalidraw", "Eraser"],
  },
];
