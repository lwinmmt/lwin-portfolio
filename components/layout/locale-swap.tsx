"use client";

import { useLocale } from "@/lib/i18n/client";

// Re-mounts its children every time the locale changes so the CSS
// animation on the wrapper replays. Mirrors the feeling of a fresh
// page load: when the user clicks EN/VI, the new content fades and
// slides in instead of instantly flipping in place. The sidebar lives
// outside this wrapper, so the chrome stays still while only the page
// body animates.

export function LocaleSwap({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  return (
    <div key={locale} className="locale-fade-in">
      {children}
    </div>
  );
}
