import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ESMOSDiagram } from "@/components/esmos/esmos-diagram";
import { ProjectBreadcrumbsJsonLd } from "@/components/structured-data";
import { ProjectLightboxGallery } from "@/components/ui/lightbox";
import { getLocale, getT } from "@/lib/i18n/server";
import { pickLocalized } from "@/lib/i18n/content";
import { formatDates } from "@/lib/i18n/dates";
import type { MessageKey } from "@/lib/i18n/messages";
import {
  projects,
  type Project,
  type ProjectCategory,
  type ProjectLiveLink,
  type CaseStudySection,
} from "@/lib/content";

const CATEGORY_LABEL_KEY: Record<ProjectCategory, MessageKey> = {
  Projects: "projects.category.Projects",
  Coursework: "projects.category.Coursework",
};

type Params = { slug: string };

function allLiveLinks(
  p: Project,
  liveLabel: string,
): ProjectLiveLink[] {
  if (p.liveLinks && p.liveLinks.length > 0) return p.liveLinks;
  if (p.liveLink) return [{ url: p.liveLink, label: liveLabel }];
  return [];
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const t = await getT();
  const locale = await getLocale();
  const categoryLabel = t(CATEGORY_LABEL_KEY[project.category]);
  const title = pickLocalized(project.title, project.titleVi, locale);
  const description = pickLocalized(
    project.description,
    project.descriptionVi,
    locale,
  );
  const caseStudy = pickLocalized(
    project.caseStudy,
    project.caseStudyVi,
    locale,
  );

  const related = projects
    .filter((p) => p.slug !== project.slug && p.category === project.category)
    .slice(0, 2);

  const liveLinks = allLiveLinks(project, t("project.link.live"));
  const anyLinks =
    liveLinks.length > 0 ||
    project.repoLink ||
    project.videoLink ||
    project.slidesLink ||
    project.pdfLink ||
    project.newsLink;

  return (
    <DashboardShell>
      <ProjectBreadcrumbsJsonLd slug={project.slug} title={project.title} />
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-ruby)]"
      >
        <span aria-hidden="true">&larr;</span> {t("project.back")}
      </Link>

      <header className="mt-6">
        {/* No course eyebrow and no category badge on the detail
            header. The /projects index already groups projects by
            category; once you click into one, the meta clutter on
            top of the title is just noise. Dates alone is enough
            context above the body. */}
        <h1 className="font-sans text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.02] tracking-[-0.035em] text-[var(--color-fg)]">
          {title}
        </h1>
        <div className="mt-3 font-mono text-[11px] tracking-[0.04em] text-[var(--color-fg-muted)]">
          {formatDates(project.dates, locale)}
        </div>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_240px]">
        <div>
          <ProjectLightboxGallery
            title={title}
            cover={
              project.imageSrc
                ? {
                    src: project.imageSrc,
                    alt: t("image.alt.cover").replace("{title}", title),
                  }
                : undefined
            }
            coverPosition={project.coverFocus}
            gallery={(project.gallery ?? []).map((src, idx) => ({
              src,
              alt: t("image.alt.photo")
                .replace("{title}", title)
                .replace("{n}", String(idx + 1)),
            }))}
          />

          <p className="text-[1.0625rem] leading-[1.7] text-[var(--color-fg-soft)]">
            {description}
          </p>

          {/* ESMOS architecture diagram, inline. Raw SVG link in the
              caption for readers who want to open it directly. */}
          {project.diagramType === "esmos" && (
            <div className="mt-10">
              <h2 className="mb-3 font-sans text-[1.25rem] font-semibold tracking-[-0.02em] text-[var(--color-fg)]">
                {t("project.archDiagramTitle")}
              </h2>
              <ESMOSDiagram />
            </div>
          )}

          {caseStudy && caseStudy.length > 0 ? (
            <div className="mt-12 flex flex-col gap-10">
              {caseStudy.map((section, idx) => (
                <CaseStudyBlock key={section.heading} section={section} index={idx} />
              ))}
            </div>
          ) : (
            <section className="mt-12 rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-warm)] p-6">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ruby)]">
                {t("project.comingSoon")}
              </div>
              <h3 className="mb-2 font-sans text-[16px] font-semibold text-[var(--color-fg)]">
                {t("project.fullCaseStudyTitle")}
              </h3>
              <p className="text-[13px] leading-[1.6] text-[var(--color-fg-muted)]">
                {t("project.fullCaseStudyBody")}
              </p>
            </section>
          )}

          {related.length > 0 && (
            <section className="mt-12">
              <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-faint)]">
                {t("project.relatedIn").replace("{category}", categoryLabel)}
              </h3>
              <ul className="grid gap-3.5 sm:grid-cols-2">
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/projects/${p.slug}`}
                      className="group block rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-warm)] p-4 transition-colors hover:border-[var(--color-border-default)]"
                    >
                      <h3 className="font-sans text-[13.5px] font-semibold text-[var(--color-fg)]">
                        <span className="card-title-draw">
                          {pickLocalized(p.title, p.titleVi, locale)}
                        </span>
                      </h3>
                      <div className="mt-1 font-mono text-[10.5px] tracking-[0.04em] text-[var(--color-fg-faint)]">
                        {formatDates(p.dates, locale)}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="space-y-7">
          {project.tags && project.tags.length > 0 && (
            <div>
              <h3 className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-faint)]">
                {t("project.aside.stack")}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--color-border-default)] bg-[var(--color-bg-warm)] px-2.5 py-1 font-mono text-[11px] text-[var(--color-fg-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {anyLinks && (
            <div>
              <h3 className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-faint)]">
                {t("project.aside.links")}
              </h3>
              <div className="flex flex-col gap-1.5">
                {liveLinks.map((l) => (
                  <ProjectLink key={l.url} href={l.url} label={l.label} />
                ))}
                {project.repoLink && (
                  <ProjectLink href={project.repoLink} label={t("project.link.github")} />
                )}
                {project.videoLink && (
                  <ProjectLink href={project.videoLink} label={t("project.link.video")} />
                )}
                {project.slidesLink && (
                  <ProjectLink href={project.slidesLink} label={t("project.link.slides")} />
                )}
                {project.pdfLink && (
                  <ProjectLink href={project.pdfLink} label={t("project.link.pdf")} />
                )}
                {project.newsLink && (
                  <ProjectLink href={project.newsLink} label={t("project.link.press")} />
                )}
              </div>
            </div>
          )}
        </aside>
      </div>

    </DashboardShell>
  );
}

/**
 * Render a string with inline markdown-style links and bold:
 *   [label](url)  -> external anchor
 *   **bold**      -> strong, ruby-deep color
 * Plain strings pass through untouched. Keeps the case study data as plain
 * strings while still supporting a tiny bit of inline formatting.
 */
function renderInline(text: string): React.ReactNode {
  if (!text || !text.trim()) return null;
  const pattern =
    /\[([^\]]+)\]\((https?:\/\/[^)]+)\)|\*\*([^*]+)\*\*/g;
  const out: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      out.push(text.slice(lastIndex, match.index));
    }
    const [full, linkLabel, url, boldText] = match;
    if (linkLabel && url) {
      out.push(
        <a
          key={key++}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[var(--color-fg)] underline decoration-[var(--color-border-default)] decoration-1 underline-offset-[3px] transition-colors hover:text-[var(--color-ruby-deep)] hover:decoration-[var(--color-ruby-deep)]"
        >
          {linkLabel}
        </a>,
      );
    } else if (boldText) {
      out.push(
        <strong
          key={key++}
          className="font-semibold text-[var(--color-fg)]"
        >
          {boldText}
        </strong>,
      );
    }
    lastIndex = match.index + full.length;
  }
  if (lastIndex < text.length) {
    out.push(text.slice(lastIndex));
  }
  return out;
}

function CaseStudyBlock({
  section,
  index,
}: {
  section: CaseStudySection;
  index: number;
}) {
  const num = (index + 1).toString().padStart(2, "0");
  return (
    <section className="border-t border-[var(--color-border-soft)] pt-7 first:border-t-0 first:pt-0">
      <div className="mb-4 flex items-baseline gap-3">
        <span className="font-mono text-[11px] tracking-[0.14em] text-[var(--color-ruby)]">
          {num}
        </span>
        <h2 className="font-sans text-[1.25rem] font-semibold tracking-[-0.02em] text-[var(--color-fg)]">
          {section.heading}
        </h2>
      </div>
      {section.body && section.body.length > 0 && (
        <div className="space-y-4">
          {section.body.map((para, i) => (
            <p
              key={i}
              className="text-[15px] leading-[1.7] text-[var(--color-fg-soft)]"
            >
              {renderInline(para)}
            </p>
          ))}
        </div>
      )}
      {section.bullets && section.bullets.length > 0 && (
        <ul
          className={
            "space-y-2 " + (section.body && section.body.length > 0 ? "mt-4" : "")
          }
        >
          {section.bullets.map((b, i) => (
            <li
              key={i}
              className="relative pl-5 text-[14px] leading-[1.65] text-[var(--color-fg-soft)] before:absolute before:left-0 before:top-[0.7em] before:h-1 before:w-1 before:rounded-full before:bg-[var(--color-ruby)]"
            >
              {renderInline(b)}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function ProjectLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-between gap-2 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-card)] px-3.5 py-2 font-sans text-[12.5px] font-medium text-[var(--color-fg-muted)] transition-all hover:-translate-y-px hover:border-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
    >
      <span>{label}</span>
      <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 17 17 7M7 7h10v10" />
      </svg>
    </a>
  );
}
