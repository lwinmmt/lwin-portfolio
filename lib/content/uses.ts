// Daily tools, gear, software. Surfaced on /uses to signal AI-native fluency.

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
    id: "editor",
    label: "Editor & Terminal",
    labelVi: "Editor & Terminal",
    items: [
      {
        name: "Sublime Text",
        detail: "Primary editor. Fast, minimal, dependable.",
        detailVi: "Editor chính. Nhanh, tối giản, đáng tin.",
        link: "https://www.sublimetext.com",
      },
      {
        name: "VS Code",
        detail: "Secondary editor when LSP and extensions matter.",
        detailVi: "Editor phụ khi cần LSP và extension.",
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
    id: "stack",
    label: "Stack I Reach For",
    labelVi: "Stack tôi hay dùng",
    items: [
      {
        name: "Next.js",
        detail: "App Router, server components.",
        detailVi: "App Router, server components.",
      },
      { name: "TypeScript", detail: "Strict mode.", detailVi: "Chế độ strict." },
      {
        name: "Tailwind CSS",
        detail: "Utility-first.",
        detailVi: "Phương pháp utility-first.",
      },
      {
        name: "shadcn/ui",
        detail: "Component primitives.",
        detailVi: "Bộ component primitive.",
      },
      {
        name: "PostgreSQL",
        detail: "Via Supabase or RDS.",
        detailVi: "Qua Supabase hoặc RDS.",
      },
      {
        name: "Python",
        detail: "FastAPI for services, scripting.",
        detailVi: "FastAPI cho service, scripting.",
      },
    ],
  },
  {
    id: "iot-stack",
    label: "IoT & Cloud Stack",
    labelVi: "Stack IoT & Cloud",
    items: [
      {
        name: "AWS",
        detail: "EC2, S3, ASG, IoT Core.",
        detailVi: "EC2, S3, ASG, IoT Core.",
      },
      {
        name: "Azure",
        detail: "Fundamentals certified, used for ESMOS DR.",
        detailVi: "Có chứng chỉ Fundamentals, dùng cho ESMOS DR.",
      },
      {
        name: "MQTT",
        detail: "Mosquitto broker, fault-tolerant.",
        detailVi: "Broker Mosquitto, chịu lỗi tốt.",
      },
      {
        name: "Node-RED",
        detail: "Visual flow for edge logic.",
        detailVi: "Flow trực quan cho logic ở edge.",
      },
      {
        name: "ESP32 + Raspberry Pi",
        detail: "Edge hardware.",
        detailVi: "Phần cứng edge.",
      },
      {
        name: "EdgeX Foundry",
        detail: "Learning at VNTT, production-scale.",
        detailVi: "Đang học tại VNTT, quy mô production.",
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
        name: "Figma",
        detail: "When a UI needs sketching.",
        detailVi: "Khi cần phác thảo UI.",
        link: "https://figma.com",
      },
      { name: "Vercel", detail: "Hosting.", detailVi: "Hosting.", link: "https://vercel.com" },
      { name: "GitHub", detail: "Code.", detailVi: "Code.", link: "https://github.com" },
    ],
  },
];
