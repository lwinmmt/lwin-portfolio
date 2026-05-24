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
  // `md` bumped from h-36 (144px) to h-44 (176px) so portrait
  // subject photos (Inno2, Osiris booth) don't lose head-tops to
  // the default object-cover middle band on landscape crops.
  // `sm` (home highlights) bumped from h-32 to h-56 (224px) to
  // match the Hydroponics project card's framing. That card
  // shows both heads at full size and we want the WCS highlight
  // to read the same way. h-48 was still tight; h-56 gives the
  // portrait subject photo enough room for both faces.
  const heightClass = height === "sm" ? "h-56" : "h-44";
  const bgClass =
    background === "card" ? "bg-[var(--color-bg-card)]" : "bg-[var(--color-bg-warm)]";
  return (
    // `isolation: isolate` + `mask-image` here are the GPU-friendly
    // version of overflow clipping. Without them the scaled <img>
    // briefly painted a 1px dark hairline along the bottom edge during
    // hover (subpixel overshoot past the parent's `overflow:hidden`
    // before the compositor caught up). The mask forces the browser to
    // composite this subtree as one layer that is hard-clipped to its
    // own bounds, which kills the artifact across Webkit/Blink.
    <div
      className={`relative ${heightClass} w-full overflow-hidden ${bgClass} [isolation:isolate] [mask-image:linear-gradient(#000,#000)]`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        // Match the crop default of the two other cover surfaces
        // (projects list and project detail) so the same image is
        // framed identically on the home card, the index card, and
        // the detail cover. Without the object-top fallback,
        // CardCover quietly defaulted to browser "center" and the
        // same project image looked subtly different on every page.
        style={objectPosition ? { objectPosition } : undefined}
        className={`object-cover transition-transform duration-500 [backface-visibility:hidden] [will-change:transform] group-hover:scale-[1.03] ${
          objectPosition ? "" : "object-top"
        }`}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-bg-warm)] via-transparent to-transparent" />
    </div>
  );
}
