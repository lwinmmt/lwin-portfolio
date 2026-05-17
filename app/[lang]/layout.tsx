import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { LocaleProvider } from "@/lib/i18n/client";
import { setLocaleForRequest } from "@/lib/i18n/server";
import { LOCALES, type Locale } from "@/lib/i18n/types";

// generateStaticParams returns one entry per supported locale, so
// every page nested under this segment is prerendered into TWO
// static HTML pages at build time — one for each locale. Combined
// with proxy.ts rewriting bare paths like /about to /{cookie-locale}
// /about, visitors see clean URLs but Next.js serves cached static
// HTML from the CDN. Navigation transitions become CDN-fast.
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

const VALID_LOCALES: ReadonlySet<string> = new Set(LOCALES);

export default async function LocaleLayout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: ReactNode;
}) {
  const { lang } = await params;
  if (!VALID_LOCALES.has(lang)) notFound();
  const locale = lang as Locale;
  // Seed the request-scoped locale holder before any downstream
  // server component asks for it via getLocale() / getT().
  setLocaleForRequest(locale);
  return <LocaleProvider locale={locale}>{children}</LocaleProvider>;
}
