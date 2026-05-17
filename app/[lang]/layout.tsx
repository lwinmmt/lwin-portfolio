import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { LocaleProvider } from "@/lib/i18n/client";
import { setLocaleForRequest } from "@/lib/i18n/server";
import { messages } from "@/lib/i18n/messages";
import { LocaleHtmlAttr } from "@/components/layout/locale-html-attr";
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

// Per-locale metadata. Without this, every prerendered VI page would
// embed the English title + description in its <meta> tags, so
// WhatsApp / Twitter / Google previews for vi.lwinmmt.com URLs would
// be in English. Each locale gets its own copy from messages.ts.
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
      url: locale === "en" ? "https://lwinmmt.com" : "https://lwinmmt.com/vi",
      siteName: "Lwin MMT",
      locale: locale === "vi" ? "vi_VN" : "en_SG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: ogDescription,
    },
    alternates: {
      canonical: locale === "en" ? "/en" : "/vi",
      languages: {
        en: "/en",
        vi: "/vi",
        "x-default": "/en",
      },
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
