import Image from "next/image";
import Link from "next/link";
import { highlights, type Highlight, type HighlightTag } from "@/lib/content";

const TAG_ACCENT: Record<HighlightTag, string> = {
  Work: "text-[var(--tag-work)]",
  Talk: "text-[var(--tag-talk)]",
  Award: "text-[var(--tag-award)]",
  Press: "text-[var(--tag-press)]",
  School: "text-[var(--tag-school)]",
};

function HighlightIcon({ name }: { name: Highlight["icon"] }) {
  const common = { fill: "none" as const, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "grid":
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" {...common}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 12h18M12 3v18" />
        </svg>
      );
    case "globe":
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M2 12h20M12 2c2.5 3 4 7 4 10s-1.5 7-4 10c-2.5-3-4-7-4-10s1.5-7 4-10" />
        </svg>
      );
    case "trophy":
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" {...common}>
          <circle cx="12" cy="8" r="5" />
          <path d="M9 13l-1 8 4-3 4 3-1-8" />
        </svg>
      );
    case "camera":
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" {...common}>
          <rect x="3" y="6" width="18" height="13" rx="2" />
          <circle cx="12" cy="12.5" r="3" />
          <path d="M3 6l3-3h12l3 3" />
        </svg>
      );
    case "book":
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" {...common}>
          <path d="M4 4h12a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4V4z" />
          <path d="M4 16a4 4 0 0 1 4-4h12" />
        </svg>
      );
  }
}

export function Highlights() {
  return (
    <section className="mt-14">
      <div className="mb-5 flex items-end justify-between border-b border-[var(--color-border-default)] pb-3">
        <h2 className="font-sans text-[1.375rem] font-semibold tracking-[-0.02em] text-[var(--color-fg)]">
          Recent Highlights
        </h2>
        <Link
          href="/highlights"
          className="text-[12.5px] font-medium text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-ruby)]"
        >
          View all
        </Link>
      </div>
      <div className="grid gap-3.5 sm:grid-cols-2">
        {highlights.slice(0, 4).map((h) => (
          <HighlightCard key={h.title} {...h} />
        ))}
      </div>
    </section>
  );
}

function HighlightCard(h: Highlight) {
  const inner = (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-warm)] transition-all duration-300 hover:-translate-y-px hover:border-[var(--color-border-default)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)]">
      {h.imageSrc && (
        <div className="relative h-32 w-full overflow-hidden bg-[var(--color-bg-card)]">
          <Image
            src={h.imageSrc}
            alt={h.title}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-bg-warm)] via-transparent to-transparent" />
          {/* Icon badge removed from image cards; the text tag (Work / Talk /
              Press / Award) next to the title already signals category. The
              icon remains on text-only cards below as the only visual anchor. */}
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        {!h.imageSrc && (
          <div className="mb-3.5 flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-card)] text-[var(--color-fg)]">
            <HighlightIcon name={h.icon} />
          </div>
        )}
        <h3 className="mb-1.5 font-sans text-[14.5px] font-semibold leading-[1.35] text-[var(--color-fg)]">
          {h.title}{" "}
          <span className={`ml-1 font-mono text-[9.5px] uppercase tracking-[0.14em] ${TAG_ACCENT[h.tag]}`}>
            {h.tag}
          </span>
        </h3>
        <p className="mb-3 text-[12.5px] leading-[1.5] text-[var(--color-fg-muted)]">
          {h.description}
        </p>
        <div className="mt-auto font-mono text-[10.5px] tracking-[0.06em] text-[var(--color-fg-faint)]">
          {h.date}
        </div>
      </div>
    </div>
  );

  if (!h.href) return inner;

  const isInternal = h.href.startsWith("/");
  if (isInternal) {
    return (
      <Link href={h.href} className="block h-full">
        {inner}
      </Link>
    );
  }
  return (
    <a href={h.href} target="_blank" rel="noopener noreferrer" className="block h-full">
      {inner}
    </a>
  );
}
