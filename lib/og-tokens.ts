// Shared color tokens for OG image generation. Kept separate from the
// runtime CSS variables in globals.css because @vercel/og's ImageResponse
// runs at the edge and cannot read CSS custom properties.

export const OG_TOKENS = {
  bg: "#FAFAF7",
  bgWarm: "#F4F1EA",
  bgCard: "#FFFFFF",
  fg: "#0A0A0A",
  fgSoft: "#1F1F1F",
  fgMuted: "#57534E",
  fgFaint: "#A8A29E",
  ruby: "#B73A2C",
  rubyDeep: "#962F25",
  border: "#E7E5E4",
} as const;

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png" as const;
