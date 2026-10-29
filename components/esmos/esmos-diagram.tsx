import Image from "next/image";
import { getT } from "@/lib/i18n/server";

const SVG_PATH = "/diagrams/esmos-architecture.svg";
const SVG_NATURAL_W = 5237;
const SVG_NATURAL_H = 3248;

// Inline ESMOS architecture diagram. Renders the Eraser-exported SVG
// as an overview, with a full-size link for reading its detail in a
// new tab. The original SVG remains available for zooming or download.
//
// Async server component: reads i18n via getT() so caption + link
// labels follow the request locale.
export async function ESMOSDiagram() {
  const t = getT();
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
          {t("esmos.diagram.caption")}
        </span>
        <a
          href={SVG_PATH}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-soft)] transition-colors hover:text-[var(--color-ruby)]"
        >
          {t("esmos.diagram.rawSvg")}
        </a>
      </figcaption>
    </figure>
  );
}
