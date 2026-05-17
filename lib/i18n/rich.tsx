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
      return (
        <a
          key={i}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[var(--color-fg)] transition-colors hover:text-[var(--color-ruby-deep)]"
        >
          {linkMatch[1]}
        </a>
      );
    }
    // Plain text fragment
    return <span key={i}>{part}</span>;
  });
}
