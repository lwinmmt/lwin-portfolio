import Image from "next/image";

const SVG_PATH = "/diagrams/esmos-architecture.svg";
const SVG_NATURAL_W = 5237;
const SVG_NATURAL_H = 3248;

// Inline ESMOS architecture diagram. Renders the Eraser-exported SVG
// at full width with a "Raw SVG" link in the caption so curious readers
// can open the file directly in a new tab to zoom or download. The
// click-to-fullscreen modal was removed: react-zoom-pan-pinch never
// gave a reliable fit-to-view first paint, and the inline image is
// already legible at section width on every viewport that matters.
export function ESMOSDiagram() {
  return (
    <figure className="overflow-hidden rounded-2xl border border-[var(--color-border-default)] bg-white">
      <Image
        src={SVG_PATH}
        alt="ESMOS multi-cloud APAC architecture v9.4"
        width={SVG_NATURAL_W}
        height={SVG_NATURAL_H}
        className="block h-auto w-full"
        priority
      />
      <figcaption className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 border-t border-[var(--color-border-soft)] bg-[var(--color-bg-warm)] px-4 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-muted)]">
          Architecture v9.4 · Authored in Eraser
        </span>
        <a
          href={SVG_PATH}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-soft)] transition-colors hover:text-[var(--color-ruby)]"
        >
          Raw SVG
        </a>
      </figcaption>
    </figure>
  );
}
