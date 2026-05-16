"use client";

// Inline SVG icons matched to the Lucide vocabulary, sized for the sidebar.
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
      return (
        <svg className={className} viewBox="0 0 24 24" {...common}>
          <polyline points="8 6 2 12 8 18" />
          <polyline points="16 6 22 12 16 18" />
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
    default:
      return null;
  }
}
