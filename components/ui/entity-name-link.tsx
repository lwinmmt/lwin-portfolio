// Entity name rendered as either an external link (when `href` is set)
// or plain text. Used by Experience and Education rows where the name
// IS the row's primary heading. Centralizes the hover color treatment
// so a single style change ripples both surfaces.

export function EntityNameLink({
  name,
  href,
  className,
}: {
  name: string;
  href?: string;
  /** Optional override; defaults to the section's standard heading
   *  style. */
  className?: string;
}) {
  const baseClass =
    className ??
    "font-sans text-[14px] font-semibold leading-tight text-[var(--color-fg)]";

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClass} transition-colors hover:text-[var(--color-ruby-deep)]`}
      >
        {name}
      </a>
    );
  }
  return <span className={baseClass}>{name}</span>;
}
