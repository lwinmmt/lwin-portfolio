import Image from "next/image";
import Link from "next/link";
import { experience, type ExperienceRole } from "@/lib/content";

export function Experience() {
  return (
    <section className="mt-14">
      <div className="mb-5 flex items-end justify-between border-b border-[var(--color-border-default)] pb-3">
        <h2 className="font-sans text-[1.375rem] font-semibold tracking-[-0.02em] text-[var(--color-fg)]">
          Experience
        </h2>
        <Link
          href="/resume"
          className="text-[12.5px] font-medium text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-ruby)]"
        >
          Full timeline
        </Link>
      </div>
      <ul className="flex flex-col divide-y divide-[var(--color-border-soft)]">
        {experience.map((role) => (
          <ExperienceRow key={role.id} {...role} />
        ))}
      </ul>
    </section>
  );
}

function ExperienceRow({
  company,
  companyLink,
  role,
  dates,
  initial,
  logoSrc,
  type,
}: ExperienceRole) {
  const companyEl = companyLink ? (
    <a
      href={companyLink}
      target="_blank"
      rel="noopener noreferrer"
      className="font-sans text-[14px] font-semibold leading-tight text-[var(--color-fg)] transition-colors hover:text-[var(--color-ruby-deep)]"
    >
      {company}
    </a>
  ) : (
    <span className="font-sans text-[14px] font-semibold leading-tight text-[var(--color-fg)]">
      {company}
    </span>
  );

  return (
    <li className="flex items-center gap-3 py-3.5">
      {logoSrc ? (
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--color-border-default)] bg-white">
          <Image
            src={logoSrc}
            alt={`${company} logo`}
            width={44}
            height={44}
            className="h-9 w-9 object-contain"
          />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-[var(--color-border-default)] bg-[var(--color-bg-warm)] font-mono text-[12px] font-semibold tracking-[0.04em] text-[var(--color-fg)]"
        >
          {initial}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          {companyEl}
          {type && (
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-fg-faint)]">
              {type}
            </span>
          )}
        </div>
        <div className="mt-0.5 font-sans text-[12.5px] leading-tight text-[var(--color-fg-muted)]">
          {role}
        </div>
      </div>
      <div className="whitespace-nowrap font-mono text-[11px] tracking-[0.04em] text-[var(--color-fg-faint)]">
        {dates}
      </div>
    </li>
  );
}
