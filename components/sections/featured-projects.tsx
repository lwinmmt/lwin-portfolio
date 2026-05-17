import Image from "next/image";
import Link from "next/link";
import { featuredProjects, type Project } from "@/lib/content";
import { getLocale, getT } from "@/lib/i18n/server";
import { pickLocalized } from "@/lib/i18n/content";
import type { Locale } from "@/lib/i18n/types";

export async function FeaturedProjects() {
  const t = await getT();
  const locale = await getLocale();
  return (
    <section className="mt-14">
      <div className="mb-5 flex items-end justify-between border-b border-[var(--color-border-default)] pb-3">
        <h2 className="font-sans text-[1.375rem] font-semibold tracking-[-0.02em] text-[var(--color-fg)]">
          {t("featuredProjects.title")}
        </h2>
        <Link
          href="/projects"
          className="text-[12.5px] font-medium text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-ruby)]"
        >
          {t("featuredProjects.viewAll")}
        </Link>
      </div>
      <div className="grid gap-3.5 sm:grid-cols-2">
        {featuredProjects.map((project, idx) => (
          <ProjectCard
            key={project.slug}
            project={project}
            priority={idx < 2}
            locale={locale}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  priority,
  locale,
}: {
  project: Project;
  priority?: boolean;
  locale: Locale;
}) {
  const title = pickLocalized(project.title, project.titleVi, locale);
  const description = pickLocalized(
    project.description,
    project.descriptionVi,
    locale,
  );
  const course = project.course
    ? pickLocalized(project.course, project.courseVi, locale)
    : undefined;
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="beam-card group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-warm)] transition-all duration-300 hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)]"
    >
      {project.imageSrc && (
        <div className="relative h-36 w-full overflow-hidden bg-[var(--color-bg-warm)]">
          <Image
            src={project.imageSrc}
            alt={`${title} cover`}
            fill
            // First two cards are above the fold on desktop. Eager-load so
            // the dark-mode empty bg doesn't read as a broken card before
            // the optimizer streams the image in.
            priority={priority}
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-bg-warm)] via-transparent to-transparent" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        {course && (
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-faint)]">
            {course}
          </div>
        )}
        <h3 className="mb-1.5 font-sans text-[14.5px] font-semibold leading-[1.35] text-[var(--color-fg)]">
          <span className="card-title-draw">{title}</span>
        </h3>
        <p className="mb-3 text-[12.5px] leading-[1.5] text-[var(--color-fg-muted)]">
          {description}
        </p>
        {project.tags && project.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--color-border-default)] px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.08em] text-[var(--color-fg-muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="mt-auto pt-2 font-mono text-[10.5px] tracking-[0.06em] text-[var(--color-fg-faint)]">
          {project.dates}
        </div>
      </div>
    </Link>
  );
}
