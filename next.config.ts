import type { NextConfig } from "next";
import path from "node:path";

// Baseline security headers shipped on every response. Conservative
// CSP that allows what the app actually needs and nothing more.
//
// Why 'unsafe-inline' on script-src: Next.js needs the inline
// bootstrap script for hydration. A nonce-based CSP is the next-level
// fix; not yet warranted on a static portfolio.
//
// 'unsafe-eval' is only in dev: Turbopack uses eval for HMR runtime.
// Production drops it so prod CSP is meaningfully stricter than dev.
//
// img-src + connect-src are tightened to the actual origins the app
// hits — Sanity CDN for next/image proxy + Sanity API for studio
// fetches. The previous `https:` wildcard let any HTTPS host through.
const isProd = process.env.NODE_ENV === "production";

const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  ...(isProd ? [] : ["'unsafe-eval'"]),
].join(" ");

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src ${scriptSrc}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https://cdn.sanity.io",
      "font-src 'self' data:",
      "connect-src 'self' https://*.sanity.io https://*.api.sanity.io wss://*.api.sanity.io",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
  // HSTS: pin browsers to HTTPS for 2 years. Vercel auto-injects this
  // on *.vercel.app but NOT on custom domains, so adding it here is
  // required for lwinmmt.com to get the same protection. `preload`
  // marks the domain as eligible for the browser HSTS preload list.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Tells Next to convert imports of these packages from "named
  // imports" of the barrel file into direct module-specific imports
  // so tree-shaking can drop unused code. framer-motion benefits the
  // most here — without this the `motion` proxy pulls the full
  // animation set even when we only use a few features.
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  images: {
    // AVIF first, WebP fallback. Next.js defaults to ["image/webp"]
    // when this is unset, leaving 30-50% of compression on the table
    // for all JPEG/PNG sources served through next/image (project
    // covers, highlight cards, logos). Browsers without AVIF support
    // fall back to WebP automatically via the Accept header.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
