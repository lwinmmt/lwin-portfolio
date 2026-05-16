import type { Metadata } from "next";
import Image from "next/image";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { KineticQuote } from "@/components/about/kinetic-quote";
import {
  profile,
  bio,
  communityService,
  activities,
  awards,
  personalInterests,
  spokenLanguages,
  type CommunityRole,
  type Activity as ActivityType,
  type Award as AwardType,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Bio, community service, activities, awards, and personal interests.",
};

const SMU_BIG_GRANT = "https://iie.smu.edu.sg/acceleration-grant";
const VNTT_LINK = "https://vntt.com.vn/";

export default function AboutPage() {
  return (
    <DashboardShell>
      {/* Two-column layout at lg+: bio left, sticky portrait rail right */}
      <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
        <div className="min-w-0">
          {/* Header */}
          <header>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-fg-muted)]">
              About
            </div>
            <h1 className="mt-3 font-sans text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[0.96] tracking-[-0.04em] text-[var(--color-fg)]">
              The longer story<span className="text-[var(--color-ruby)]">.</span>
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
              <div className="text-[var(--color-ruby)]">{bio.citizenshipNote}</div>
              <div className="mt-1 text-[var(--color-fg-soft)]">
                {spokenLanguages.map((l) => l.name).join(", ")}
              </div>
            </div>
          </div>

          {/* Pull quote: signature kinetic word-stagger animation. */}
          <KineticQuote
            text="I tend to build things at the intersection of"
            emphasis="hardware, cloud, and product."
          />

          {/* Bio prose */}
          <div className="mt-8 max-w-[680px] space-y-5 text-[1.0625rem] leading-[1.75] text-[var(--color-fg-soft)]">
            <p>
              I&rsquo;m an <Strong>Information Systems student</Strong> at{" "}
              <Strong>Singapore Management University</Strong>, on a dual track
              of <Strong>Product Development</Strong> and{" "}
              <Strong>Business Analytics</Strong>. Before SMU, I did a{" "}
              <Strong>Diploma in Computer Engineering</Strong> at{" "}
              <Strong>Singapore Polytechnic</Strong>, which is where most of my
              hardware and networking foundations came from.
            </p>
            <p>
              The story so far has been a mix of architected production IoT
              systems (<Strong>NEA wastewater monitoring</Strong> at 360 sites),
              founding things from scratch (<Strong>Osiris</Strong> hydroponics
              automation, funded by an{" "}
              <a
                href={SMU_BIG_GRANT}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[var(--color-fg)] transition-colors hover:text-[var(--color-ruby-deep)]"
              >
                SMU BIG grant
              </a>
              ), and bootstrapping commercial operations (5 years of{" "}
              <Strong>Nepseeds</Strong> plant e-commerce). Right now I&rsquo;m at{" "}
              <a
                href={VNTT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[var(--color-fg)] transition-colors hover:text-[var(--color-ruby-deep)]"
              >
                Vietnam Technology &amp; Telecommunication (VNTT)
              </a>{" "}
              in Ho Chi Minh City learning what production-scale industrial IoT
              actually feels like, working on{" "}
              <Strong>EdgeX-based systems</Strong>.
            </p>
            <p>
              I&rsquo;m a heavy daily user of{" "}
              <Ruby>Claude Code, Gemini, ChatGPT, and Kimi</Ruby> and treat the
              ability to direct them well as a real competitive skill. Most of
              my recent project output uses AI-assisted code generation; my
              contribution sits in <Strong>framing the problem</Strong>, making
              the <Strong>architecture decisions</Strong>, and{" "}
              <Strong>validating the output</Strong>.
            </p>
            <p>
              Outside of school and work, I hold a{" "}
              <Strong>motorcycle and car license</Strong> and I&rsquo;m pursuing
              a <Strong>Boat License (PPCDL)</Strong>. I follow{" "}
              <Strong>Theo (t3.gg)</Strong>, <Strong>Mo Bitar</Strong>, and{" "}
              <Strong>Fireship</Strong> for engineering and dev-tooling
              content, and I invest consistently in the US stock market. I used
              to play a lot of Counter Strike Global Offensive, Dota 2, and
              Minecraft, but not much time for that these days.
            </p>
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
            <div className="text-[var(--color-ruby)]">{bio.citizenshipNote}</div>
            <div className="mt-2 border-t border-[var(--color-border-soft)] pt-2 text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-faint)]">
              Languages
            </div>
            <div className="mt-1 text-[var(--color-fg-soft)]">
              {spokenLanguages.map((l) => l.name).join(" / ")}
            </div>
          </div>
        </aside>
      </div>

      {/* Community Service */}
      <Section title="Community service and leadership" count={1}>
        {/* Wider left padding so the logo markers do not crowd the text. */}
        <ul className="relative ml-3 flex flex-col border-l-2 border-[var(--color-border-default)] pl-11">
          {communityService.map((c) => (
            <CommunityServiceRow key={c.id} {...c} />
          ))}
        </ul>
      </Section>

      {/* Activities */}
      <Section title="Activities and CCAs" count={2}>
        <ul className="grid gap-3.5 sm:grid-cols-3">
          {activities.map((a) => (
            <ActivityCard key={a.id} {...a} />
          ))}
        </ul>
      </Section>

      {/* Awards */}
      <Section title="Awards" count={3}>
        <ul className="grid gap-3.5 sm:grid-cols-2">
          {awards.map((aw) => (
            <AwardCard key={aw.id} {...aw} />
          ))}
        </ul>
      </Section>

      {/* Personal interests as a token mosaic */}
      <Section title="Personal interests" count={4}>
        <div className="space-y-5">
          {personalInterests.map((g) => (
            <div key={g.id}>
              <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-faint)]">
                {g.label}
              </div>
              <div className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span key={item} className="tag-chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </DashboardShell>
  );
}

