// Blog drafts. Surfaces on /blog as the "in progress" pipeline until real
// posts ship. Move to MDX or Sanity once content volume justifies.

export type BlogDraft = {
  title: string;
  titleVi?: string;
  excerpt: string;
  excerptVi?: string;
  tag: string;
  tagVi?: string;
  /** Quarter / month estimate. Kept locale-neutral ("Q3 2026"). */
  estimatedDate: string;
};

export const blogDrafts: BlogDraft[] = [
  {
    title: "Multi-cloud APAC architecture, post-mortem",
    titleVi: "Hậu kỳ kiến trúc đa cloud APAC",
    excerpt:
      "Notes on the ESMOS coursework project: regional choices, the failover gates I had to make, and what production scale this kind of design would look like.",
    excerptVi:
      "Ghi chú về dự án ESMOS: lựa chọn vùng, các cổng failover đã quyết, và quy mô production của kiểu thiết kế này sẽ trông ra sao.",
    tag: "Engineering",
    tagVi: "Kỹ thuật",
    estimatedDate: "Q3 2026",
  },
  {
    title: "Running an IoT pipeline at NEA scale",
    titleVi: "Vận hành pipeline IoT ở quy mô NEA",
    excerpt:
      "What I learned at W2 building wastewater monitoring across 360 sites. Tastek RTUs to Mosquitto to Azure to Twilio, plus the bits the academic prototype never had to deal with.",
    excerptVi:
      "Những gì tôi học được tại W2 khi xây hệ giám sát nước thải tại 360 điểm. Từ RTU Tastek qua Mosquitto, Azure, đến Twilio, cộng cả những phần một prototype học thuật không bao giờ phải lo.",
    tag: "IoT",
    tagVi: "IoT",
    estimatedDate: "Q3 2026",
  },
  {
    title: "Directing AI agents end-to-end",
    titleVi: "Điều phối AI agent từ đầu đến cuối",
    excerpt:
      "How I work with Claude Code, Gemini, and Kimi daily without losing taste. The framing, validation, and integration habits that matter.",
    excerptVi:
      "Cách tôi dùng Claude Code, Gemini và Kimi hằng ngày mà vẫn giữ được gu. Những thói quen đặt câu hỏi, kiểm chứng và tích hợp thực sự quan trọng.",
    tag: "AI Tools",
    tagVi: "Công cụ AI",
    estimatedDate: "Q4 2026",
  },
];
