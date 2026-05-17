import Image from "next/image";
import Link from "next/link";
import { highlights, type Highlight } from "@/lib/content";

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
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-1.5 font-sans text-[14.5px] font-semibold leading-[1.35] text-[var(--color-fg)]">
          <span className="card-title-draw">{h.title}</span>
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
