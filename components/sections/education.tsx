import { education, type EducationEntry } from "@/lib/content";
import { EntityLogo } from "@/components/ui/entity-logo";
import { EntityNameLink } from "@/components/ui/entity-name-link";
import { getLocale, getT } from "@/lib/i18n/server";
import { pickLocalized } from "@/lib/i18n/content";
import type { Locale } from "@/lib/i18n/types";

export async function Education() {
  const t = await getT();
  const locale = await getLocale();
  return (
    <section className="mt-14">
      <div className="mb-5 flex items-end justify-between border-b border-[var(--color-border-default)] pb-3">
        <h2 className="font-sans text-[1.375rem] font-semibold tracking-[-0.02em] text-[var(--color-fg)]">
          {t("education.title")}
        </h2>
      </div>
      <ul className="flex flex-col divide-y divide-[var(--color-border-soft)]">
        {education.map((entry) => (
          <EducationRow key={entry.id} entry={entry} locale={locale} />
        ))}
      </ul>
    </section>
  );
}

function EducationRow({
  entry,
  locale,
}: {
  entry: EducationEntry;
  locale: Locale;
}) {
  const { school, schoolLink, dates, initial, logoSrc } = entry;
  const degree = pickLocalized(entry.degree, entry.degreeVi, locale);
  return (
    <li className="flex items-start gap-3 py-3.5">
      <EntityLogo
        logoSrc={logoSrc}
        initial={initial}
        name={school}
        className="mt-0.5"
      />
      <div className="min-w-0 flex-1">
        <EntityNameLink name={school} href={schoolLink} />
        <div className="mt-0.5 font-sans text-[12.5px] leading-snug text-[var(--color-fg-muted)]">
          {degree}
        </div>
      </div>
      <div className="whitespace-nowrap pt-0.5 font-mono text-[11px] tracking-[0.04em] text-[var(--color-fg-faint)]">
        {dates}
      </div>
    </li>
  );
}
