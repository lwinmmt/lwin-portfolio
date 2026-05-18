// Inline SVG icons matched to the Lucide vocabulary, sized for the sidebar.
// Pure render function — no hooks, no event handlers, no browser APIs.
// Marking it "use client" forced it into the client bundle for no reason;
// dropped so this component can render on the server.
type Props = { name: string; className?: string };

export function SidebarIcon({ name, className = "h-[15px] w-[15px]" }: Props) {
  const stroke = "currentColor";
  const sw = 1.6;
  // Icons here are purely decorative. The accessible name comes from the
  // adjacent text label in nav rows.
  const common = {
    fill: "none",
    stroke,
    strokeWidth: sw,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false,
  };

  switch (name) {
    case "home":
      return (
        <svg className={className} viewBox="0 0 24 24" {...common}>
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-7H10v7H4a1 1 0 0 1-1-1V9.5z" />
        </svg>
      );
    case "user":
      return (
        <svg className={className} viewBox="0 0 24 24" {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
      );
    case "code":
      // Folder icon. The "code" case key is retained for backwards
      // compat with lib/content/nav.ts; the previous chevron-brackets
      // `< >` glyph read as "view source" rather than "portfolio of
      // work". The folder shape reads as a collection of projects at
      // a glance and aligns better with the User / Home / Resume
      // metaphors in the rest of the nav.
      return (
        <svg className={className} viewBox="0 0 24 24" {...common}>
          <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
        </svg>
      );
    case "pen":
      return (
        <svg className={className} viewBox="0 0 24 24" {...common}>
          <path d="M12 20l4-16M6 16l-4-4 4-4M18 8l4 4-4 4" />
        </svg>
      );
    case "laptop":
      return (
        <svg className={className} viewBox="0 0 24 24" {...common}>
          <rect x="3" y="4" width="18" height="14" rx="2" />
          <path d="M8 20h8" />
        </svg>
      );
    case "medal":
      return (
        <svg className={className} viewBox="0 0 24 24" {...common}>
          <circle cx="12" cy="8" r="5" />
          <path d="M9 13l-1 8 4-3 4 3-1-8" />
        </svg>
      );
    case "file":
      return (
        <svg className={className} viewBox="0 0 24 24" {...common}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="9" y1="13" x2="15" y2="13" />
          <line x1="9" y1="17" x2="15" y2="17" />
        </svg>
      );
    case "mail":
      return (
        <svg className={className} viewBox="0 0 24 24" {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <polyline points="3 7 12 13 21 7" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg className={className} viewBox="0 0 24 24" {...common}>
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      );
    case "github":
      return (
        <svg className={className} viewBox="0 0 24 24" {...common}>
          <path d="M9 19c-4 1.5-4-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className={className} viewBox="0 0 24 24" {...common}>
          <rect x="2" y="2" width="20" height="20" rx="2" />
          <line x1="8" y1="11" x2="8" y2="17" />
          <circle cx="8" cy="7" r="1" />
          <path d="M12 17v-4a2 2 0 0 1 4 0v4M12 11v6" />
        </svg>
      );
    case "external":
      return (
        <svg className={className} viewBox="0 0 24 24" {...common}>
          <path d="M7 17 17 7M7 7h10v10" />
        </svg>
      );
    case "more":
      return (
        <svg className={className} viewBox="0 0 24 24" {...common}>
          <circle cx="5" cy="12" r="1.4" />
          <circle cx="12" cy="12" r="1.4" />
          <circle cx="19" cy="12" r="1.4" />
        </svg>
      );
    case "highlights":
      return (
        <svg className={className} viewBox="0 0 24 24" {...common}>
          <path d="M12 3l2.4 5.6L20 9.7l-4.2 3.9.9 5.7L12 16.8l-4.7 2.5.9-5.7L4 9.7l5.6-1.1L12 3z" />
        </svg>
      );
    case "studio":
      return (
        <svg className={className} viewBox="0 0 24 24" {...common}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      );
    case "sun":
      return (
        <svg className={className} viewBox="0 0 24 24" {...common}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      );
    case "moon":
      return (
        <svg className={className} viewBox="0 0 24 24" {...common}>
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      );
    case "auto":
      return (
        <svg className={className} viewBox="0 0 24 24" {...common}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
    default:
      return null;
  }
}
