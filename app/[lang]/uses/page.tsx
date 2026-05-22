import type { Metadata } from "next";
import { DashboardShell } from "@/components/layout/dashboard-shell";

import { usesGroups, workedWithGroups, type UsesItem } from "@/lib/content";
import { getLocale, getT, seedLocaleFromParams } from "@/lib/i18n/server";
import { messages } from "@/lib/i18n/messages";
import { pickLocalized } from "@/lib/i18n/content";
import type { Locale } from "@/lib/i18n/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const locale = await seedLocaleFromParams(params);
  const m = messages[locale];
  return {
    title: m["page.title.uses"],
    description: m["page.description.uses"],
  };
}

export default async function UsesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  await seedLocaleFromParams(params);
  const t = getT();
  const locale = getLocale();
  const hardwareTag = t("uses.hardwareTag");
  const aiTools = usesGroups.find((g) => g.id === "ai-tools");
  const languages = usesGroups.find((g) => g.id === "languages");
  const hardware = usesGroups.find((g) => g.id === "hardware");
  const everyday = usesGroups.find((g) => g.id === "everyday");
  const editor = usesGroups.find((g) => g.id === "editor");

  // Hardware merged into Everyday as a pinned prefix.
  const everydayMerged = everyday
    ? ({
        ...everyday,
        items: [
          ...(hardware?.items ?? []).map((it) => ({ ...it, _isHardware: true })),
          ...everyday.items,
        ],
      } as typeof everyday & { items: Array<UsesItem & { _isHardware?: boolean }> })
    : null;

  // Side-by-side groups are Editor + Everyday (with hardware merged).
  // IoT and Stack get full-width treatment below.
  return (
    <DashboardShell>
      {/* <figure> would announce a graphic landmark expecting an
          accompanying <figcaption>. This page is a tools listing
          (text + tag chips), not a figure. <article> matches the
          self-contained-content semantic. */}
      <article>
        <header>
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-fg-muted)]">
            {t("uses.eyebrow")}
          </div>
          <h1 className="mt-3 font-sans text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[0.96] tracking-[-0.04em] text-[var(--color-fg)]">
            {t("uses.titleHead")}<span className="text-[var(--color-ruby)]">{t("uses.titleDot")}</span>
          </h1>
          <p className="mt-5 max-w-[640px] text-[1rem] leading-[1.6] text-[var(--color-fg-muted)]">
            {t("uses.intro")}
          </p>
        </header>

        {/* Featured AI Tools card. Quieter gradient than v1, the AI block
            still reads as primary without the ruby panel feeling shouty. */}
        {aiTools && (
          <section
            className="relative mt-12 overflow-hidden rounded-2xl border border-[var(--color-border-default)] p-7 sm:p-9"
            style={{
              background:
                "radial-gradient(ellipse 80% 90% at 0% 0%, color-mix(in oklab, var(--color-ruby) 9%, transparent), transparent 55%), var(--color-bg-card)",
            }}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-muted)]">
                  {t("uses.dailyCore")}
                </div>
                <h2 className="mt-2 font-sans text-[1.5rem] font-semibold tracking-[-0.02em] text-[var(--color-fg)]">
                  {pickLocalized(aiTools.label, aiTools.labelVi, locale)}
                </h2>
              </div>
              <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-fg-faint)]">
                {t("uses.aiTools.subtitle").replace("{n}", String(aiTools.items.length))}
              </div>
            </div>
            {aiTools.description && (
              <p className="mt-3 max-w-[560px] text-[14px] leading-[1.6] text-[var(--color-fg-soft)]">
                {pickLocalized(
                  aiTools.description,
                  aiTools.descriptionVi,
                  locale,
                )}
              </p>
            )}
            {/* Editorial band rows. Each AI tool is a full-width band with
                a large mono rank anchor, name + inline detail pill, and a
                ruby left-line that animates in on hover via scaleY. Unique
                visual rhythm only used in this section. */}
            <ol className="mt-8 flex flex-col">
              {aiTools.items.map((tool, idx) => {
                const rank = String(idx + 1).padStart(2, "0");
                const rowInner = (
                  <>
                    {/* Ruby left-line, scaled from 0 to 1 on hover. */}
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-[var(--color-ruby)] transition-transform duration-300 ease-[cubic-bezier(0.2,0.7,0.3,1)] group-hover:scale-y-100"
                    />
                    <span
                      aria-hidden="true"
                      className="w-12 flex-shrink-0 font-mono text-[2rem] font-bold leading-none tracking-[-0.04em] text-[var(--color-fg-faint)] transition-colors group-hover:text-[var(--color-ruby)]"
                    >
                      {rank}
                    </span>
                    <div className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-sans text-[1.0625rem] font-semibold leading-tight text-[var(--color-fg)]">
                        {tool.name}
                      </span>
                      {tool.detail && (
                        <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-[var(--color-fg-faint)]">
                          {pickLocalized(tool.detail, tool.detailVi, locale)}
                        </span>
                      )}
                    </div>
                    {/* No external-link arrow icon here. The whole
                        row is already a link target; an extra glyph
                        on hover read as visual noise. */}
                  </>
                );
                const rowClass =
                  "group relative flex items-center gap-5 border-t border-[var(--color-border-soft)] px-3 py-4 transition-colors first:border-t-0 hover:bg-[var(--color-hover-mute)]";
                if (tool.link) {
                  return (
                    <li key={tool.name}>
                      <a
                        href={tool.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={rowClass}
                      >
                        {rowInner}
                      </a>
                    </li>
                  );
                }
                return (
                  <li key={tool.name} className={rowClass}>
                    {rowInner}
                  </li>
                );
              })}
            </ol>
          </section>
        )}

        {/* Languages strip. Chip-only, no per-item description —
            language names alone carry enough signal (Python, SQL,
            etc.) and stripping the prose keeps the section visually
            light between the dense AI band above and the side-by-
            side editor/everyday cards below. */}
        {languages && (
          <section className="mt-8 rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-warm)] p-6">
            <div className="flex items-baseline justify-between">
              <h2 className="font-sans text-[16px] font-semibold tracking-[-0.01em] text-[var(--color-fg)]">
                {pickLocalized(languages.label, languages.labelVi, locale)}
              </h2>
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-fg-faint)]">
                {languages.items.length}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 border-t border-[var(--color-border-soft)] pt-4">
              {languages.items.map((item) => (
                <span key={item.name} className="tag-chip">
                  {item.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Bottom grid: Editor + Everyday. Transparent fill so they read
            quieter than the languages strip above. Visual weight flows
            down: AI hero (heaviest) -> Languages (light strip) ->
            Editor + Everyday (lightest). */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {editor && (
            <DetailListGroup
              group={editor}
              hardwareTag={hardwareTag}
              locale={locale}
            />
          )}
          {everydayMerged && (
            <DetailListGroup
              group={everydayMerged}
              hardwareTag={hardwareTag}
              locale={locale}
            />
          )}
        </div>

        {/* "Tools I've worked with" — broader proven breadth as a
            chip block. Each sub-group is a small uppercase label
            over a row of name chips. No per-item description: this
            block signals reach, not daily use. The featured sections
            above own the "what I reach for" story. */}
        <section className="mt-12 rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-bg-card)] p-7 sm:p-9">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="font-sans text-[1.25rem] font-semibold tracking-[-0.02em] text-[var(--color-fg)]">
              {t("uses.workedWith.label")}
            </h2>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-fg-faint)]">
              {workedWithGroups.reduce(
                (n, g) => n + g.items.length,
                0,
              )}{" "}
              entries
            </span>
          </div>
          <p className="mt-2 max-w-[560px] text-[13px] leading-[1.55] text-[var(--color-fg-muted)]">
            {t("uses.workedWith.subtitle")}
          </p>
          <div className="mt-7 flex flex-col gap-6">
            {workedWithGroups.map((g) => (
              <div key={g.id}>
                <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-fg-faint)]">
                  {pickLocalized(g.label, g.labelVi, locale)}
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((name) => (
                    <span key={name} className="tag-chip">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

      </article>
    </DashboardShell>
  );
}

function DetailListGroup({
  group,
  hardwareTag,
  locale,
}: {
  group: {
    id: string;
    label: string;
    labelVi?: string;
    description?: string;
    descriptionVi?: string;
    items: Array<UsesItem & { _isHardware?: boolean }>;
  };
  hardwareTag: string;
  locale: Locale;
}) {
  return (
    <section className="flex flex-col rounded-2xl border border-[var(--color-border-soft)] p-6">
      <div className="flex items-baseline justify-between">
        <h2 className="font-sans text-[15px] font-semibold tracking-[-0.01em] text-[var(--color-fg)]">
          {pickLocalized(group.label, group.labelVi, locale)}
        </h2>
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-fg-faint)]">
          {group.items.length}
        </span>
      </div>
      {group.description && (
        <p className="mt-1 text-[12px] leading-[1.55] text-[var(--color-fg-muted)]">
          {pickLocalized(group.description, group.descriptionVi, locale)}
        </p>
      )}
      <ul className="mt-4 flex flex-col gap-2.5 border-t border-[var(--color-border-soft)] pt-4">
        {group.items.map((item) => (
          <li key={item.name} className="flex flex-col">
            <div className="flex items-center gap-2 font-sans text-[13.5px] font-semibold text-[var(--color-fg)]">
              {item._isHardware && (
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--color-ruby)]">
                  {hardwareTag}
                </span>
              )}
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--color-ruby-deep)]"
                >
                  {item.name}
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[var(--color-fg-faint)]"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M7 17 17 7M7 7h10v10" />
                  </svg>
                </a>
              ) : (
                <span>{item.name}</span>
              )}
            </div>
            {item.detail && (
              <div className="mt-0.5 text-[12px] leading-snug text-[var(--color-fg-muted)]">
                {pickLocalized(item.detail, item.detailVi, locale)}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
