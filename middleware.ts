import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { timingSafeEqual } from "node:crypto";

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
 * The file MUST be named middleware.ts at the project root: Next.js only
 * reads middleware from that exact path, so any other name silently does
 * nothing.
 */

const REALM = "Studio (restricted)";

// Compare two strings without leaking length or content via response timing.
// Node's timingSafeEqual requires equal-length buffers, so pad the shorter
// one and force a mismatch when lengths differ.
function safeStringEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a, "utf8");
  const bBuf = Buffer.from(b, "utf8");
  if (aBuf.length !== bBuf.length) {
    // Burn the same amount of time on the mismatch path so an attacker
    // cannot distinguish a length mismatch from a content mismatch.
    const padded = Buffer.alloc(aBuf.length);
    bBuf.copy(padded);
    timingSafeEqual(aBuf, padded);
    return false;
  }
  return timingSafeEqual(aBuf, bBuf);
}

export default function middleware(req: NextRequest) {
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
