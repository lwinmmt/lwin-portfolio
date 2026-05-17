import Link from "next/link";
import { highlights, type Highlight } from "@/lib/content";
import { CardCover } from "@/components/ui/card-cover";
import { getLocale, getT } from "@/lib/i18n/server";
import { pickLocalized } from "@/lib/i18n/content";
import { formatDates } from "@/lib/i18n/dates";
import { localeHref } from "@/lib/i18n/href";
import type { Locale } from "@/lib/i18n/types";

// Hoist the slice so it's computed once at module load, not on every
// server render of /. The home page caps highlights at 4; the full
// list lives at /highlights.
const HOME_HIGHLIGHTS = highlights.slice(0, 4);

export function Highlights() {
  const t = getT();
  const locale = getLocale();
  return (
    <section className="mt-14">
      <div className="mb-5 flex items-end justify-between border-b border-[var(--color-border-default)] pb-3">
        <h2 className="font-sans text-[1.375rem] font-semibold tracking-[-0.02em] text-[var(--color-fg)]">
          {t("highlights.title")}
        </h2>
        <Link
          href={localeHref("/highlights", locale)}
          className="text-[12.5px] font-medium text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-ruby)]"
        >
          {t("highlights.viewAll")}
        </Link>
      </div>
      <div className="grid gap-3.5 sm:grid-cols-2">
        {HOME_HIGHLIGHTS.map((h) => (
          <HighlightCard key={h.title} h={h} locale={locale} />
        ))}
      </div>
    </section>
  );
}

function HighlightCard({ h, locale }: { h: Highlight; locale: Locale }) {
  const title = pickLocalized(h.title, h.titleVi, locale);
  const description = pickLocalized(h.description, h.descriptionVi, locale);
  const inner = (
    <div className="lift-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-warm)]">
      {h.imageSrc && (
        <CardCover
          src={h.imageSrc}
          alt={title}
          height="sm"
          background="card"
          objectPosition={h.coverFocus}
        />
      )}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-1.5 font-sans text-[15px] font-semibold leading-[1.35] text-[var(--color-fg)]">
          <span className="card-title-draw">{title}</span>
        </h3>
        <p className="mb-3 text-[12.5px] leading-[1.5] text-[var(--color-fg-muted)]">
          {description}
        </p>
        <div className="mt-auto font-mono text-[10.5px] tracking-[0.06em] text-[var(--color-fg-faint)]">
          {formatDates(h.date, locale)}
        </div>
      </div>
    </div>
  );

  if (!h.href) return inner;

  const isInternal = h.href.startsWith("/");
  if (isInternal) {
    return (
      <Link href={localeHref(h.href, locale)} className="block h-full">
        {inner}
      </Link>
    );
  }
  return (
    <a href={h.href} target="_blank" rel="noopener noreferrer" className="block h-full">
      {inner}
    </a>
  );
}
