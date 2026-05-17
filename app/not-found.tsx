import type { Metadata } from "next";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { getT } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Not Found",
  robots: { index: false, follow: false },
};

export default async function NotFound() {
  const t = await getT();
  return (
    <DashboardShell>
      <section className="flex min-h-[60vh] flex-col justify-center">
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-ruby)]">
          {t("notFound.eyebrow")}
        </div>
        <h1 className="mt-3 font-sans text-[clamp(2.5rem,6vw,4rem)] font-bold leading-[0.96] tracking-[-0.04em] text-[var(--color-fg)]">
          {t("notFound.titleHead")}
          <span className="text-[var(--color-ruby)]">{t("notFound.titleDot")}</span>
        </h1>
        <p className="mt-5 max-w-[520px] text-[1.0625rem] leading-[1.65] text-[var(--color-fg-soft)]">
          {t("notFound.body")}
        </p>

        <div className="mt-8 flex flex-wrap gap-2.5">
          <Link
            href="/"
            className="inline-flex items-center rounded-full bg-[var(--color-fg)] px-[18px] py-[11px] font-sans text-sm font-medium text-[var(--color-bg)] transition-all duration-200 hover:-translate-y-px hover:bg-[var(--color-ruby)]"
          >
            {t("notFound.home")}
          </Link>
          <Link
            href="/projects"
            className="btn-secondary"
          >
            {t("notFound.projects")}
          </Link>
          <Link
            href="/about"
            className="btn-secondary"
          >
            {t("notFound.about")}
          </Link>
          <Link
            href="/resume"
            className="btn-secondary"
          >
            {t("notFound.resume")}
          </Link>
        </div>

        <div className="mt-12 max-w-[440px] rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-warm)] p-5">
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-faint)]">
            {t("notFound.status")}
          </div>
          <div className="mt-1.5 font-mono text-[13px] text-[var(--color-fg-soft)]">
            <span className="text-[var(--color-ruby-deep)]">HTTP 404</span>{" "}
            · {t("notFound.routeMissing")}
          </div>
        </div>
      </section>
    </DashboardShell>
  );
}
