import type { Metadata } from "next";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { usesGroups, type UsesItem } from "@/lib/content";
import { getT } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Uses",
  description:
    "Daily AI tools, dev stack, IoT and cloud stack, hardware, and everyday software.",
};

export default async function UsesPage() {
  const t = await getT();
  const hardwareTag = t("uses.hardwareTag");
  const aiTools = usesGroups.find((g) => g.id === "ai-tools");
  const stack = usesGroups.find((g) => g.id === "stack");
  const hardware = usesGroups.find((g) => g.id === "hardware");
  const everyday = usesGroups.find((g) => g.id === "everyday");
  const editor = usesGroups.find((g) => g.id === "editor");
  const iotStack = usesGroups.find((g) => g.id === "iot-stack");

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
      <figure>
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
                  {aiTools.label}
                </h2>
              </div>
              <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-fg-faint)]">
                {t("uses.aiTools.subtitle").replace("{n}", String(aiTools.items.length))}
              </div>
            </div>
            {aiTools.description && (
              <p className="mt-3 max-w-[560px] text-[14px] leading-[1.6] text-[var(--color-fg-soft)]">
                {aiTools.description}
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
                          {tool.detail}
                        </span>
                      )}
                    </div>
                    {tool.link && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="flex-shrink-0 text-[var(--color-fg-faint)] opacity-0 transition-opacity duration-200 group-hover:text-[var(--color-ruby)] group-hover:opacity-100"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path d="M7 17 17 7M7 7h10v10" />
                      </svg>
                    )}
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

        {/* Split panel: Stack (warm bg) vs IoT/Cloud (card bg). Two
            sibling cards with intentionally different surface tones so
            the page reads as three distinguishable zones, not five
            indistinguishable cards. */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {stack && (
            <section className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-warm)] p-6">
              <div className="flex items-baseline justify-between">
                <h2 className="font-sans text-[16px] font-semibold tracking-[-0.01em] text-[var(--color-fg)]">
                  {stack.label}
                </h2>
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-fg-faint)]">
                  {stack.items.length}
                </span>
              </div>
              {stack.description && (
                <p className="mt-1 text-[12px] leading-[1.55] text-[var(--color-fg-muted)]">
                  {stack.description}
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-2 border-t border-[var(--color-border-soft)] pt-4">
                {stack.items.map((item) => (
                  <StackChip key={item.name} item={item} />
                ))}
              </div>
            </section>
          )}
          {iotStack && (
            <section className="rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-bg-card)] p-6">
              <div className="flex items-baseline justify-between">
                <h2 className="font-sans text-[16px] font-semibold tracking-[-0.01em] text-[var(--color-fg)]">
                  {iotStack.label}
                </h2>
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-fg-faint)]">
                  {iotStack.items.length}
                </span>
              </div>
              {iotStack.description && (
                <p className="mt-1 text-[12px] leading-[1.55] text-[var(--color-fg-muted)]">
                  {iotStack.description}
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-2 border-t border-[var(--color-border-soft)] pt-4">
                {iotStack.items.map((item) => (
                  <StackChip key={item.name} item={item} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Bottom grid: Editor + Everyday. Transparent fill so they read
            quieter than the split panel above. Visual weight flows down:
            AI hero (heaviest) -> split panel (medium) -> these (lightest). */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {editor && <DetailListGroup group={editor} hardwareTag={hardwareTag} />}
          {everydayMerged && (
            <DetailListGroup group={everydayMerged} hardwareTag={hardwareTag} />
          )}
        </div>

      </figure>
    </DashboardShell>
  );
}

function StackChip({ item }: { item: UsesItem }) {
  return (
    <span className="group relative inline-flex items-center">
      <span className="tag-chip cursor-default">
        {item.name}
      </span>
      {item.detail && (
        <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[var(--color-fg)] px-2.5 py-1.5 font-mono text-[10px] tracking-[0.04em] text-[var(--color-bg)] opacity-0 shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-opacity duration-150 group-hover:opacity-100">
          {item.detail}
        </span>
      )}
    </span>
  );
}

function DetailListGroup({
  group,
  hardwareTag,
}: {
  group: {
    id: string;
    label: string;
    description?: string;
    items: Array<UsesItem & { _isHardware?: boolean }>;
  };
  hardwareTag: string;
}) {
  return (
    <section className="flex flex-col rounded-2xl border border-[var(--color-border-soft)] p-6">
      <div className="flex items-baseline justify-between">
        <h2 className="font-sans text-[15px] font-semibold tracking-[-0.01em] text-[var(--color-fg)]">
          {group.label}
        </h2>
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-fg-faint)]">
          {group.items.length}
        </span>
      </div>
      {group.description && (
        <p className="mt-1 text-[12px] leading-[1.55] text-[var(--color-fg-muted)]">
          {group.description}
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
                {item.detail}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
