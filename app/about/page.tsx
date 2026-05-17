import type { Metadata } from "next";
import Image from "next/image";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { KineticQuote } from "@/components/about/kinetic-quote";
import {
  profile,
  communityService,
  activities,
  awards,
  personalInterests,
  spokenLanguages,
  type CommunityRole,
  type Activity as ActivityType,
  type Award as AwardType,
} from "@/lib/content";
import { getLocale, getT } from "@/lib/i18n/server";
import { pickLocalized } from "@/lib/i18n/content";
import { formatDates } from "@/lib/i18n/dates";
import { renderRich } from "@/lib/i18n/rich";
import type { MessageKey } from "@/lib/i18n/messages";
import type { Locale } from "@/lib/i18n/types";

export const metadata: Metadata = {
  title: "About",
  description:
    "Bio, community service, activities, awards, and personal interests.",
};

const SMU_BIG_GRANT = "https://iie.smu.edu.sg/acceleration-grant";
const VNTT_LINK = "https://vntt.com.vn/";

// Map an interest group id to its translation key. About-page only.
const INTEREST_LABEL_KEY: Record<string, MessageKey> = {
  motorsports: "about.interests.motorsports",
  investing: "about.interests.investing",
  education: "about.interests.education",
  "gaming-past": "about.interests.gamingPast",
};

export default async function AboutPage() {
  const t = await getT();
  const locale = await getLocale();
  const citizenshipNote = t("about.citizenshipNote");

  return (
    <DashboardShell>
      {/* Two-column layout at lg+: bio left, sticky portrait rail right */}
      <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
        <div className="min-w-0">
          {/* Header */}
          <header>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-fg-muted)]">
              {t("about.eyebrow")}
            </div>
            <h1 className="mt-3 font-sans text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[0.96] tracking-[-0.04em] text-[var(--color-fg)]">
              {t("about.title")}<span className="text-[var(--color-ruby)]">.</span>
            </h1>
          </header>

          {/* Mobile/tablet portrait: stacked above bio. Hidden at lg where the rail takes over. */}
          <div className="mt-7 flex items-center gap-5 lg:hidden">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 scale-110 rounded-3xl bg-[var(--color-ruby-soft)] blur-2xl"
              />
              <Image
                src={profile.photoSrc}
                alt={`${profile.name} portrait`}
                width={180}
                height={180}
                className="h-[120px] w-[120px] flex-shrink-0 rounded-3xl border border-[var(--color-border-default)] object-cover shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                priority
              />
            </div>
            <div className="flex-1 font-mono text-[11px] tracking-[0.04em] text-[var(--color-fg-muted)]">
              <div className="text-[var(--color-ruby)]">{citizenshipNote}</div>
              <div className="mt-1 text-[var(--color-fg-soft)]">
                {spokenLanguages.map((l) => l.name).join(" / ")}
              </div>
            </div>
          </div>

          {/* Pull quote: signature kinetic word-stagger animation. */}
          <KineticQuote
            text={t("about.quote.text")}
            emphasis={t("about.quote.emphasis")}
          />

          {/* Bio prose. Translation strings carry markdown-ish markup
              (**bold**, __ruby__, [link](url)) parsed by renderRich. */}
          <div className="mt-8 max-w-[680px] space-y-5 text-[1.0625rem] leading-[1.75] text-[var(--color-fg-soft)]">
            <p>{renderRich(t("about.bio.p1"))}</p>
            <p>{renderRich(t("about.bio.p2"))}</p>
            <p>{renderRich(t("about.bio.p3"))}</p>
            <p>{renderRich(t("about.bio.p4"))}</p>
          </div>
        </div>

        {/* Sticky portrait rail at lg+ */}
        <aside className="sticky top-24 hidden self-start lg:block">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 scale-110 rounded-3xl bg-[var(--color-ruby-soft)] blur-2xl"
            />
            <Image
              src={profile.photoSrc}
              alt={`${profile.name} portrait`}
              width={220}
              height={220}
              className="h-[200px] w-[200px] rounded-3xl border border-[var(--color-border-default)] object-cover shadow-[0_4px_18px_rgba(0,0,0,0.06)]"
              priority
            />
          </div>
          <div className="mt-5 font-mono text-[10.5px] tracking-[0.04em] text-[var(--color-fg-muted)]">
            <div className="text-[var(--color-ruby)]">{citizenshipNote}</div>
            <div className="mt-2 border-t border-[var(--color-border-soft)] pt-2 text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-faint)]">
              {t("about.languagesLabel")}
            </div>
            <div className="mt-1 text-[var(--color-fg-soft)]">
              {spokenLanguages.map((l) => l.name).join(" / ")}
            </div>
          </div>
        </aside>
      </div>

      {/* Community Service */}
      <Section title={t("about.section.communityService")} count={1}>
        {/* Wider left padding so the logo markers do not crowd the text. */}
        <ul className="relative ml-3 flex flex-col border-l-2 border-[var(--color-border-default)] pl-11">
          {communityService.map((c) => (
            <CommunityServiceRow key={c.id} entry={c} locale={locale} />
          ))}
        </ul>
      </Section>

      {/* Activities */}
      <Section title={t("about.section.activities")} count={2}>
        <ul className="grid gap-3.5 sm:grid-cols-3">
          {activities.map((a) => (
            <ActivityCard key={a.id} entry={a} locale={locale} />
          ))}
        </ul>
      </Section>

      {/* Awards */}
      <Section title={t("about.section.awards")} count={3}>
        <ul className="grid gap-3.5 sm:grid-cols-2">
          {awards.map((aw) => (
            <AwardCard key={aw.id} entry={aw} locale={locale} />
          ))}
        </ul>
      </Section>

      {/* Personal interests as a token mosaic */}
      <Section title={t("about.section.personalInterests")} count={4}>
        <div className="space-y-5">
          {personalInterests.map((g) => {
            const labelKey = INTEREST_LABEL_KEY[g.id];
            const label = labelKey ? t(labelKey) : g.label;
            const items = pickLocalized(g.items, g.itemsVi, locale);
            return (
              <div key={g.id}>
                <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-faint)]">
                  {label}
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span key={item} className="tag-chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </DashboardShell>
  );
}

