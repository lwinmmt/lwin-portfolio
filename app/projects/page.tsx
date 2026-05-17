"use client";

// Edge runtime for the SSR bootstrap of this client page. The
// interactive parts run in the browser as usual; the server-side
// initial render that hydration matches against runs at edge.
export const runtime = "edge";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, m as motion } from "framer-motion";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import {
  projects,
  type Project,
  type ProjectCategory,
} from "@/lib/content";
import { useLocale, useT } from "@/lib/i18n/client";
import type { MessageKey } from "@/lib/i18n/messages";
import { pickLocalized } from "@/lib/i18n/content";
import { formatDates } from "@/lib/i18n/dates";

// Map category enum -> display translation key. Enum stays English; the
// label users see comes from t().
const CATEGORY_LABEL_KEY: Record<ProjectCategory, MessageKey> = {
  Projects: "projects.category.Projects",
  Coursework: "projects.category.Coursework",
};

// Page-level metadata is set via the route segment's metadata.ts where
// possible, but since this is a client component we let the layout's
// title template handle the tab title.

const CATEGORY_ORDER: ProjectCategory[] = ["Projects", "Coursework"];

// Module-scope variants so framer-motion doesn't see a fresh object
// reference on every parent render (filter click re-renders the
// whole tree). Same pattern Reveal + KineticQuote use.
const REVEAL_EASE = [0.2, 0.7, 0.3, 1] as const;
const GRID_VARIANTS = {
  visible: { transition: { staggerChildren: 0.06 } },
};
const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: REVEAL_EASE },
  },
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


// Pre-grouped projects by category. Computed once at module load —
// `projects` is a static import, never mutates. Previously this lived
// inside ProjectsPage's render body, which meant a fresh array (with
// fresh nested arrays) on every keystroke / filter click, defeating
// AnimatePresence's child identity check and forcing it to remount
// every group even when only `filter` changed.
const GROUPED = CATEGORY_ORDER.map((cat) => ({
  category: cat,
  items: projects.filter((p) => p.category === cat),
})).filter((g) => g.items.length > 0);

