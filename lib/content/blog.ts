// Blog drafts. Surfaces on /blog as the "in progress" pipeline until real
// posts ship. Move to MDX or Sanity once content volume justifies.

export type BlogDraft = {
  title: string;
  excerpt: string;
  tag: string;
  estimatedDate: string;
};

export const blogDrafts: BlogDraft[] = [
  {
    title: "Multi-cloud APAC architecture, post-mortem",
    excerpt:
      "Notes on the ESMOS coursework project: regional choices, the failover gates I had to make, and what production scale this kind of design would look like.",
    tag: "Engineering",
    estimatedDate: "Q3 2026",
  },
  {
    title: "Running an IoT pipeline at NEA scale",
    excerpt:
      "What I learned at W2 building wastewater monitoring across 360 sites. Tastek RTUs to Mosquitto to Azure to Twilio, plus the bits the academic prototype never had to deal with.",
    tag: "IoT",
    estimatedDate: "Q3 2026",
  },
  {
    title: "Directing AI agents end-to-end",
    excerpt:
      "How I work with Claude Code, Gemini, and Kimi daily without losing taste. The framing, validation, and integration habits that matter.",
    tag: "AI Tools",
    estimatedDate: "Q4 2026",
  },
];