function Section({
  title,
  count,
  children,
}: {
  title: string;
  count?: number;
  children: React.ReactNode;
}) {
  const num = count ? count.toString().padStart(2, "0") : undefined;
  return (
    <section className="relative mt-20">
      {/* Watermark numeral as design texture. Positioned well clear of
          the heading so it reads as architectural detail, not background. */}
      {num && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-14 left-0 select-none font-sans text-[3.5rem] font-black leading-none text-[var(--color-fg)] opacity-[0.06] sm:-left-2 sm:-top-16 sm:text-[4.5rem]"
        >
          {num}
        </span>
      )}
      <div className="relative mb-5 flex items-end justify-between border-b border-[var(--color-border-default)] pb-3">
        <h2 className="font-sans text-[1.375rem] font-semibold tracking-[-0.02em] text-[var(--color-fg)]">
          {title}
        </h2>
      </div>
      <div className="relative">{children}</div>
    </section>
  );
}

function CommunityServiceRow({
  entry,
  locale,
}: {
  entry: CommunityRole;
  locale: Locale;
}) {
  const { org, dates, logoSrc } = entry;
  const role = pickLocalized(entry.role, entry.roleVi, locale);
  const description = pickLocalized(
    entry.description,
    entry.descriptionVi,
    locale,
  );
  return (
    <li className="relative pb-7 last:pb-0">
      <span
        aria-hidden="true"
        className="absolute -left-[58px] top-0 flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-[var(--color-border-default)] bg-white"
      >
        {logoSrc ? (
          <Image
            src={logoSrc}
            alt=""
            width={44}
            height={44}
            className="h-9 w-9 object-contain"
          />
        ) : (
          <span className="h-2 w-2 rounded-full bg-[var(--color-ruby)]" />
        )}
      </span>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
        <div className="font-sans text-[14px] font-semibold leading-tight text-[var(--color-fg)]">
          {org}
        </div>
        <div className="font-mono text-[11px] tracking-[0.04em] text-[var(--color-fg-faint)]">
          {formatDates(dates, locale)}
        </div>
      </div>
      <div className="mt-1 font-sans text-[12.5px] font-medium text-[var(--color-fg-muted)]">
        {role}
      </div>
      <p className="mt-1.5 text-[13px] leading-[1.6] text-[var(--color-fg-soft)]">
        {description}
      </p>
    </li>
  );
}

