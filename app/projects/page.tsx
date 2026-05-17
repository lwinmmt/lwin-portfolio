"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import {
  projects,
  type Project,
  type ProjectCategory,
  type ProjectLiveLink,
} from "@/lib/content";
import { useT } from "@/lib/i18n/client";
import type { MessageKey } from "@/lib/i18n/messages";

// Map category enum -> display translation key. Enum stays English; the
// label users see comes from t().
const CATEGORY_LABEL_KEY: Record<ProjectCategory, MessageKey> = {
  Production: "projects.category.Production",
  Coursework: "projects.category.Coursework",
  Projects: "projects.category.Projects",
};

// Page-level metadata is set via the route segment's metadata.ts where
// possible, but since this is a client component we let the layout's
// title template handle the tab title.

const CATEGORY_ORDER: ProjectCategory[] = [
  "Production",
  "Coursework",
  "Projects",
];

// Visual accent dot beside each section heading. Matches the tag color
// vocabulary so the page categorization reads as a system, not three
// arbitrary headings.
const CATEGORY_ACCENT: Record<ProjectCategory, string> = {
  Production: "bg-[var(--tag-work)]",
  Coursework: "bg-[var(--tag-school)]",
  Projects: "bg-[var(--tag-award)]",
};

// Count of attached proof artifacts. Used as a small paperclip indicator
// in the card footer so cards without uploads do not look empty.
function attachmentCount(p: Project): number {
  return [p.slidesLink, p.pdfLink, p.videoLink, p.repoLink].filter(Boolean)
    .length;
}

function categoryToAnchor(category: ProjectCategory) {
  return category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function allLiveLinks(p: Project): ProjectLiveLink[] {
  if (p.liveLinks && p.liveLinks.length > 0) return p.liveLinks;
  if (p.liveLink) return [{ url: p.liveLink, label: "Live" }];
  return [];
}

export default function ProjectsPage() {
  const t = useT();
  const [filter, setFilter] = useState<ProjectCategory | null>(null);

  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    items: projects.filter((p) => p.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <DashboardShell>
      <header>
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-fg-muted)]">
          {t("projects.eyebrow")}
        </div>
        <h1 className="mt-3 font-sans text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[0.96] tracking-[-0.04em] text-[var(--color-fg)]">
          {t("projects.title")}<span className="text-[var(--color-ruby)]">.</span>
        </h1>
        <p className="mt-5 max-w-[640px] text-[1rem] leading-[1.6] text-[var(--color-fg-muted)]">
          {t("projects.description")}
        </p>

        {/* Filter tabs. Click to show only that category. Click "All" or the active chip to reset. */}
        <div className="mt-7 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFilter(null)}
            className={
              "tag-chip cursor-pointer " +
              (filter === null ? "tag-chip-active" : "")
            }
            aria-pressed={filter === null}
          >
            {t("projects.filter.all")} <span className="text-[var(--color-fg-faint)]">/ {projects.length}</span>
          </button>
          {grouped.map((g) => {
            const isActive = filter === g.category;
            return (
              <button
                key={g.category}
                type="button"
                onClick={() => setFilter(isActive ? null : g.category)}
                className={
                  "tag-chip cursor-pointer " + (isActive ? "tag-chip-active" : "")
                }
                aria-pressed={isActive}
              >
                {t(CATEGORY_LABEL_KEY[g.category])}{" "}
                <span className="text-[var(--color-fg-faint)]">/ {g.items.length}</span>
              </button>
            );
          })}
        </div>
      </header>

      <AnimatePresence mode="popLayout">
        {grouped.map(({ category, items }) => {
          const hidden = filter !== null && filter !== category;
          if (hidden) return null;
          return (
            <motion.section
              key={category}
              id={categoryToAnchor(category)}
              className="mt-14 scroll-mt-20"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.4, ease: [0.2, 0.7, 0.3, 1] }}
            >
              {/* Editorial section header: small mono eyebrow + large bold title. */}
              <div className="mb-5 flex items-end justify-between border-b border-[var(--color-border-default)] pb-3">
                <div>
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-fg-faint)]">
                    <span
                      aria-hidden="true"
                      className={`h-1.5 w-1.5 rounded-full ${CATEGORY_ACCENT[category]}`}
                    />
                    {t("projects.section.categoryLabel")}
                  </div>
                  <h2 className="mt-1 font-sans text-[1.5rem] font-bold tracking-[-0.025em] text-[var(--color-fg)] sm:text-[1.75rem]">
                    {t(CATEGORY_LABEL_KEY[category])}
                  </h2>
                </div>
                <div className="font-mono text-[11px] tracking-[0.04em] text-[var(--color-fg-faint)]">
                  {(items.length === 1
                    ? t("projects.count.one")
                    : t("projects.count.many")
                  ).replace("{n}", String(items.length))}
                </div>
              </div>
              {/* Staggered grid entrance so cards bloom in rather than pop.
                  Default items-stretch (no override) so cards in the same
                  row match the tallest sibling. Cards with images and cards
                  without should still align flush at top and bottom. */}
              <motion.div
                className="grid gap-3.5 sm:grid-cols-2"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.06 } },
                }}
              >
                {items.map((project, i) => (
                  <motion.div
                    key={project.slug}
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.45,
                          ease: [0.2, 0.7, 0.3, 1],
                        },
                      },
                    }}
                    // flex flex-col h-full so framer-motion's inline style
                    // does not collapse the wrapper height. With this the
                    // grid item stretches to the tallest sibling and the
                    // ProjectCard's own h-full has a definite parent to
                    // resolve against.
                    className={
                      "flex h-full flex-col" +
                      (category === "Production" && i === 0
                        ? " sm:col-span-2"
                        : "")
                    }
                  >
                    <ProjectCard
                      project={project}
                      featured={category === "Production" && i === 0}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          );
        })}
      </AnimatePresence>
    </DashboardShell>
  );
}

