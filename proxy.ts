import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_LOCALE } from "./lib/i18n/types";

/**
 * Two jobs:
 *
 *   1. HTTP Basic Auth gate on /studio.
 *      Sanity Studio has its own login but we don't want randos
 *      stumbling onto the route. The Basic Auth layer keeps it
 *      private at the network level. Fail-closed when
 *      STUDIO_USERNAME / STUDIO_PASSWORD env vars are unset.
 *
 *   2. English routing for everything else. Existing /en paths stay
 *      valid, bare paths are rewritten to English, and retired /vi
 *      paths permanently redirect to the corresponding English URL.
 *
 * Next.js 16 file convention: this file MUST be named proxy.ts and
 * the exported function MUST be named proxy.
 * https://nextjs.org/docs/messages/middleware-to-proxy
 */

const REALM = "Studio (restricted)";

// Constant-time string compare implemented in pure JS so it works in
// the Edge runtime (proxy defaults to Edge; node:crypto's
// timingSafeEqual is not available there).
//
// The loop count is pinned to the EXPECTED string's length, not to the
// attacker-supplied input's length. Earlier versions iterated
// `input.length` on the length-mismatch path, which let an attacker
// probe the expected credential length by timing how long the
// comparison took for inputs of varying length. Iterating
// `expected.length` regardless of input length closes that side
// channel: a 1-char input and a 200-char input both take the same
// time as the legitimate credential check.
function safeStringEqual(input: string, expected: string): boolean {
  const len = expected.length;
  // Seed diff with the length mismatch so unequal lengths can never
  // return true even if the prefix happens to match.
  let diff = input.length ^ len;
  for (let i = 0; i < len; i++) {
    // For positions past the end of `input`, use a sentinel that's
    // outside the valid UTF-16 code unit range so it will never
    // coincidentally match a legitimate expected character.
    const ic = i < input.length ? input.charCodeAt(i) : 0xffff;
    diff |= ic ^ expected.charCodeAt(i);
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

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Studio path: Basic Auth gate.
  if (pathname === "/studio" || pathname.startsWith("/studio/")) {
    return studioGate(req);
  }

  // Preserve old links and query parameters when retiring Vietnamese.
  if (pathname === "/vi" || pathname.startsWith("/vi/")) {
    const url = req.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}${pathname.slice(3)}`;
    return NextResponse.redirect(url, 308);
  }

  if (pathname === `/${DEFAULT_LOCALE}` || pathname.startsWith(`/${DEFAULT_LOCALE}/`)) {
    return NextResponse.next();
  }

  // Ignore old locale cookies and browser language preferences.
  const url = req.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${DEFAULT_LOCALE}` : `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Run the proxy on every route EXCEPT static assets, Next.js
  // internals, and a few public files that should never be locale-
  // rewritten. The locale rewrite + Studio gate handle their own
  // path matching above.
  matcher: [
    // resume/ is excluded because the resume PDF lives at
    // public/resume/lwin-resume.pdf and the proxy would
    // otherwise rewrite /resume/lwin-resume.pdf into
    // /{locale}/resume/lwin-resume.pdf. Neither a route nor a
    // static file, so the download link 404'd. The /resume PAGE
    // (no trailing slash + path) still hits the proxy and gets
    // locale-rewritten as expected because the exclude pattern
    // requires the trailing slash.
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|opengraph-image|icon.svg|images/|files/|diagrams/|logos/|sounds/|resume/).*)",
  ],
};
