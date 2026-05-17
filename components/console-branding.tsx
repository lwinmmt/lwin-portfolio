"use client";

import { useEffect } from "react";
import { profile } from "@/lib/content";

// Module-level constants so the string builds + style strings do not
// re-allocate on every mount. Static for the lifetime of the bundle.
const ROLE_UPPER = profile.currentRole.toUpperCase();
const ORG_UPPER = profile.currentOrg.toUpperCase();

const STYLE_TITLE =
  "color: #B73A2C; font-size: 24px; font-weight: 700; font-family: ui-sans-serif, system-ui";
const STYLE_ROLE =
  "color: #57534E; font-family: ui-monospace, monospace; font-size: 12px; letter-spacing: 1px";
const STYLE_EMAIL =
  "color: #0A0A0A; font-family: ui-monospace, monospace; font-size: 13px";
const STYLE_CTA =
  "color: #962F25; font-family: ui-monospace, monospace; font-size: 12px";

const TITLE_LINE = `%cLwin MMT.\n%c${ROLE_UPPER} AT ${ORG_UPPER}\n%c${profile.email}`;
const CTA_LINE = `%cReading my source? Reach out. ${profile.email}`;

/**
 * Easter-egg console branding. Anyone who opens devtools sees a short
 * branded message with contact info. Fires once on mount.
 */
export function ConsoleBranding() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as unknown as { __lwinmmt_console?: boolean };
    if (w.__lwinmmt_console) return;
    w.__lwinmmt_console = true;

     
    console.log(TITLE_LINE, STYLE_TITLE, STYLE_ROLE, STYLE_EMAIL);
     
    console.log(CTA_LINE, STYLE_CTA);
  }, []);

  return null;
}