function ActivityCard({
  entry,
  locale,
}: {
  entry: ActivityType;
  locale: Locale;
}) {
  const { org, dates, logoSrc } = entry;
  const role = pickLocalized(entry.role, entry.roleVi, locale);
  const description = entry.description
    ? pickLocalized(entry.description, entry.descriptionVi, locale)
    : undefined;
  return (
    <li className="lift-card rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-warm)] p-5">
      {/* Top row: small logo + org + dates inline. Below: role and
          description span the full card width so the prose has room
          to breathe instead of being squeezed into a column next to
          the logo. */}
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--color-border-default)] bg-white">
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt=""
              width={32}
              height={32}
              className="h-6 w-6 object-contain"
            />
          ) : (
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[var(--color-fg-faint)]" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div
            className="truncate font-sans text-[13px] font-semibold leading-tight text-[var(--color-fg)]"
            title={org}
          >
            {org}
          </div>
          <div className="mt-0.5 font-mono text-[10px] tracking-[0.04em] text-[var(--color-fg-faint)]">
            {formatDates(dates, locale)}
          </div>
        </div>
      </div>
      <div className="mt-4 font-sans text-[12.5px] font-semibold text-[var(--color-fg)]">
        {role}
      </div>
      {description && (
        <p className="mt-1.5 text-[12.5px] leading-[1.6] text-[var(--color-fg-soft)]">
          {description}
        </p>
      )}
    </li>
  );
}

function AwardCard({
  entry,
  locale,
}: {
  entry: AwardType;
  locale: Locale;
}) {
  const { issuer, imageSrc } = entry;
  const title = pickLocalized(entry.title, entry.titleVi, locale);
  const description = entry.description
    ? pickLocalized(entry.description, entry.descriptionVi, locale)
    : undefined;
  // Awards with images get a hero treatment with banner image.
  // Dates intentionally NOT rendered on award cards — clutter without
  // adding signal. The resume timeline is the source of truth for
  // when things happened.
  if (imageSrc) {
    return (
      <li className="lift-card flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-warm)]">
        <div className="relative h-36 w-full overflow-hidden bg-[var(--color-bg-card)]">
          <Image
            src={imageSrc}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            // Award photos consistently put the recipient + presenter
            // heads in the upper portion of the frame. Top-biased crop
            // keeps the faces in shot.
            className="object-cover object-top"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-bg-warm)] via-transparent to-transparent" />
        </div>
        <div className="flex-1 p-5">
          <div className="font-sans text-[13.5px] font-semibold leading-tight text-[var(--color-fg)]">
            {title}
          </div>
          <div className="mt-1 font-sans text-[12px] text-[var(--color-fg-muted)]">
            {issuer}
          </div>
          {description && (
            <p className="mt-2 text-[12px] leading-[1.55] text-[var(--color-fg-soft)]">
              {description}
            </p>
          )}
        </div>
      </li>
    );
  }
  // Compact layout for awards without images: no placeholder icon, just
  // tight text content claiming the card.
  return (
    <li className="lift-card rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-warm)] p-5">
      <div className="font-sans text-[13.5px] font-semibold leading-tight text-[var(--color-fg)]">
        {title}
      </div>
      <div className="mt-1 font-sans text-[12px] text-[var(--color-fg-muted)]">
        {issuer}
      </div>
      {description && (
        <p className="mt-2 text-[12px] leading-[1.55] text-[var(--color-fg-soft)]">
          {description}
        </p>
      )}
    </li>
  );
}
