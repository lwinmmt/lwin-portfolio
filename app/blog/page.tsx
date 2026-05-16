import type { Metadata } from "next";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { blogDrafts as drafts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on engineering, AI tools, and shipping products.",
};

export default function BlogPage() {
  return (
    <DashboardShell>
      <header>
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-fg-muted)]">
          Blog
        </div>
        <h1 className="mt-3 font-sans text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[0.96] tracking-[-0.04em] text-[var(--color-fg)]">
          Notes in progress<span className="text-[var(--color-ruby)]">.</span>
        </h1>
        <p className="mt-5 max-w-[640px] text-[1rem] leading-[1.6] text-[var(--color-fg-muted)]">
          Occasional writing on engineering decisions, AI tools, and lessons
          from shipping products. MDX-backed, so each post will have code
          blocks, diagrams, and embeds.
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
            //
          </div>
          <h2 className="mt-5 font-sans text-[1.5rem] font-semibold tracking-[-0.02em] text-[var(--color-fg)]">
            Writing is coming.
          </h2>
          <p className="mt-2 max-w-[420px] font-sans text-[14px] leading-[1.6] text-[var(--color-fg-muted)]">
            Three drafts are in progress. Check back soon.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-5 flex items-end justify-between border-b border-[var(--color-border-default)] pb-3">
          <h2 className="flex items-baseline font-sans text-[1.375rem] font-semibold tracking-[-0.02em] text-[var(--color-fg)]">
            <span className="section-counter">01</span>
            Drafts in the pipeline
          </h2>
          <span className="font-mono text-[11px] tracking-[0.04em] text-[var(--color-fg-faint)]">
            {drafts.length} queued
          </span>
        </div>
        <ul className="grid gap-3.5 sm:grid-cols-2">
          {drafts.map((d) => (
            <li
              key={d.title}
              className="rounded-2xl border border-dashed border-[var(--color-border-default)] bg-transparent p-5 opacity-70 transition-opacity hover:opacity-100"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-ruby)]">
                  {d.tag}
                </span>
                <span className="font-mono text-[10.5px] tracking-[0.06em] text-[var(--color-fg-faint)]">
                  {d.estimatedDate}
                </span>
              </div>
              <h3 className="mb-1.5 font-sans text-[15px] font-semibold leading-[1.3] text-[var(--color-fg)]">
                {d.title}
              </h3>
              <p className="text-[12.5px] leading-[1.55] text-[var(--color-fg-muted)]">
                {d.excerpt}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-16 flex items-center justify-between border-t border-[var(--color-border-soft)] pt-6">
        <p className="font-mono text-[11px] tracking-[0.04em] text-[var(--color-fg-faint)]">
          Email signup goes here once the first post ships.
        </p>
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-fg-faint)]">
          Soon
        </span>
      </div>
    </DashboardShell>
  );
}
