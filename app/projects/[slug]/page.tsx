import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ESMOSDiagram } from "@/components/esmos/esmos-diagram";
import { ProjectBreadcrumbsJsonLd } from "@/components/structured-data";
import { LightboxGroup, type LightboxImage } from "@/components/ui/lightbox";
import {
  projects,
  type Project,
  type ProjectLiveLink,
  type CaseStudySection,
} from "@/lib/content";

type Params = { slug: string };

function allLiveLinks(p: Project): ProjectLiveLink[] {
  if (p.liveLinks && p.liveLinks.length > 0) return p.liveLinks;
  if (p.liveLink) return [{ url: p.liveLink, label: "Live site" }];
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

  const related = projects
    .filter((p) => p.slug !== project.slug && p.category === project.category)
    .slice(0, 2);

  const liveLinks = allLiveLinks(project);
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
        <span aria-hidden="true">&larr;</span> All projects
      </Link>

      <header className="mt-6">
        {project.course && (
          <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-fg-faint)]">
            {project.course}
          </div>
        )}
        <h1 className="mt-2 font-sans text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.02] tracking-[-0.035em] text-[var(--color-fg)]">
          {project.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[11px] tracking-[0.04em] text-[var(--color-fg-muted)]">
          <span className="text-[var(--color-ruby)]">{project.category}</span>
          <span className="text-[var(--color-fg-faint)]">&middot;</span>
          <span>{project.dates}</span>
        </div>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_240px]">
        <div>
          {(() => {
            const lightboxImages: LightboxImage[] = [
              ...(project.imageSrc
                ? [{ src: project.imageSrc, alt: `${project.title} cover` }]
                : []),
              ...(project.gallery ?? []).map((src, idx) => ({
                src,
                alt: `${project.title}, photo ${idx + 1}`,
              })),
            ];
            if (lightboxImages.length === 0) return null;
            const galleryStart = project.imageSrc ? 1 : 0;
            return (
              <LightboxGroup images={lightboxImages}>
                {(open) => (
                  <>
                    {project.imageSrc && (
                      <button
                        type="button"
                        onClick={() => open(0)}
                        aria-label={`Open ${project.title} cover image full size`}
                        className="group relative mb-8 block aspect-[16/9] w-full cursor-zoom-in overflow-hidden rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-bg-warm)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-ruby)]"
                      >
                        <Image
                          src={project.imageSrc}
                          alt={`${project.title} cover`}
                          fill
                          priority
                          sizes="(max-width: 860px) 100vw, 720px"
                          // Top-biased crop. Project covers are either people photos
                          // (faces in upper third) or dashboard screenshots (headers
                          // up top). Either way, biasing the crop upward keeps the
                          // most informative pixels in shot across card sizes.
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                        <span
                          aria-hidden="true"
                          className="absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100"
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                          </svg>
                        </span>
                      </button>
                    )}

                    {/* Optional supporting gallery. Dashboard comes first via the
                        cover; team/process shots follow as a 3-up grid. */}
                    {project.gallery && project.gallery.length > 0 && (
                      <div className="mb-8 grid grid-cols-3 gap-2">
                        {project.gallery.map((src, idx) => (
                          <button
                            key={src}
                            type="button"
                            onClick={() => open(galleryStart + idx)}
                            aria-label={`Open ${project.title} photo ${idx + 1} full size`}
                            className="group relative aspect-[4/3] cursor-zoom-in overflow-hidden rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-bg-warm)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-ruby)]"
                          >
                            <Image
                              src={src}
                              alt={`${project.title}, photo ${idx + 1}`}
                              fill
                              sizes="(max-width: 860px) 33vw, 220px"
                              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                            />
                            <span
                              aria-hidden="true"
                              className="absolute right-2 top-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100"
                            >
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                              </svg>
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </LightboxGroup>
            );
          })()}

          <p className="text-[1.0625rem] leading-[1.7] text-[var(--color-fg-soft)]">
            {project.description}
          </p>

          {/* ESMOS architecture diagram, click for full size */}
          {project.diagramType === "esmos" && (
            <div className="mt-10">
              <div className="mb-3 flex items-baseline justify-between">
                <h2 className="font-sans text-[1.25rem] font-semibold tracking-[-0.02em] text-[var(--color-fg)]">
                  Architecture diagram
                </h2>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-faint)]">
                  Click to expand
                </span>
              </div>
              <ESMOSDiagram />
            </div>
          )}

          {project.caseStudy && project.caseStudy.length > 0 ? (
            <div className="mt-12 flex flex-col gap-10">
              {project.caseStudy.map((section, idx) => (
                <CaseStudyBlock key={section.heading} section={section} index={idx} />
              ))}
            </div>
          ) : (
            <section className="mt-12 rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-warm)] p-6">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ruby)]">
                Coming soon
              </div>
              <h3 className="mb-2 font-sans text-[16px] font-semibold text-[var(--color-fg)]">
                Full case study in progress
              </h3>
              <p className="text-[13px] leading-[1.6] text-[var(--color-fg-muted)]">
                Context, role, architecture, implementation highlights,
                outcomes, and reflections will land here as I expand each
                project. For ESMOS, the interactive multi-cloud architecture
                diagram will be embedded inline.
              </p>
            </section>
          )}

          {related.length > 0 && (
            <section className="mt-12">
              <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-faint)]">
                Related in {project.category}
              </h3>
              <ul className="grid gap-3.5 sm:grid-cols-2">
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/projects/${p.slug}`}
                      className="block rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-warm)] p-4 transition-colors hover:border-[var(--color-border-default)]"
                    >
                      <div className="font-sans text-[13.5px] font-semibold text-[var(--color-fg)]">
                        {p.title}
                      </div>
                      <div className="mt-1 font-mono text-[10.5px] tracking-[0.04em] text-[var(--color-fg-faint)]">
                        {p.dates}
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
                Stack
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
                Links
              </h3>
              <div className="flex flex-col gap-1.5">
                {liveLinks.map((l) => (
                  <ProjectLink key={l.url} href={l.url} label={l.label} />
                ))}
                {project.repoLink && (
                  <ProjectLink href={project.repoLink} label="GitHub" />
                )}
                {project.videoLink && (
                  <ProjectLink href={project.videoLink} label="Video" />
                )}
                {project.slidesLink && (
                  <ProjectLink href={project.slidesLink} label="Slides" />
                )}
                {project.pdfLink && (
                  <ProjectLink href={project.pdfLink} label="PDF / Report" />
                )}
                {project.newsLink && (
                  <ProjectLink href={project.newsLink} label="Press" />
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
