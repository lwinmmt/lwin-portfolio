import Image from "next/image";

// Card cover image block used by the home featured-projects and
// highlights cards. Same Image-fill + gradient-fade-to-bg pattern
// in both places; extracting it removes ~12 lines of duplication
// per card and gives a single place to tune the hover scale and
// the gradient stop.
//
// The two existing consumers use slightly different heights
// (h-36 vs h-32) and one uses a slightly darker bg-card behind the
// image. Both differences flow through props.

export function CardCover({
  src,
  alt,
  height = "md",
  background = "warm",
  priority = false,
  sizes = "(max-width: 640px) 100vw, 50vw",
  objectPosition,
}: {
  src: string;
  alt: string;
  height?: "sm" | "md";
  background?: "warm" | "card";
  priority?: boolean;
  sizes?: string;
  /** Optional CSS `object-position` value. Default "center" works for
   *  landscape cover photos; pass an override (e.g. "30% 22%") when
   *  the source is portrait and the subject lives off-center. */
  objectPosition?: string;
}) {
  const heightClass = height === "sm" ? "h-32" : "h-36";
  const bgClass =
    background === "card" ? "bg-[var(--color-bg-card)]" : "bg-[var(--color-bg-warm)]";
  return (
    <div className={`relative ${heightClass} w-full overflow-hidden ${bgClass}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        style={objectPosition ? { objectPosition } : undefined}
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-bg-warm)] via-transparent to-transparent" />
    </div>
  );
}
