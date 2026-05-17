"use client";

import { createContext, useCallback, useContext, type ReactNode } from "react";
import { messages, type MessageKey } from "./messages";
import { DEFAULT_LOCALE, type Locale } from "./types";

// Client-side locale context. The layout reads the locale server-side
// (via getLocale) and feeds it down through this provider so any
// client component can call useLocale() / useT() without prop drilling.

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

// useCallback so the translator identity is stable for the lifetime
// of the locale. Without this, consumers that put `t` in a useMemo
// dependency array (e.g. CmdPalette.buildItems) would rebuild on
// every parent render even when the locale itself never changed.
export function useT() {
  const locale = useLocale();
  return useCallback(
    (key: MessageKey): string =>
      messages[locale][key] ?? messages[DEFAULT_LOCALE][key] ?? key,
    [locale],
  );
}
