import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/dashboard-shell";

import { highlights, type Highlight } from "@/lib/content";
import { getLocale, getT } from "@/lib/i18n/server";
import { pickLocalized } from "@/lib/i18n/content";
import { formatDates } from "@/lib/i18n/dates";
import type { Locale } from "@/lib/i18n/types";

export const metadata: Metadata = {
  title: "Highlights",
  description: "Talks, press, awards, and notable moments.",
};

type BentoLayout = "side-by-side" | "stacked" | "text-only";

export default async function HighlightsPage() {
  const t = getT();
  const locale = getLocale();
  // Highlights order in lib/content/highlights.ts is intentional and
  // maps directly to bento slots. Destructure by name so the layout is
  // explicit, not derived from .map().
  const [vntt, wcs, sbr, pmclub, cna] = highlights;

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

      {/* Bento grid. VNTT claims the full top row. The other four cards
          fill two rows below in mixed widths. 5-col grid on lg, 2-col on
          md, single column on mobile. */}
      <section className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5 lg:gap-6 lg:auto-rows-[minmax(320px,auto)]">
        {vntt && (
          <BentoCard
            h={vntt}
            className="md:col-span-2 lg:col-span-5"
            layout="side-by-side"
            locale={locale}
          />
        )}
        {wcs && (
          <BentoCard
            h={wcs}
            className="md:col-span-1 lg:col-span-3"
            layout="side-by-side"
            locale={locale}
          />
        )}
        {pmclub && (
          <BentoCard
            h={pmclub}
            className="md:col-span-1 lg:col-span-2"
            layout="stacked"
            locale={locale}
          />
        )}
        {cna && (
          <BentoCard
            h={cna}
            className="md:col-span-1 lg:col-span-2"
            layout="stacked"
            locale={locale}
          />
        )}
        {sbr && (
          <BentoCard
            h={sbr}
            className="md:col-span-2 lg:col-span-3"
            layout="side-by-side"
            locale={locale}
          />
        )}
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

  return wrapWithLink(h, inner, className);
}

function wrapWithLink(h: Highlight, inner: React.ReactNode, className?: string) {
  // h-full so the inner card's h-full can resolve against this wrapper
  // when the grid assigns a row height.
  if (!h.href) {
    return <div className={"h-full " + (className ?? "")}>{inner}</div>;
  }
  if (h.href.startsWith("/")) {
    return (
      <Link href={h.href} className={"block h-full " + (className ?? "")}>
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
