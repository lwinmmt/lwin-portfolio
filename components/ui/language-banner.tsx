"use client";

// Soft banner shown to visitors whose browser primary language is
// Vietnamese (detected server-side in app/layout.tsx via the
// Accept-Language header). Text is in Vietnamese so the user can
// actually read it. Dismissal persists via a 1-year cookie so the
// banner is gone on subsequent visits.

const COOKIE_NAME = "lb";

export function LanguageBanner() {
  const dismiss = () => {
    try {
      document.cookie = `${COOKIE_NAME}=1; path=/; max-age=31536000; samesite=lax`;
    } catch {
      // Cookies may be blocked; fall back to hiding for this session only.
    }
    const el = document.getElementById("language-banner");
    if (el) el.style.display = "none";
  };

  return (
    <div
      id="language-banner"
      role="region"
      aria-label="Language preference notice"
      className="relative z-30 border-b border-[var(--color-border-soft)] bg-[var(--color-bg-warm)] px-4 py-2"
    >
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center text-[12.5px] text-[var(--color-fg-muted)]">
        <span>
          Trang này được viết bằng tiếng Anh. Dùng tính năng dịch trên trình duyệt để xem bằng tiếng Việt.
        </span>
        <button
          type="button"
          onClick={dismiss}
          className="rounded-md border border-[var(--color-border-default)] bg-[var(--color-bg-card)] px-2.5 py-0.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-[var(--color-fg-soft)] transition-colors hover:bg-[var(--color-hover-mute)] hover:text-[var(--color-fg)]"
        >
          Đóng
        </button>
      </div>
    </div>
  );
}
