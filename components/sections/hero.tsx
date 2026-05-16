import Link from "next/link";
import { LocationPanel } from "@/components/hero/location-panel";
import { EmailButton } from "@/components/ui/email-button";
import { profile } from "@/lib/content";

export function Hero() {
  return (
    <section className="flex flex-col gap-8">
      <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-fg-muted)]">
          {profile.greeting}
        </div>
        <h1 className="mt-3 flex items-baseline gap-[0.05em] font-sans text-[clamp(2.75rem,6vw,4.5rem)] font-bold leading-[0.96] tracking-[-0.04em] text-[var(--color-fg)]">
          {profile.name}
          <span className="text-[var(--color-ruby)]">.</span>
        </h1>
      </div>

      <p
        className="max-w-[640px] text-[1.0625rem] leading-[1.65] text-[var(--color-fg-soft)] animate-fade-up"
        style={{ animationDelay: "150ms" }}
      >
        I&rsquo;m an{" "}
        <strong className="font-semibold text-[var(--color-fg)]">
          {profile.studentRole}
        </strong>{" "}
        at{" "}
        <a
          href={profile.schoolLink}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[var(--color-fg)] transition-colors hover:text-[var(--color-ruby-deep)]"
        >
          {profile.school}
        </a>
        . I build{" "}
        <span className="font-semibold text-[var(--color-ruby-deep)]">
          IoT systems and ship products end-to-end
        </span>
        . Hardware, cloud, and the operating system in between. Engineer by training. Daily AI-tools operator.
      </p>

      <LocationPanel />

      <div className="animate-fade-up" style={{ animationDelay: "400ms" }}>
        <div className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-fg-muted)]">
          Right now
        </div>
        <a
          href={profile.currentOrgLink}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-chip group inline-flex items-center self-start rounded-full px-4 py-2.5 text-[14px] leading-tight text-[var(--color-fg-soft)] transition-all duration-200 hover:-translate-y-px hover:border-[var(--color-fg-muted)]"
          aria-label={`Currently ${profile.currentRole} at ${profile.currentOrgFullName}, opens in new tab`}
        >
          <span>
            <strong className="font-semibold text-[var(--color-fg)]">
              {profile.currentRole}
            </strong>{" "}
            at{" "}
            <strong className="font-semibold text-[var(--color-ruby-deep)] transition-colors group-hover:text-[var(--color-ruby)]">
              {profile.currentOrg}
            </strong>
          </span>
        </a>
        <div className="mt-2 pl-1 font-mono text-[10.5px] tracking-[0.04em] text-[var(--color-fg-faint)]">
          {profile.currentOrgFullName}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 animate-fade-up" style={{ animationDelay: "500ms" }}>
        <Link
          href="/resume"
          className="inline-flex items-center rounded-full bg-[var(--color-fg)] px-[18px] py-[11px] font-sans text-sm font-medium text-[var(--color-bg)] transition-all duration-200 hover:-translate-y-px hover:bg-[var(--color-ruby)]"
        >
          Resume
        </Link>
        <EmailButton
          email={profile.email}
          className="inline-flex items-center rounded-full border border-[var(--color-border-default)] bg-[var(--color-surface-2)] px-[18px] py-[11px] font-sans text-sm font-medium text-[var(--color-fg-muted)] backdrop-blur transition-all duration-200 hover:border-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
        >
          Email
        </EmailButton>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full border border-[var(--color-border-default)] bg-[var(--color-surface-2)] px-[18px] py-[11px] font-sans text-sm font-medium text-[var(--color-fg-muted)] backdrop-blur transition-all duration-200 hover:border-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
        >
          GitHub
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full border border-[var(--color-border-default)] bg-[var(--color-surface-2)] px-[18px] py-[11px] font-sans text-sm font-medium text-[var(--color-fg-muted)] backdrop-blur transition-all duration-200 hover:border-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
        >
          LinkedIn
        </a>
      </div>
    </section>
  );
}