export default function ProjectsPage() {
  const t = useT();
  const [filter, setFilter] = useState<ProjectCategory | null>(null);
  const grouped = GROUPED;

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
        <div
          className="mt-7 flex flex-wrap gap-2"
          role="group"
          aria-label={t("projects.filter.all")}
        >
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

      {/* Defensive empty state. Today the filter chips only surface
          categories that have entries, so this code path is
          theoretically unreachable — but if a future filter (or a
          search) ever returns zero matches, the page no longer ends
          on a row of chips with empty space below. */}
      {(() => {
        const visibleCount = grouped.filter(
          (g) => filter === null || filter === g.category,
        ).length;
        if (visibleCount > 0) return null;
        return (
          <div className="mt-14 rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-warm)] p-8 text-center">
            <p className="font-sans text-[14px] text-[var(--color-fg-muted)]">
              {t("projects.empty")}
            </p>
          </div>
        );
      })()}

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
              {/* Section header: just the category title. The accent
                  dot and "Category" eyebrow are gone; the bold heading
                  carries the meaning by itself. */}
              <div className="mb-5 flex items-end justify-between border-b border-[var(--color-border-default)] pb-3">
                <h2 className="font-sans text-[1.5rem] font-bold tracking-[-0.025em] text-[var(--color-fg)] sm:text-[1.75rem]">
                  {t(CATEGORY_LABEL_KEY[category])}
                </h2>
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
                variants={GRID_VARIANTS}
              >
                {items.map((project, i) => (
                  <motion.div
                    key={project.slug}
                    variants={CARD_VARIANTS}
                    // flex flex-col h-full so framer-motion's inline style
                    // does not collapse the wrapper height. With this the
                    // grid item stretches to the tallest sibling and the
                    // ProjectCard's own h-full has a definite parent to
                    // resolve against.
                    className={
                      "flex h-full flex-col" +
                      (category === "Projects" && i === 0
                        ? " sm:col-span-2"
                        : "")
                    }
                  >
                    <ProjectCard
                      project={project}
                      featured={category === "Projects" && i === 0}
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
  const locale = useLocale();
  const t = useT();
  const attachments = attachmentCount(project);
  const title = pickLocalized(project.title, project.titleVi, locale);
  const description = pickLocalized(
    project.description,
    project.descriptionVi,
    locale,
  );
  const course = project.course
    ? pickLocalized(project.course, project.courseVi, locale)
    : undefined;
  // One canonical card treatment regardless of category. lift-card
  // handles the hover lift + shadow + border colour shift using
  // translateZ(0) so it does not subpixel-jitter on retina. The old
  // beam-card rotating ruby ring was removed — the user found it
  // visually noisy and the Highlights cards (no beam) read cleaner.
  // Featured cards span both columns and get a taller image banner.
  const cardClass =
    "lift-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-warm)]";
  // Non-featured h-36 (144px) was clipping portrait subject heads on
  // top-biased crops; h-44 (176px) gives the cover photo enough
  // vertical room without making non-featured cards look like
  // mini-features.
  const imgHeight = featured ? "h-52" : "h-44";

  return (
    <article className={cardClass}>
      {project.imageSrc && (
        // isolation + mask-image: see CardCover for the rationale.
        // Kills the 1px hairline that flashed along the bottom edge
        // when the scaled image briefly overshot overflow:hidden
        // during the hover transition.
        <div className={`relative ${imgHeight} w-full overflow-hidden bg-[var(--color-bg-warm)] [isolation:isolate] [mask-image:linear-gradient(#000,#000)]`}>
          <Image
            src={project.imageSrc}
            alt={t("image.alt.cover").replace("{title}", title)}
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
            // Top-biased crop by default. Projects with `coverFocus`
            // override get an explicit object-position so portrait
            // photos with off-center subjects stay in frame.
            style={
              project.coverFocus ? { objectPosition: project.coverFocus } : undefined
            }
            className={`object-cover transition-transform duration-500 [backface-visibility:hidden] [will-change:transform] group-hover:scale-[1.03] ${
              project.coverFocus ? "" : "object-top"
            }`}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-bg-warm)] via-[var(--color-bg-warm)]/0 to-transparent" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        {course && (
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-faint)]">
            {course}
          </div>
        )}
        <h3 className="font-sans text-[15px] font-semibold leading-[1.35] text-[var(--color-fg)]">
          <Link
            href={`/projects/${project.slug}`}
            className="transition-colors after:absolute after:inset-0 after:content-[''] hover:text-[var(--color-ruby-deep)] focus-visible:after:rounded-2xl focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-[var(--color-ruby)]"
          >
            <span className="card-title-draw">{title}</span>
          </Link>
        </h3>
        <p className="mt-2 text-[12.5px] leading-[1.55] text-[var(--color-fg-muted)]">
          {description}
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
        {/* Card footer: dates + attachment count only. Live / repo /
            press / video / slides / PDF chips are NOT rendered here.
            Clicking the card takes the user to the detail page which
            surfaces all of those, so duplicating them here just clutters
            the card. */}
        <div className="relative z-10 mt-auto flex items-center gap-2 pt-4 font-mono text-[10.5px] tracking-[0.06em] text-[var(--color-fg-faint)]">
          <span>{formatDates(project.dates, locale)}</span>
          {attachments > 0 && (
            <span
              className="inline-flex items-center gap-0.5"
              aria-label={t("projects.aria.attachments").replace("{n}", String(attachments))}
            >
              <PaperclipIcon />
              {attachments}
            </span>
          )}
        </div>
      </div>
    </article>
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

function PaperclipIcon() {
  return (
    <svg {...svgProps} width={9} height={9}>
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}
