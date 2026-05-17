import Image from "next/image";

// Logo-or-monogram circle used on every "entity row" surface:
// experience companies, education schools, community orgs,
// activities orgs. Renders the logo image when one is provided;
// otherwise falls back to the entity's initial monogram in a soft
// background. Same border + sizing on both branches so rows stay
// vertically aligned regardless of which branch fires.
//
// Single source of truth for the visual; previously this exact
// pattern was copy-pasted into ExperienceRow, EducationRow,
// CommunityServiceRow, and ActivityCard.

type Size = "sm" | "md";

const SIZE_CLASSES: Record<Size, { wrap: string; img: number; imgClass: string; initial: string }> = {
  sm: {
    wrap: "h-8 w-8",
    img: 32,
    imgClass: "h-6 w-6 object-contain",
    initial: "font-mono text-[10px] font-semibold tracking-[0.04em]",
  },
  md: {
    wrap: "h-11 w-11",
    img: 44,
    imgClass: "h-9 w-9 object-contain",
    initial: "font-mono text-[12px] font-semibold tracking-[0.04em]",
  },
};

export function EntityLogo({
  logoSrc,
  initial,
  name,
  size = "md",
  className = "",
}: {
  logoSrc?: string;
  initial: string;
  /** Entity name. Only used for the image alt text. */
  name: string;
  size?: Size;
  className?: string;
}) {
  const s = SIZE_CLASSES[size];
  const wrapClass = `flex flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--color-border-default)] ${s.wrap} ${className}`;

  if (logoSrc) {
    return (
      <div className={`${wrapClass} bg-white`}>
        <Image
          src={logoSrc}
          // Drop the "logo" suffix: the alt becomes just the entity
          // name. Screen readers already announce "image" for an
          // <img>, so "AWS logo" became "image: AWS logo" — the noun
          // duplicates context that's redundant.
          alt={name}
          width={s.img}
          height={s.img}
          className={s.imgClass}
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`${wrapClass} bg-[var(--color-bg-warm)] text-[var(--color-fg)] ${s.initial}`}
    >
      {initial}
    </div>
  );
}
