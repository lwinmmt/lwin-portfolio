"use client";

import { useEffect } from "react";
import { profile } from "@/lib/content";

/**
 * Easter-egg console branding. Anyone who opens devtools sees a short
 * branded message with contact info. Fires once on mount.
 */
export function ConsoleBranding() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ((window as unknown as { __lwinmmt_console?: boolean }).__lwinmmt_console) {
      return;
    }
    (window as unknown as { __lwinmmt_console?: boolean }).__lwinmmt_console = true;

    const title = "color: #B73A2C; font-size: 24px; font-weight: 700; font-family: ui-sans-serif, system-ui";
    const role = "color: #57534E; font-family: ui-monospace, monospace; font-size: 12px; letter-spacing: 1px";
    const email = "color: #0A0A0A; font-family: ui-monospace, monospace; font-size: 13px";
    const cta = "color: #962F25; font-family: ui-monospace, monospace; font-size: 12px";

    // eslint-disable-next-line no-console
    console.log(
      `%cLwin MMT.\n%c${profile.currentRole.toUpperCase()} AT ${profile.currentOrg.toUpperCase()}\n%c${profile.email}`,
      title,
      role,
      email,
    );
    // eslint-disable-next-line no-console
    console.log(
      `%cReading my source? Reach out. ${profile.email}`,
      cta,
    );
  }, []);

  return null;
}