function Strong({ children }: { children: React.ReactNode }) {
  return (
    <strong className="font-semibold text-[var(--color-fg)]">{children}</strong>
  );
}

function Ruby({ children }: { children: React.ReactNode }) {
  return (
    <strong className="font-semibold text-[var(--color-ruby-deep)]">
      {children}
    </strong>
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
      <div className="relative mb-6 flex items-end justify-between border-b border-[var(--color-border-default)] pb-3">
        <h2 className="font-sans text-[1.375rem] font-semibold tracking-[-0.02em] text-[var(--color-fg)]">
          {title}
        </h2>
      </div>
      <div className="relative">{children}</div>
    </section>
  );
}

function CommunityServiceRow({
  org,
  role,
  dates,
  description,
  logoSrc,
}: CommunityRole) {
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
          {dates}
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

function ActivityCard({ org, role, dates, description, logoSrc }: ActivityType) {
  return (
    <li className="lift-card rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-warm)] p-5">
      <div className="mb-3 flex items-start gap-2.5">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--color-border-default)] bg-white">
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt=""
              width={40}
              height={40}
              className="h-8 w-8 object-contain"
            />
          ) : (
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[var(--color-fg-faint)]" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-sans text-[13.5px] font-semibold leading-tight text-[var(--color-fg)]">
            {org}
          </div>
          <div className="mt-1 font-mono text-[10.5px] tracking-[0.04em] text-[var(--color-fg-faint)]">
            {dates}
          </div>
        </div>
      </div>
      <div className="mb-2 font-sans text-[12.5px] font-medium text-[var(--color-fg-muted)]">
        {role}
      </div>
      {description && (
        <p className="text-[12.5px] leading-[1.55] text-[var(--color-fg-soft)]">
          {description}
        </p>
      )}
    </li>
  );
}

function AwardCard({ title, issuer, date, description, imageSrc }: AwardType) {
  // Awards with images get a hero treatment with banner image.
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
          <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="font-sans text-[12px] text-[var(--color-fg-muted)]">
              {issuer}
            </span>
            <span className="font-mono text-[10.5px] tracking-[0.04em] text-[var(--color-fg-faint)]">
              {date}
            </span>
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
      <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <span className="font-sans text-[12px] text-[var(--color-fg-muted)]">
          {issuer}
        </span>
        <span className="font-mono text-[10.5px] tracking-[0.04em] text-[var(--color-fg-faint)]">
          {date}
        </span>
      </div>
      {description && (
        <p className="mt-2 text-[12px] leading-[1.55] text-[var(--color-fg-soft)]">
          {description}
        </p>
      )}
    </li>
  );
}
