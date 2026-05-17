import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { EmailButton } from "@/components/ui/email-button";
import {
  profile,
  experience,
  education,
  certifications,
  skillGroups,
  spokenLanguages,
  awards,
  EMPLOYMENT_TYPE_VI,
} from "@/lib/content";
import { getLocale, getT } from "@/lib/i18n/server";
import { pickLocalized } from "@/lib/i18n/content";
import { renderRich } from "@/lib/i18n/rich";
import type { MessageKey } from "@/lib/i18n/messages";

export const metadata: Metadata = {
  title: "Resume",
  description: "Web-readable resume with PDF download.",
};

const RESUME_PDF = "/resume/lwinmmt-resume.pdf";

// Role id -> message key for the achievement highlight line. Strings
// live in lib/i18n/messages so they translate.
const ROLE_HIGHLIGHT_KEY: Record<string, MessageKey> = {
  vntt: "resume.highlight.vntt",
  nepseeds: "resume.highlight.nepseeds",
  osiris: "resume.highlight.osiris",
  w2: "resume.highlight.w2",
  "sp-iot": "resume.highlight.sp-iot",
};

// Role-to-case-study mapping. When a role has a corresponding project,
// the highlight line becomes a tappable link to the case study.
const ROLE_CASE_STUDY: Record<string, string> = {
  nepseeds: "nepseeds",
  osiris: "osiris-hydroponics",
  w2: "inno2-nea-wastewater",
  "sp-iot": "asv-5g-autonomous",
};

