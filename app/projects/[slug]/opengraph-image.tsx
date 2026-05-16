import { ImageResponse } from "next/og";
import { projects } from "@/lib/content";
import { OG_TOKENS, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-tokens";

export const alt = "Project case study, lwinmmt.com";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const { bg: BG, bgWarm: BG_WARM, fg: FG, fgMuted: FG_MUTED, fgFaint: FG_FAINT, ruby: RUBY, border: BORDER } = OG_TOKENS;

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return [
    {
      id: "default",
      alt: project ? `${project.title}, lwinmmt.com` : alt,
      contentType,
      size,
    },
  ];
}

export default async function ProjectOpengraphImage({
  params,
}: {
  params: { slug: string };
}) {
  const project = projects.find((p) => p.slug === params.slug);
  const title = project?.title ?? "Project";
  const category = project?.category ?? "Case study";
  const description = project?.description ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: BG,
          backgroundImage: `radial-gradient(ellipse 60% 50% at 100% 0%, ${BG_WARM}, transparent 70%)`,
          color: FG,
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 20,
            fontFamily: "ui-monospace, monospace",
            letterSpacing: 4,
            textTransform: "uppercase",
            color: FG_MUTED,
          }}
        >
          <span>lwinmmt.com / projects</span>
          <span style={{ color: RUBY }}>{category}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.02,
              color: FG,
              maxWidth: 1040,
            }}
          >
            {title}
            <span style={{ color: RUBY }}>.</span>
          </div>
          {description && (
            <div
              style={{
                fontSize: 28,
                fontWeight: 400,
                lineHeight: 1.4,
                maxWidth: 1040,
                color: FG_MUTED,
              }}
            >
              {description.length > 220
                ? description.slice(0, 217) + "..."
                : description}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 24,
            borderTop: `1px solid ${BORDER}`,
            fontSize: 22,
            fontFamily: "ui-monospace, monospace",
            letterSpacing: 1.5,
            color: FG_FAINT,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                background: RUBY,
              }}
            />
            <span>Lwin MMT</span>
          </div>
          <div>{project?.dates ?? ""}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