function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const liveLinks = allLiveLinks(project);
  const attachments = attachmentCount(project);
  // One canonical card treatment regardless of category. The beam-card
  // rotating border + lift-card hover are universal. Featured cards span
  // both columns and get a taller image banner so the most important
  // project in the category anchors the page visually.
  // col-span on featured is applied to the motion wrapper now; this card
  // class just controls the inner card chrome.
  const cardClass =
    "beam-card lift-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-warm)]";
  const imgHeight = featured ? "h-52" : "h-36";

  return (
    <article className={cardClass}>
      {project.imageSrc && (
        <div className={`relative ${imgHeight} w-full overflow-hidden bg-[var(--color-bg-warm)]`}>
          <Image
            src={project.imageSrc}
            alt={`${project.title} cover`}
            fill
            // Featured cards are above the fold and need to paint before
            // lazy-load kicks in: otherwise the empty wrapper reads as a
            // broken card on dark mode. Below-fold non-featured cards
            // stay lazy.
            priority={featured}
            sizes={
              featured
                ? "(max-width: 640px) 100vw, 860px"
                : "(max-width: 640px) 100vw, 50vw"
            }
            // Top-biased crop. People photos: faces are in upper third.
            // Dashboard screenshots: headers up top. Either way the top
            // is the most informative slice.
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-bg-warm)] via-[var(--color-bg-warm)]/0 to-transparent" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        {project.course && (
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-faint)]">
            {project.course}
          </div>
        )}
        <Link
          href={`/projects/${project.slug}`}
          className="font-sans text-[15px] font-semibold leading-[1.35] text-[var(--color-fg)] transition-colors after:absolute after:inset-0 after:content-[''] hover:text-[var(--color-ruby-deep)] focus-visible:after:rounded-2xl focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-[var(--color-ruby)]"
        >
          <span className="card-title-draw">{project.title}</span>
        </Link>
        <p className="mt-2 text-[12.5px] leading-[1.55] text-[var(--color-fg-muted)]">
          {project.description}
        </p>
        {project.tags && project.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--color-border-default)] px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.08em] text-[var(--color-fg-muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="relative z-10 mt-auto flex items-center justify-between gap-3 pt-4">
          <div className="flex items-center gap-2 font-mono text-[10.5px] tracking-[0.06em] text-[var(--color-fg-faint)]">
            <span>{project.dates}</span>
            {attachments > 0 && (
              <span
                className="inline-flex items-center gap-0.5"
                aria-label={`${attachments} attachments`}
              >
                <PaperclipIcon />
                {attachments}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            {liveLinks.map((l) => (
              <PrimaryChip key={l.url} href={l.url} label={l.label} />
            ))}
            {project.repoLink && (
              <PrimaryChip href={project.repoLink} label="Code" />
            )}
            {project.videoLink && (
              <IconChip
                href={project.videoLink}
                label="Video"
                icon={<PlayIcon />}
              />
            )}
            {project.slidesLink && (
              <IconChip
                href={project.slidesLink}
                label="Slides"
                icon={<SlidesIcon />}
              />
            )}
            {project.pdfLink && (
              <IconChip
                href={project.pdfLink}
                label="PDF"
                icon={<DocumentIcon />}
              />
            )}
            {project.newsLink && (
              <IconChip
                href={project.newsLink}
                label="Press"
                icon={<NewspaperIcon />}
              />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function PrimaryChip({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-full border border-[var(--color-border-default)] bg-[var(--color-bg-card)] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
    >
      {label}
    </a>
  );
}

function IconChip({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <span className="group relative inline-flex">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="flex h-6 w-6 items-center justify-center rounded-full border border-[var(--color-border-default)] bg-[var(--color-bg-card)] text-[var(--color-fg-faint)] transition-colors hover:border-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
      >
        {icon}
      </a>
      <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-[var(--color-fg)] px-2 py-1 font-mono text-[9.5px] uppercase tracking-[0.08em] text-[var(--color-bg)] opacity-0 transition-opacity duration-150 group-hover:opacity-100">
        {label}
      </span>
    </span>
  );
}

const svgProps = {
  width: 10,
  height: 10,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false as const,
};

function PlayIcon() {
  return (
    <svg {...svgProps}>
      <polygon points="6 4 20 12 6 20 6 4" />
    </svg>
  );
}
function SlidesIcon() {
  return (
    <svg {...svgProps}>
      <rect x="3" y="5" width="18" height="13" rx="1.5" />
      <path d="M7 9h10M7 13h6" />
    </svg>
  );
}
function DocumentIcon() {
  return (
    <svg {...svgProps}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}
function NewspaperIcon() {
  return (
    <svg {...svgProps}>
      <path d="M4 4h14v16H4z" />
      <path d="M8 8h6M8 12h6M8 16h4" />
    </svg>
  );
}
function PaperclipIcon() {
  return (
    <svg {...svgProps} width={9} height={9}>
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}
