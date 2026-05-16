// "Now" widget content. Surfaces below the hero's current-role chip.
// The updatedAt timestamp keeps the card honest. Bump it when you update
// the entry; otherwise the staleness is visible to the visitor.

export type NowEntry = {
  /** What kind of activity the entry represents. Drives a small label
   *  prefix and the eyebrow color. */
  type: "shipping" | "reading" | "learning";
  /** Short label. Renders bold. */
  label: string;
  /** Optional one-line detail. Renders muted. */
  detail?: string;
  /** Optional external link. */
  href?: string;
  /** Human-readable last-update date, e.g. "16 May 2026". */
  updatedAt: string;
};

export const now: NowEntry = {
  type: "learning",
  label: "Production IIoT failure modes on EdgeX Foundry",
  detail:
    "At VNTT in Ho Chi Minh City. Trying to internalize how industrial sensor stacks fail in the field, not in the demo.",
  updatedAt: "16 May 2026",
};
