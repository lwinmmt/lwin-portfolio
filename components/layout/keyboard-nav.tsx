"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { navItems, navResources, navContact } from "@/lib/content";

/**
 * Global keyboard shortcut handler. The sidebar nav rows render small
 * shortcut badges (1 through 9). This component listens for matching
 * digit keystrokes anywhere on the site and routes accordingly.
 *
 * Skips when an input or textarea is focused, when modifier keys are
 * held, and when the target href is a mailto: (those have their own
 * EmailButton click flow).
 */
export function KeyboardNav() {
  const router = useRouter();

  useEffect(() => {
    const all = [...navItems, ...navResources, ...navContact];
    const shortcutMap = new Map<string, string>();
    for (const item of all) {
      if (item.shortcut) shortcutMap.set(item.shortcut, item.href);
    }

    const handler = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      const dest = shortcutMap.get(event.key);
      if (!dest) return;
      if (dest.startsWith("mailto:") || dest.startsWith("http")) return;
      event.preventDefault();
      router.push(dest);
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router]);

  return null;
}
