import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Two jobs:
 *
 *   1. HTTP Basic Auth gate on /studio.
 *      Sanity Studio has its own login but we don't want randos
 *      stumbling onto the route. The Basic Auth layer keeps it
 *      private at the network level. Fail-closed when
 *      STUDIO_USERNAME / STUDIO_PASSWORD env vars are unset.
 *
 *   2. Locale rewrite for everything else.
 *      Pages live under app/[lang]/... and are prerendered into two
 *      static variants (en + vi) at build time. Visitors should see
 *      bare URLs (/about, /projects, etc.), so this proxy rewrites
 *      bare paths into /{cookie-locale}/{path} server-side. URL bar
 *      stays clean; the response is cached static HTML served from
 *      the Vercel CDN. That's what makes navigation feel local-fast
 *      instead of running a serverless function per click.
 *
 * Next.js 16 file convention: this file MUST be named proxy.ts and
 * the exported function MUST be named proxy.
 * https://nextjs.org/docs/messages/middleware-to-proxy
 */

const REALM = "Studio (restricted)";

const SUPPORTED_LOCALES = ["en", "vi"] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];
const DEFAULT_LOCALE: Locale = "en";
const LOCALE_COOKIE = "locale";

// Constant-time string compare implemented in pure JS so it works in
// the Edge runtime (proxy defaults to Edge; node:crypto's
// timingSafeEqual is not available there).
function safeStringEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    // Burn the same loop on the length-mismatch path so callers cannot
    // distinguish a length difference from a content difference purely
    // by response time. `dummy` is intentionally never read — the work
    // is the point, not the value.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let dummy = 0;
    for (let i = 0; i < a.length; i++) dummy |= a.charCodeAt(i) ^ 0xff;
    return false;
  }
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

function studioGate(req: NextRequest): NextResponse {
  const expectedUser = process.env.STUDIO_USERNAME;
  const expectedPass = process.env.STUDIO_PASSWORD;
  const configured = Boolean(expectedUser && expectedPass);

  if (configured) {
    const authHeader = req.headers.get("authorization");
    if (authHeader) {
      const [scheme, value] = authHeader.split(" ");
      if (scheme === "Basic" && value) {
        try {
          const decoded = atob(value);
          const sepIdx = decoded.indexOf(":");
          if (sepIdx !== -1) {
            const user = decoded.slice(0, sepIdx);
            const pass = decoded.slice(sepIdx + 1);
            if (
              safeStringEqual(user, expectedUser!) &&
              safeStringEqual(pass, expectedPass!)
            ) {
              return NextResponse.next();
            }
          }
        } catch {
          // Fall through to challenge
        }
      }
    }
  }

  const body = configured
    ? "Authentication required."
    : "This area is restricted. Studio access has not been provisioned on this deployment.";

  return new NextResponse(body, {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${REALM}", charset="UTF-8"`,
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

function resolveLocale(req: NextRequest): Locale {
  // Explicit cookie set by the LanguageSwitcher wins.
  const cookieLocale = req.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale === "en" || cookieLocale === "vi") return cookieLocale;
  // First-time visitors with `Accept-Language: vi*` get Vietnamese.
  const accept = (req.headers.get("accept-language") ?? "").toLowerCase();
  const primary = accept.split(",")[0]?.split(";")[0]?.trim() ?? "";
  if (primary.startsWith("vi")) return "vi";
  return DEFAULT_LOCALE;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Studio path: Basic Auth gate.
  if (pathname === "/studio" || pathname.startsWith("/studio/")) {
    return studioGate(req);
  }

  // Path already locale-prefixed: leave it. Direct hits on
  // /en/about and /vi/about still work (useful for SEO + sitemap +
  // testing both locales without flipping the cookie).
  for (const lang of SUPPORTED_LOCALES) {
    if (pathname === `/${lang}` || pathname.startsWith(`/${lang}/`)) {
      return NextResponse.next();
    }
  }

  // Bare path: rewrite to /{locale}/{path}.
  const locale = resolveLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Run the proxy on every route EXCEPT static assets, Next.js
  // internals, and a few public files that should never be locale-
  // rewritten. The locale rewrite + Studio gate handle their own
  // path matching above.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|opengraph-image|icon.svg|images/|files/|diagrams/|logos/|sounds/).*)",
  ],
};
