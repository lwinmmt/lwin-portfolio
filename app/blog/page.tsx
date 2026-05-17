import type { Metadata } from "next";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { blogDrafts as drafts } from "@/lib/content";
import { getLocale, getT } from "@/lib/i18n/server";
import { pickLocalized } from "@/lib/i18n/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on engineering, AI tools, and shipping products.",
};

export default async function BlogPage() {
  const t = await getT();
  const locale = await getLocale();
  return (
    <DashboardShell>
      <header>
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-fg-muted)]">
          {t("blog.eyebrow")}
        </div>
        <h1 className="mt-3 font-sans text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[0.96] tracking-[-0.04em] text-[var(--color-fg)]">
          {t("blog.titleHead")}<span className="text-[var(--color-ruby)]">{t("blog.titleDot")}</span>
        </h1>
        <p className="mt-5 max-w-[640px] text-[1rem] leading-[1.6] text-[var(--color-fg-muted)]">
          {t("blog.intro")}
        </p>
      </header>

      {/* Empty-state hero */}
      <section className="relative mt-16 flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-warm)] px-6 py-16 text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 50% 0%, color-mix(in oklab, var(--color-ruby) 10%, transparent), transparent 60%)",
          }}
        />
        <div className="relative">
          <div className="font-mono text-[2.75rem] font-bold leading-none text-[var(--color-border-default)]">
            {"//"}
          </div>
          <h2 className="mt-5 font-sans text-[1.5rem] font-semibold tracking-[-0.02em] text-[var(--color-fg)]">
            {t("blog.empty.heading")}
          </h2>
          <p className="mt-2 max-w-[420px] font-sans text-[14px] leading-[1.6] text-[var(--color-fg-muted)]">
            {t("blog.empty.body")}
          </p>
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-5 flex items-end justify-between border-b border-[var(--color-border-default)] pb-3">
          <h2 className="flex items-baseline font-sans text-[1.375rem] font-semibold tracking-[-0.02em] text-[var(--color-fg)]">
            <span className="section-counter">01</span>
            {t("blog.drafts.heading")}
          </h2>
          <span className="font-mono text-[11px] tracking-[0.04em] text-[var(--color-fg-faint)]">
            {t("blog.drafts.queued").replace("{n}", String(drafts.length))}
          </span>
        </div>
        <ul className="grid gap-3.5 sm:grid-cols-2">
          {drafts.map((d) => {
            const title = pickLocalized(d.title, d.titleVi, locale);
            const excerpt = pickLocalized(d.excerpt, d.excerptVi, locale);
            const tag = pickLocalized(d.tag, d.tagVi, locale);
            return (
              <li
                key={d.title}
                className="rounded-2xl border border-dashed border-[var(--color-border-default)] bg-transparent p-5 opacity-70 transition-opacity hover:opacity-100"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-ruby)]">
                    {tag}
                  </span>
                  <span className="font-mono text-[10.5px] tracking-[0.06em] text-[var(--color-fg-faint)]">
                    {d.estimatedDate}
                  </span>
                </div>
                <h3 className="mb-1.5 font-sans text-[15px] font-semibold leading-[1.3] text-[var(--color-fg)]">
                  {title}
                </h3>
                <p className="text-[12.5px] leading-[1.55] text-[var(--color-fg-muted)]">
                  {excerpt}
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="mt-16 flex items-center justify-between border-t border-[var(--color-border-soft)] pt-6">
        <p className="font-mono text-[11px] tracking-[0.04em] text-[var(--color-fg-faint)]">
          {t("blog.signupFooter")}
        </p>
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-fg-faint)]">
          {t("blog.soon")}
        </span>
      </div>
    </DashboardShell>
  );
}