export default async function ResumePage() {
  const t = await getT();
  const locale = await getLocale();
  return (
    <DashboardShell>
      {/* Bento-style identity card */}
      <header className="rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-bg-card)] p-6 sm:p-7">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-5">
            <Image
              src={profile.photoSrc}
              alt={`${profile.name} portrait`}
              width={96}
              height={96}
              className="h-[88px] w-[88px] flex-shrink-0 rounded-2xl border border-[var(--color-border-default)] object-cover"
              priority
            />
            <div className="min-w-0">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-fg-muted)]">
                {t("resume.eyebrow")}
              </div>
              <h1 className="mt-2 font-sans text-[clamp(1.875rem,4vw,2.5rem)] font-bold leading-[1.04] tracking-[-0.035em] text-[var(--color-fg)]">
                {profile.name}<span className="text-[var(--color-ruby)]">.</span>
              </h1>
              <p className="mt-2 max-w-[520px] text-[14.5px] leading-snug text-[var(--color-fg-muted)]">
                {renderRich(t("resume.byline"))}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.04em] text-[var(--color-fg-muted)]">
                <EmailButton
                  email={profile.email}
                  className="hover:text-[var(--color-ruby)]"
                >
                  {profile.email}
                </EmailButton>
                <span className="text-[var(--color-fg-faint)]">·</span>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-ruby)]"
                >
                  github.com/lwinmmt
                </a>
                <span className="text-[var(--color-fg-faint)]">·</span>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-ruby)]"
                >
                  linkedin.com/in/lwinmmt
                </a>
              </div>
            </div>
          </div>
          <a
            href={RESUME_PDF}
            download
            className="group relative inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-[var(--color-ruby)] px-5 py-2.5 font-sans text-[13.5px] font-medium text-white shadow-[0_0_0_1px_var(--color-ruby-deep),0_6px_18px_color-mix(in_oklab,var(--color-ruby)_28%,transparent)] transition-all hover:-translate-y-px hover:bg-[var(--color-ruby-deep)]"
          >
            <span className="relative flex h-3.5 w-3.5 items-center justify-center">
              <span
                aria-hidden="true"
                className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-40"
              />
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="relative"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </span>
            {t("resume.cta.download")}
          </a>
        </div>

      </header>

      <Section
        title={t("resume.section.experience")}
        count={1}
        subcount={t("resume.experienceCount").replace("{n}", String(experience.length))}
      >
        {/* Year-axis ruler: each role row gets its end-year as a margin
            label, turning the timeline into a chronological ruler instead
            of a generic bullet list. */}
        <ul className="relative ml-12 flex flex-col border-l-2 border-[var(--color-border-default)] pl-7 sm:ml-16">
          {experience.map((r) => {
            // Extract the most recent year from the dates string, e.g.
            // "May 2026 to Present" -> "Now"; "Mar 2019 to Jul 2019" -> "2019".
            const endYear = /to Present|present/i.test(r.dates)
              ? t("resume.endYear.now")
              : (r.dates.match(/\b(20\d{2})\b/g) ?? []).pop() ?? "";
            const highlightKey = ROLE_HIGHLIGHT_KEY[r.id];
            const highlight = highlightKey ? t(highlightKey) : null;
            const role = pickLocalized(r.role, r.roleVi, locale);
            const typeLabel =
              r.type === undefined
                ? undefined
                : locale === "vi"
                  ? EMPLOYMENT_TYPE_VI[r.type]
                  : r.type;
            return (
              <li key={r.id} className="relative pb-6 last:pb-0">
                {/* Year label floating in the left margin */}
                <span
                  aria-hidden="true"
                  className="absolute -left-[5.25rem] top-1 font-mono text-[10px] font-semibold tracking-[0.12em] text-[var(--color-fg-faint)] sm:-left-[6.5rem]"
                >
                  {endYear}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute -left-[34px] top-1.5 h-3 w-3 rounded-full border-2 border-[var(--color-ruby)]/50 bg-[var(--color-bg)]"
                />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className="font-sans text-[14px] font-semibold text-[var(--color-fg)]">
                      {r.company}
                    </span>
                    {typeLabel && (
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-fg-faint)]">
                        {typeLabel}
                      </span>
                    )}
                  </div>
                  <div className="font-mono text-[11px] tracking-[0.04em] text-[var(--color-fg-faint)]">
                    {r.dates}
                  </div>
                </div>
                <div className="mt-0.5 font-sans text-[12.5px] text-[var(--color-fg-muted)]">
                  {role}
                </div>
                {highlight && (
                  <div className="mt-1 flex items-start gap-2 font-mono text-[11px] leading-[1.55] text-[var(--color-fg-soft)]">
                    <span aria-hidden="true" className="text-[var(--color-fg-faint)]">
                      &rarr;
                    </span>
                    {ROLE_CASE_STUDY[r.id] ? (
                      <Link
                        href={`/projects/${ROLE_CASE_STUDY[r.id]}`}
                        className="underline decoration-[var(--color-border-default)] decoration-1 underline-offset-[3px] transition-colors hover:text-[var(--color-fg)] hover:decoration-[var(--color-ruby-deep)]"
                      >
                        {highlight}
                      </Link>
                    ) : (
                      <span>{highlight}</span>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </Section>

      <Section title={t("resume.section.education")} count={2}>
        <ul className="flex flex-col divide-y divide-[var(--color-border-soft)]">
          {education.map((e) => (
            <li
              key={e.id}
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3"
            >
              <div className="min-w-0 flex-1">
                <div className="font-sans text-[14px] font-semibold text-[var(--color-fg)]">
                  {e.school}
                </div>
                <div className="mt-0.5 font-sans text-[12.5px] text-[var(--color-fg-muted)]">
                  {pickLocalized(e.degree, e.degreeVi, locale)}
                </div>
              </div>
              <div className="font-mono text-[11px] tracking-[0.04em] text-[var(--color-fg-faint)]">
                {e.dates}
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={t("resume.section.skills")} count={3}>
        <div className="space-y-4">
          {skillGroups.map((group) => (
            <div key={group.id}>
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-faint)]">
                {pickLocalized(group.label, group.labelVi, locale)}
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="tag-chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title={t("resume.section.certifications")} count={4}>
        <ul className="flex flex-col divide-y divide-[var(--color-border-soft)]">
          {certifications.map((c) => (
            <li
              key={c.id}
              className="flex flex-wrap items-start justify-between gap-3 py-3"
            >
              <div className="min-w-0 flex-1">
                <div className="font-sans text-[13.5px] font-semibold text-[var(--color-fg)]">
                  {c.name}
                </div>
                <div className="mt-0.5 font-mono text-[10.5px] tracking-[0.04em] text-[var(--color-fg-muted)]">
                  {c.issuer} · {t("resume.cert.issued")} {c.issuedDate}
                  {c.expiresDate && ` · ${t("resume.cert.expires")} ${c.expiresDate}`}
                </div>
                {c.credentialId && (
                  <div className="mt-0.5 font-mono text-[10px] tracking-[0.04em] text-[var(--color-fg-faint)]">
                    {t("resume.cert.id")} {c.credentialId}
                  </div>
                )}
              </div>
              {c.credentialUrl && (
                <a
                  href={c.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[var(--color-border-default)] bg-[var(--color-bg-card)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-fg-muted)] transition-all hover:border-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
                >
                  {t("resume.cert.verify")}
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M7 17 17 7M7 7h10v10" />
                  </svg>
                </a>
              )}
            </li>
          ))}
        </ul>
      </Section>

      <Section title={t("resume.section.awards")} count={5}>
        <ul className="flex flex-col divide-y divide-[var(--color-border-soft)]">
          {awards.map((a) => (
            <li
              key={a.id}
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3"
            >
              <div className="min-w-0 flex-1">
                <div className="font-sans text-[14px] font-semibold text-[var(--color-fg)]">
                  {pickLocalized(a.title, a.titleVi, locale)}
                </div>
                <div className="mt-0.5 font-sans text-[12.5px] text-[var(--color-fg-muted)]">
                  {a.issuer}
                </div>
                {a.description && (
                  <p className="mt-1 text-[12.5px] leading-snug text-[var(--color-fg-muted)]">
                    {pickLocalized(a.description, a.descriptionVi, locale)}
                  </p>
                )}
              </div>
              <div className="font-mono text-[11px] tracking-[0.04em] text-[var(--color-fg-faint)]">
                {a.date}
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={t("resume.section.languages")} count={6}>
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
      </Section>
    </DashboardShell>
  );
}

function Section({
  title,
  count,
  subcount,
  children,
}: {
  title: string;
  count?: number;
  subcount?: string;
  children: React.ReactNode;
}) {
  const num = count ? count.toString().padStart(2, "0") : undefined;
  return (
    <section className="mt-10">
      <div className="mb-4 flex items-end justify-between border-b border-[var(--color-border-default)] pb-2">
        <h2 className="flex items-baseline font-sans text-[1.125rem] font-semibold tracking-[-0.015em] text-[var(--color-fg)]">
          {num && <span className="section-counter">{num}</span>}
          {title}
        </h2>
        {subcount && (
          <span className="font-mono text-[11px] tracking-[0.04em] text-[var(--color-fg-faint)]">
            {subcount}
          </span>
        )}
      </div>
      {children}
    </section>
  );
}
