import type { Metadata } from "next";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/dashboard-shell";

export const metadata: Metadata = {
  title: "Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <DashboardShell>
      <section className="flex min-h-[60vh] flex-col justify-center">
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-ruby)]">
          404
        </div>
        <h1 className="mt-3 font-sans text-[clamp(2.5rem,6vw,4rem)] font-bold leading-[0.96] tracking-[-0.04em] text-[var(--color-fg)]">
          Nothing here
          <span className="text-[var(--color-ruby)]">.</span>
        </h1>
        <p className="mt-5 max-w-[520px] text-[1.0625rem] leading-[1.65] text-[var(--color-fg-soft)]">
          The page you tried to open is missing, was renamed, or never existed.
          No telemetry, no broker, nothing to debug here. Try one of these
          instead.
        </p>

        <div className="mt-8 flex flex-wrap gap-2.5">
          <Link
            href="/"
            className="inline-flex items-center rounded-full bg-[var(--color-fg)] px-[18px] py-[11px] font-sans text-sm font-medium text-[var(--color-bg)] transition-all duration-200 hover:-translate-y-px hover:bg-[var(--color-ruby)]"
          >
            Home
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center rounded-full border border-[var(--color-border-default)] bg-[var(--color-surface-2)] px-[18px] py-[11px] font-sans text-sm font-medium text-[var(--color-fg-muted)] backdrop-blur transition-all duration-200 hover:border-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
          >
            Projects
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center rounded-full border border-[var(--color-border-default)] bg-[var(--color-surface-2)] px-[18px] py-[11px] font-sans text-sm font-medium text-[var(--color-fg-muted)] backdrop-blur transition-all duration-200 hover:border-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
          >
            About
          </Link>
          <Link
            href="/resume"
            className="inline-flex items-center rounded-full border border-[var(--color-border-default)] bg-[var(--color-surface-2)] px-[18px] py-[11px] font-sans text-sm font-medium text-[var(--color-fg-muted)] backdrop-blur transition-all duration-200 hover:border-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
          >
            Resume
          </Link>
        </div>

        <div className="mt-12 max-w-[440px] rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-warm)] p-5">
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-faint)]">
            Status
          </div>
          <div className="mt-1.5 font-mono text-[13px] text-[var(--color-fg-soft)]">
            <span className="text-[var(--color-ruby-deep)]">HTTP 404</span>{" "}
            &middot; route not found
          </div>
        </div>
      </section>
    </DashboardShell>
  );
}
