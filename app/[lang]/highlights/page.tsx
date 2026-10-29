import { pageMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/dashboard-shell";

import { highlights, type Highlight } from "@/lib/content";
import { getLocale, getT, seedLocaleFromParams } from "@/lib/i18n/server";
import { messages } from "@/lib/i18n/messages";
import { pickLocalized } from "@/lib/i18n/content";
import { formatDates } from "@/lib/i18n/dates";
import { localeHref } from "@/lib/i18n/href";
import type { Locale } from "@/lib/i18n/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const locale = await seedLocaleFromParams(params);
  const m = messages[locale];
  return pageMetadata(
    "/highlights",
    m["page.title.highlights"],
    m["page.description.highlights"],
  );
}

type BentoLayout = "side-by-side" | "stacked" | "text-only";

export default async function HighlightsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  await seedLocaleFromParams(params);
  const t = getT();
  const locale = getLocale();

  return (
    <DashboardShell>
      <header>
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-fg-muted)]">
          {t("highlightsPage.eyebrow")}
        </div>
        <h1 className="mt-3 font-sans text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[0.96] tracking-[-0.04em] text-[var(--color-fg)]">
          {t("highlightsPage.titleHead")}<span className="text-[var(--color-ruby)]">{t("highlightsPage.titleDot")}</span>
        </h1>
        <p className="mt-5 max-w-[640px] text-[1rem] leading-[1.6] text-[var(--color-fg-muted)]">
          {t("highlightsPage.intro")}
        </p>
      </header>

      <section className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
        {highlights.map((highlight, index) => (
          <BentoCard
            key={highlight.title}
            h={highlight}
            className={index === 0 || !highlight.imageSrc ? "md:col-span-2" : undefined}
            layout={!highlight.imageSrc ? "text-only" : index === 0 ? "side-by-side" : "stacked"}
            locale={locale}
          />
        ))}
      </section>
    </DashboardShell>
  );
}

function BentoCard({
  h,
  className,
  layout,
  locale,
}: {
  h: Highlight;
  className?: string;
  layout: BentoLayout;
  locale: Locale;
}) {
  const title = pickLocalized(h.title, h.titleVi, locale);
  const description = pickLocalized(h.description, h.descriptionVi, locale);

  // No explicit "Open" pill on bento cards: the whole card is the
  // link target and the lift-card hover already signals clickability.
  // The extra chip read as redundant noise.

  let inner: React.ReactNode;

  if (layout === "side-by-side") {
    inner = (
      <div className="lift-card group grid h-full grid-cols-1 overflow-hidden rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-warm)] sm:grid-cols-[1.2fr_1fr]">
        {h.imageSrc ? (
          <div className="relative min-h-[180px] w-full overflow-hidden bg-[var(--color-bg-warm)] [isolation:isolate] [mask-image:linear-gradient(#000,#000)] sm:min-h-[220px] lg:min-h-[280px]">
            <Image
              src={h.imageSrc}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 [backface-visibility:hidden] [will-change:transform] group-hover:scale-[1.03]"
              style={h.coverFocus ? { objectPosition: h.coverFocus } : undefined}
              priority
            />
          </div>
        ) : (
          <div className="relative h-32 w-full bg-[var(--color-bg-card)] sm:h-full" />
        )}
        <div className="flex flex-col p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-end">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-[var(--color-fg-faint)]">
              {formatDates(h.date, locale)}
            </span>
          </div>
          <h3 className="mb-2 font-sans text-[clamp(1.05rem,1.6vw,1.35rem)] font-semibold leading-[1.25] tracking-[-0.015em] text-[var(--color-fg)]">
            <span className="card-title-draw">{title}</span>
          </h3>
          <p className="text-[13px] leading-[1.55] text-[var(--color-fg-muted)]">
            {description}
          </p>
        </div>
      </div>
    );
  } else if (layout === "stacked") {
    inner = (
      <div className="lift-card group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-warm)]">
        {h.imageSrc && (
          <div className="relative min-h-[220px] w-full overflow-hidden bg-[var(--color-bg-warm)] [isolation:isolate] [mask-image:linear-gradient(#000,#000)]">
            <Image
              src={h.imageSrc}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, 25vw"
              className="object-cover transition-transform duration-500 [backface-visibility:hidden] [will-change:transform] group-hover:scale-[1.03]"
              style={h.coverFocus ? { objectPosition: h.coverFocus } : undefined}
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="mb-3 flex items-center justify-start">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-[var(--color-fg-faint)]">
              {formatDates(h.date, locale)}
            </span>
          </div>
          <h3 className="mb-2 font-sans text-[clamp(0.95rem,1.2vw,1.15rem)] font-semibold leading-[1.3] tracking-[-0.01em] text-[var(--color-fg)]">
            <span className="card-title-draw">{title}</span>
          </h3>
          <p className="text-[13px] leading-[1.6] text-[var(--color-fg-muted)]">
            {description}
          </p>
        </div>
      </div>
    );
  } else {
    // text-only
    inner = (
      <div className="lift-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-warm)] p-6 sm:p-7">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 100% 0%, color-mix(in oklab, var(--tag-press) 12%, transparent), transparent 60%)",
          }}
        />
        <div className="relative flex flex-1 flex-col">
          <div className="mb-4 flex items-center justify-end">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-[var(--color-fg-faint)]">
              {formatDates(h.date, locale)}
            </span>
          </div>
          <h3 className="mb-3 font-sans text-[clamp(1.125rem,1.8vw,1.5rem)] font-semibold leading-[1.25] tracking-[-0.015em] text-[var(--color-fg)]">
            <span className="card-title-draw">{title}</span>
          </h3>
          <p className="text-[13.5px] leading-[1.6] text-[var(--color-fg-muted)]">
            {description}
          </p>
        </div>
      </div>
    );
  }

  return wrapWithLink(h, inner, locale, className);
}

function wrapWithLink(
  h: Highlight,
  inner: React.ReactNode,
  locale: Locale,
  className?: string,
) {
  // h-full so the inner card's h-full can resolve against this wrapper
  // when the grid assigns a row height.
  if (!h.href) {
    return <div className={"h-full " + (className ?? "")}>{inner}</div>;
  }
  if (h.href.startsWith("/")) {
    return (
      <Link href={localeHref(h.href, locale)} className={"block h-full " + (className ?? "")}>
        {inner}
      </Link>
    );
  }
  return (
    <a
      href={h.href}
      target="_blank"
      rel="noopener noreferrer"
      className={"block h-full " + (className ?? "")}
    >
      {inner}
    </a>
  );
}
