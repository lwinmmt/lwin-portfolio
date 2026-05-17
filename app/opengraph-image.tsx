import { ImageResponse } from "next/og";
import { OG_TOKENS, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-tokens";

export const alt = "Lwin MMT. AI and IIoT Engineer at VNTT.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const { bg: BG, bgWarm: BG_WARM, fg: FG, fgMuted: FG_MUTED, fgFaint: FG_FAINT, ruby: RUBY, border: BORDER } = OG_TOKENS;

export default async function OpengraphImage() {
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
          backgroundImage: `radial-gradient(ellipse 60% 50% at 100% 0%, ${BG_WARM}, transparent 70%), radial-gradient(ellipse 50% 60% at 0% 100%, ${BG_WARM}, transparent 70%)`,
          color: FG,
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span
            style={{
              fontSize: 18,
              fontFamily: "ui-monospace, monospace",
              letterSpacing: 4,
              textTransform: "uppercase",
              color: FG_MUTED,
            }}
          >
            lwinmmt.com
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 22,
              fontFamily: "ui-monospace, monospace",
              letterSpacing: 4,
              textTransform: "uppercase",
              color: FG_MUTED,
            }}
          >
            Hi, I&rsquo;m
          </div>
          <div
            style={{
              fontSize: 168,
              fontWeight: 700,
              letterSpacing: -6,
              lineHeight: 0.96,
              display: "flex",
              alignItems: "baseline",
              color: FG,
            }}
          >
            Lwin MMT
            <span style={{ color: RUBY, marginLeft: 8 }}>.</span>
          </div>
          <div
            style={{
              // @vercel/og requires explicit display on any container
              // with multiple children. Without it, the build-time
              // prerender fails. flex with wrap lets the inline span
              // flow naturally next to the leading text.
              display: "flex",
              flexWrap: "wrap",
              fontSize: 36,
              fontWeight: 500,
              lineHeight: 1.35,
              maxWidth: 940,
              color: FG_MUTED,
              gap: "0 0.4ch",
            }}
          >
            <span>Information Systems student at SMU.</span>
            <span style={{ color: RUBY, fontWeight: 600 }}>
              I build IoT systems and ship products end-to-end.
            </span>
          </div>
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
            <span>AI & IIoT Engineer at VNTT, Ho Chi Minh City</span>
          </div>
          <div>GitHub, LinkedIn, Email</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
