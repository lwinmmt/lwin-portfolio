import Link from "next/link";
import { HeroStage } from "@/components/hero/hero-stage";
import { EmailButton } from "@/components/ui/email-button";
import { profile } from "@/lib/content";
import { getLocale, getT } from "@/lib/i18n/server";
import { localeHref } from "@/lib/i18n/href";

// Asymmetric 2-col hero on lg+: text block (greeting, name, intro,
// 'Right now' chip, CTAs) on the left, hero stage (globe or terminal
// variant) vertically centered in a narrower right column. On smaller
// viewports the stage is omitted, leaving the introduction, status and
// contact actions followed by Experience.
//
// HeroStage is a client component that swaps between the two variants
// randomly per visit, with an in-place switcher for visitors.
//
// Server component (async). Reads the request locale via getT() and
// renders every translatable string from messages.ts. Profile.ts
// still provides the language-agnostic data (links, email, social
// handles, school proper noun, org short name).

export function Hero() {
  const t = getT();
  const locale = getLocale();
  const currentRole = t("hero.currentRole");
  const currentOrgFullName = t("hero.currentOrgFullName");
  const ariaCurrentRole = t("hero.cta.ariaCurrentRole")
    .replace("{role}", currentRole)
    .replace("{org}", currentOrgFullName);

  return (
    <section className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-10">
      <div
        className="animate-fade-up lg:col-start-1 lg:row-start-1"
        style={{ animationDelay: "0ms" }}
      >
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-fg-muted)]">
          {t("hero.greeting")}
        </div>
        <h1 className="mt-3 flex items-baseline gap-[0.05em] font-sans text-[clamp(2.75rem,6vw,4.5rem)] font-bold leading-[0.96] tracking-[-0.04em] text-[var(--color-fg)]">
          {profile.name}
          <span className="text-[var(--color-ruby)]">.</span>
        </h1>
      </div>

      <div
        className="max-w-[640px] space-y-4 text-[1.0625rem] leading-[1.65] text-[var(--color-fg-soft)] animate-fade-up lg:col-start-1 lg:row-start-2"
        style={{ animationDelay: "150ms" }}
      >
        <p>
          <strong className="font-semibold text-[var(--color-fg)]">
            {t("hero.studentRole")}
          </strong>{" "}
          {t("hero.intro.atSchool")}{" "}
          <a
            href={profile.schoolLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[var(--color-fg)] transition-colors hover:text-[var(--color-ruby-deep)]"
          >
            {profile.school}
          </a>
          {t("hero.intro.iBuild")}{" "}
          <span className="font-semibold text-[var(--color-ruby-deep)]">
            {t("hero.intro.emphasis")}
          </span>
          {t("hero.intro.rest")}
        </p>
        <p>{t("hero.intro.support")}</p>
      </div>

      <div
        className="animate-fade-up lg:col-start-1 lg:row-start-3"
        style={{ animationDelay: "400ms" }}
      >
        <div className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-fg-muted)]">
          {t("hero.rightNow")}
        </div>
        <a
          href={profile.currentOrgLink}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-chip group inline-flex items-center self-start rounded-full px-4 py-2.5 text-[14px] leading-tight text-[var(--color-fg-soft)] transition-all duration-200 hover:-translate-y-px hover:border-[var(--color-fg-muted)]"
          aria-label={ariaCurrentRole}
        >
          <span>
            <strong className="font-semibold text-[var(--color-fg)]">
              {currentRole}
            </strong>{" "}
            {t("hero.currentRole.at")}{" "}
            <strong className="font-semibold text-[var(--color-ruby-deep)] transition-colors group-hover:text-[var(--color-ruby)]">
              {profile.currentOrg}
            </strong>
          </span>
        </a>
        <div className="mt-2 pl-1 font-mono text-[10.5px] tracking-[0.04em] text-[var(--color-fg-faint)]">
          {profile.currentStatusDetail}
        </div>
      </div>

      <div
        className="flex flex-wrap gap-2 animate-fade-up lg:col-start-1 lg:row-start-4"
        style={{ animationDelay: "500ms" }}
      >
        <Link
          href={localeHref("/resume", locale)}
          className="inline-flex items-center rounded-full bg-[var(--color-fg)] px-[18px] py-[11px] font-sans text-sm font-medium text-[var(--color-bg)] transition-all duration-200 hover:-translate-y-px hover:bg-[var(--color-ruby)]"
        >
          {t("hero.cta.resume")}
        </Link>
        <EmailButton
          email={profile.email}
          className="btn-secondary"
        >
          {t("hero.cta.email")}
        </EmailButton>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          {t("hero.cta.github")}
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          {t("hero.cta.linkedin")}
        </a>
      </div>

      {/* The animation is desktop-only. Hiding this grid item also
          removes its row gap from the mobile layout. */}
      <div
        className="hidden min-w-0 animate-fade-up lg:col-start-2 lg:row-start-1 lg:row-span-4 lg:block lg:self-center"
        style={{ animationDelay: "300ms" }}
      >
        <HeroStage />
      </div>
    </section>
  );
}
