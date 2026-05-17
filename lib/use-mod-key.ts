"use client";

import { useEffect, useState } from "react";

// Returns the right modifier-key glyph for the current OS.
// macOS: ⌘ (command). Everything else (Windows, Linux): Ctrl.
// Defaults to ⌘ during SSR so the markup matches the most common
// path; the value flips on mount once we can read navigator.

export function useModKey(): { glyph: string; label: string } {
  const [isMac, setIsMac] = useState(true);
  useEffect(() => {
    if (typeof navigator === "undefined") return;
    // navigator.platform is deprecated but still the most reliable
    // synchronous signal. userAgentData.platform would be cleaner
    // but is gated behind a feature flag on Firefox.
    const platform = navigator.platform || navigator.userAgent;
    setIsMac(/Mac|iPhone|iPad|iPod/.test(platform));
  }, []);
  return isMac
    ? { glyph: "⌘", label: "Cmd" }
    : { glyph: "Ctrl", label: "Ctrl" };
}
