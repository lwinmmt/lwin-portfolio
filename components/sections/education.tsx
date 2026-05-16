import Image from "next/image";
import { education, type EducationEntry } from "@/lib/content";

export function Education() {
  return (
    <section className="mt-14">
      <div className="mb-5 flex items-end justify-between border-b border-[var(--color-border-default)] pb-3">
        <h2 className="font-sans text-[1.375rem] font-semibold tracking-[-0.02em] text-[var(--color-fg)]">
          Education
        </h2>
      </div>
      <ul className="flex flex-col divide-y divide-[var(--color-border-soft)]">
        {education.map((entry) => (
          <EducationRow key={entry.id} {...entry} />
        ))}
      </ul>
    </section>
  );
}

function EducationRow({
  school,
  schoolLink,
  degree,
  dates,
  initial,
  logoSrc,
}: EducationEntry) {
  const schoolEl = schoolLink ? (
    <a
      href={schoolLink}
      target="_blank"
      rel="noopener noreferrer"
      className="font-sans text-[14px] font-semibold leading-tight text-[var(--color-fg)] transition-colors hover:text-[var(--color-ruby-deep)]"
    >
      {school}
    </a>
  ) : (
    <span className="font-sans text-[14px] font-semibold leading-tight text-[var(--color-fg)]">
      {school}
    </span>
  );

  return (
    <li className="flex items-start gap-3 py-3.5">
      {logoSrc ? (
        <div className="mt-0.5 flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--color-border-default)] bg-white">
          <Image
            src={logoSrc}
            alt={`${school} logo`}
            width={44}
            height={44}
            className="h-9 w-9 object-contain"
          />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="mt-0.5 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-[var(--color-border-default)] bg-[var(--color-bg-warm)] font-mono text-[12px] font-semibold tracking-[0.04em] text-[var(--color-fg)]"
        >
          {initial}
        </div>
      )}
      <div className="min-w-0 flex-1">
        {schoolEl}
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
