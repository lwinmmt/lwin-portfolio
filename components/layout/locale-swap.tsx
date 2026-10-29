"use client";

import { useLocale } from "@/lib/i18n/client";

// Page-entry fade wrapper. The persistent navigation stays outside
// this wrapper while the main content runs its existing animation.

export function LocaleSwap({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  return (
    <div key={locale} className="locale-fade-in">
      {children}
    </div>
  );
}
