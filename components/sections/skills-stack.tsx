import Link from "next/link";
import {
  skillGroups,
  certifications,
  spokenLanguages,
} from "@/lib/content";
import { getLocale, getT } from "@/lib/i18n/server";
import { pickLocalized } from "@/lib/i18n/content";

export async function SkillsStack() {
  const t = await getT();
  const locale = await getLocale();
  return (
    <section className="mt-14">
      <div className="mb-5 flex items-end justify-between border-b border-[var(--color-border-default)] pb-3">
        <h2 className="font-sans text-[1.375rem] font-semibold tracking-[-0.02em] text-[var(--color-fg)]">
          {t("skills.title")}
        </h2>
        <Link
          href="/uses"
          className="text-[12.5px] font-medium text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-ruby)]"
        >
          {t("skills.viewAll")}
        </Link>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-faint)]">
            {t("skills.techStack")}
          </h3>
          <div className="space-y-3.5">
            {skillGroups.map((group) => (
              <div key={group.id}>
                <div className="mb-1.5 flex items-baseline gap-2">
                  <div className="font-sans text-[12.5px] font-semibold text-[var(--color-fg)]">
                    {pickLocalized(group.label, group.labelVi, locale)}
                  </div>
                  {group.description && (
                    <div className="font-sans text-[11px] text-[var(--color-fg-muted)]">
                      {pickLocalized(
                        group.description,
                        group.descriptionVi,
                        locale,
                      )}
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[var(--color-border-default)] bg-[var(--color-bg-warm)] px-2.5 py-1 font-mono text-[11px] text-[var(--color-fg-muted)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-faint)]">
            {t("skills.certifications")}
          </h3>
          <ul className="flex flex-col divide-y divide-[var(--color-border-soft)]">
            {certifications.map((cert) => (
              <li
                key={cert.id}
                className="flex flex-wrap items-start justify-between gap-3 py-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="font-sans text-[13.5px] font-semibold leading-tight text-[var(--color-fg)]">
                    {cert.name}
                  </div>
                  <div className="mt-1 font-mono text-[10.5px] tracking-[0.04em] text-[var(--color-fg-muted)]">
                    {cert.issuer} &middot; {t("skills.cert.issued")} {cert.issuedDate}
                    {cert.expiresDate && ` · ${t("skills.cert.expires")} ${cert.expiresDate}`}
                  </div>
                  {cert.credentialId && (
                    <div className="mt-0.5 font-mono text-[10px] tracking-[0.04em] text-[var(--color-fg-faint)]">
                      {t("skills.cert.id")} {cert.credentialId}
                    </div>
                  )}
                </div>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[var(--color-border-default)] bg-[var(--color-bg-card)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-fg-muted)] transition-all hover:border-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
                  >
                    {t("skills.cert.verify")}
                    <svg
                      width="9"
                      height="9"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17 17 7M7 7h10v10" />
                    </svg>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-faint)]">
            {t("skills.languages")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {spokenLanguages.map((lang) => (
              <div
                key={lang.name}
                className="inline-flex items-center rounded-full border border-[var(--color-border-default)] bg-[var(--color-bg-warm)] px-3 py-1.5"
              >
                <span className="font-sans text-[13px] font-medium text-[var(--color-fg)]">
                  {lang.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
