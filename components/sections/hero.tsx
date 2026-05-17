import Link from "next/link";
import { HeroGlobe } from "@/components/hero/globe";
import { EmailButton } from "@/components/ui/email-button";
import { Magnetic } from "@/components/ui/magnetic";
import { profile } from "@/lib/content";

// Asymmetric 2-col hero on lg+: text block (greeting, name, intro,
// 'Right now' chip, CTAs) on the left, globe vertically centered in
// a narrower right column. On smaller viewports the grid collapses to
// a single column and the globe falls between the intro paragraph and
// the 'Right now' chip in natural document order.

export function Hero() {
  return (
    <section className="grid gap-8 lg:grid-cols-[3fr_2fr] lg:gap-10">
      <div
        className="animate-fade-up lg:col-start-1 lg:row-start-1"
        style={{ animationDelay: "0ms" }}
      >
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-fg-muted)]">
          {profile.greeting}
        </div>
        <h1 className="mt-3 flex items-baseline gap-[0.05em] font-sans text-[clamp(2.75rem,6vw,4.5rem)] font-bold leading-[0.96] tracking-[-0.04em] text-[var(--color-fg)]">
          {profile.name}
          <span className="text-[var(--color-ruby)]">.</span>
        </h1>
      </div>

      <p
        className="max-w-[640px] text-[1.0625rem] leading-[1.65] text-[var(--color-fg-soft)] animate-fade-up lg:col-start-1 lg:row-start-2"
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

      {/* Globe: stacked between intro and 'Right now' on mobile (natural
          document order in a single-column grid), right column spanning
          the full text-block height and vertically centered on lg+. */}
      <div
        className="animate-fade-up lg:col-start-2 lg:row-start-1 lg:row-span-4 lg:self-center"
        style={{ animationDelay: "300ms" }}
      >
        <HeroGlobe />
      </div>

      <div
        className="animate-fade-up lg:col-start-1 lg:row-start-3"
        style={{ animationDelay: "400ms" }}
      >
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

      <div
        className="flex flex-wrap gap-2 animate-fade-up lg:col-start-1 lg:row-start-4"
        style={{ animationDelay: "500ms" }}
      >
        <Magnetic>
          <Link
            href="/resume"
            className="inline-flex items-center rounded-full bg-[var(--color-fg)] px-[18px] py-[11px] font-sans text-sm font-medium text-[var(--color-bg)] transition-all duration-200 hover:bg-[var(--color-ruby)]"
          >
            Resume
          </Link>
        </Magnetic>
        <Magnetic>
          <EmailButton
            email={profile.email}
            className="inline-flex items-center rounded-full border border-[var(--color-border-default)] bg-[var(--color-surface-2)] px-[18px] py-[11px] font-sans text-sm font-medium text-[var(--color-fg-muted)] backdrop-blur transition-all duration-200 hover:border-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
          >
            Email
          </EmailButton>
        </Magnetic>
        <Magnetic>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-[var(--color-border-default)] bg-[var(--color-surface-2)] px-[18px] py-[11px] font-sans text-sm font-medium text-[var(--color-fg-muted)] backdrop-blur transition-all duration-200 hover:border-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
          >
            GitHub
          </a>
        </Magnetic>
        <Magnetic>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-[var(--color-border-default)] bg-[var(--color-surface-2)] px-[18px] py-[11px] font-sans text-sm font-medium text-[var(--color-fg-muted)] backdrop-blur transition-all duration-200 hover:border-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
          >
            LinkedIn
          </a>
        </Magnetic>
      </div>
    </section>
  );
}
