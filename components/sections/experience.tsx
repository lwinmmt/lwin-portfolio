import Link from "next/link";
import {
  experience,
  EMPLOYMENT_TYPE_VI,
  type ExperienceRole,
} from "@/lib/content";
import { EntityLogo } from "@/components/ui/entity-logo";
import { EntityNameLink } from "@/components/ui/entity-name-link";
import { getLocale, getT } from "@/lib/i18n/server";
import { pickLocalized } from "@/lib/i18n/content";
import { formatDates } from "@/lib/i18n/dates";
import type { Locale } from "@/lib/i18n/types";

export async function Experience() {
  const t = await getT();
  const locale = await getLocale();
  return (
    <section className="mt-14">
      <div className="mb-5 flex items-end justify-between border-b border-[var(--color-border-default)] pb-3">
        <h2 className="font-sans text-[1.375rem] font-semibold tracking-[-0.02em] text-[var(--color-fg)]">
          {t("experience.title")}
        </h2>
        <Link
          href="/resume"
          className="text-[12.5px] font-medium text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-ruby)]"
        >
          {t("experience.viewAll")}
        </Link>
      </div>
      <ul className="flex flex-col divide-y divide-[var(--color-border-soft)]">
        {experience.map((row) => (
          <ExperienceRow key={row.id} role={row} locale={locale} />
        ))}
      </ul>
    </section>
  );
}

function ExperienceRow({
  role: r,
  locale,
}: {
  role: ExperienceRole;
  locale: Locale;
}) {
  const { company, companyLink, dates, initial, logoSrc, type } = r;
  const role = pickLocalized(r.role, r.roleVi, locale);
  const typeLabel =
    type === undefined
      ? undefined
      : locale === "vi"
        ? EMPLOYMENT_TYPE_VI[type]
        : type;
  return (
    <li className="flex items-center gap-3 py-3.5">
      <EntityLogo logoSrc={logoSrc} initial={initial} name={company} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <EntityNameLink name={company} href={companyLink} />
          {typeLabel && (
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-fg-faint)]">
              {typeLabel}
            </span>
          )}
        </div>
        <div className="mt-0.5 font-sans text-[12.5px] leading-tight text-[var(--color-fg-muted)]">
          {role}
        </div>
      </div>
      <div className="whitespace-nowrap font-mono text-[11px] tracking-[0.04em] text-[var(--color-fg-faint)]">
        {formatDates(dates, locale)}
      </div>
    </li>
  );
}
