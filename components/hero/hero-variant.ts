// Hero variant types. The switcher used to persist the picked variant
// in localStorage + fan out a CustomEvent so a floating switcher in
// the layout could change the stage in place. That was a temporary
// dev affordance; production picks the variant randomly per visit and
// the inline switcher button (top-right of the stage) lets the visitor
// flip in place without persistence.

export type HeroVariant = "globe" | "terminal";
