import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * HTTP Basic Auth gate on /studio.
 *
 * Sanity Studio has its own login (sanity.io OAuth), but anyone could still
 * land on the route, see the login UI, and try to enumerate or social-engineer
 * access. The Basic Auth layer keeps the route private at the network level.
 *
 * Gate is ALWAYS ON. Visitors hitting /studio see the browser's basic-auth
 * prompt by default. They cannot get past it unless both env vars are set
 * AND they enter the matching credentials. With env vars unset (typical for
 * a public deploy), no value the visitor types can match, so the prompt
 * keeps reappearing. That is the intended "restricted" state.
 *
 * To actually unlock the route, set in .env.local (or Vercel project env):
 *   STUDIO_USERNAME="your-username"
 *   STUDIO_PASSWORD="a-long-random-password"
 *
 * Next.js 16 file convention: this MUST be named proxy.ts and the
 * exported function MUST be named proxy. The previous middleware.ts
 * convention is deprecated.
 * https://nextjs.org/docs/messages/middleware-to-proxy
 */

const REALM = "Studio (restricted)";

// Constant-time string compare implemented in pure JS so it works in the
// Edge runtime (proxy defaults to Edge; node:crypto's timingSafeEqual is
// not available there). The XOR accumulator means the loop touches every
// byte regardless of where a mismatch occurs.
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

export function proxy(req: NextRequest) {
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

  // Always challenge. The body text is what some browsers (and curl) show
  // after the user cancels the auth prompt, so keep it informative.
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

export const config = {
  // Apply only to the studio routes. Everything else stays untouched.
  matcher: ["/studio", "/studio/:path*"],
};
