import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { LocaleProvider } from "@/lib/i18n/client";
import { setLocaleForRequest } from "@/lib/i18n/server";
import { messages } from "@/lib/i18n/messages";
import { LocaleHtmlAttr } from "@/components/layout/locale-html-attr";
import { LOCALES, type Locale } from "@/lib/i18n/types";

// generateStaticParams returns one entry per supported locale, so
// public pages are prerendered in English. The route segment remains
// to preserve existing /en links; proxy.ts redirects retired /vi links.
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

const VALID_LOCALES: ReadonlySet<string> = new Set(LOCALES);

// Shared defaults. Each page supplies its own canonical and social URL.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!VALID_LOCALES.has(lang)) return {};
  const locale = lang as Locale;
  const m = messages[locale];
  const title = m["meta.title.default"];
  const description = m["meta.description"];
  const ogDescription = m["meta.og.description"];
  return {
    title: {
      default: title,
      template: m["meta.title.template"],
    },
    description,
    openGraph: {
      title,
      description: ogDescription,
      siteName: "Lwin MMT",
      locale: "en_SG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: ogDescription,
    },
  };
}

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
  return (
    <LocaleProvider locale={locale}>
      <LocaleHtmlAttr />
      {children}
    </LocaleProvider>
  );
}
