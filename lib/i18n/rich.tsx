import type { ReactNode } from "react";

// Tiny markdown-ish renderer for translation strings that need inline
// emphasis. Lets us store entire prose paragraphs as single keys in
// messages.ts (instead of fragmenting them across a dozen tiny keys)
// while preserving the bold / ruby / link visual structure.
//
// Supported syntax:
//   **bold text**            -> <strong class="font-semibold text-fg">
//   __ruby text__            -> <strong class="font-semibold text-ruby-deep">
//   [link text](https://...) -> <a target="_blank" rel="noopener noreferrer">

const TOKEN_RE = /(\*\*[^*]+\*\*|__[^_]+__|\[[^\]]+\]\([^)]+\))/g;

export function renderRich(text: string): ReactNode {
  const parts = text.split(TOKEN_RE);
  return parts.map((part, i) => {
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong
          key={i}
          className="font-semibold text-[var(--color-fg)]"
        >
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("__") && part.endsWith("__")) {
      return (
        <strong
          key={i}
          className="font-semibold text-[var(--color-ruby-deep)]"
        >
          {part.slice(2, -2)}
        </strong>
      );
    }
    const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (linkMatch) {
      // Strip wrapping **...** so `[**Foundry**](url)` renders as a
      // single semibold link instead of leaking literal asterisks.
      const rawLabel = linkMatch[1];
      const label =
        rawLabel.startsWith("**") && rawLabel.endsWith("**")
          ? rawLabel.slice(2, -2)
          : rawLabel;
      // Scheme allowlist: messages.ts only authors http(s) + mailto
      // today, but if anyone (future-Lwin, a Sanity-managed copy
      // import, an LLM that edited the bundle) ever sneaks a
      // `javascript:`, `data:`, or `vbscript:` URL into a rich
      // string, we'd render an XSS sink. Gate it to a known-safe
      // scheme prefix and drop everything else to "#".
      const rawHref = linkMatch[2];
      const safeHref = /^(https?:|mailto:|\/|#)/i.test(rawHref) ? rawHref : "#";
      return (
        <a
          key={i}
          href={safeHref}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[var(--color-fg)] transition-colors hover:text-[var(--color-ruby-deep)]"
        >
          {label}
        </a>
      );
    }
    // Plain text fragment
    return <span key={i}>{part}</span>;
  });
}
