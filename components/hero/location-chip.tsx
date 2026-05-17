"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/content";
import { useLocale } from "@/lib/i18n/client";
import type { Locale } from "@/lib/i18n/types";

// Compact "where I am right now" chip showing city code, live local
// time, and GMT offset. Used in the hero under the company name so
// the chip works the same way on every viewport — no more globe-
// overlay placement that was awkward on mobile.
//
// Updates every 60s. SSR renders "--:--" to avoid a hydration mismatch
// (server-rendered time would diverge from client time within seconds
// of the request); the client effect then fills in the real time.

function formatLocalTime(now: Date, timeZone: string, locale: Locale): string {
  if (locale === "vi") {
    return new Intl.DateTimeFormat("vi-VN", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(now);
  }
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(now);
}

export function LocationChip() {
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<Date>(() => new Date(0));

  useEffect(() => {
    setMounted(true);
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const liveTime = mounted
    ? formatLocalTime(now, profile.locationTimezone, locale)
    : null;

  return (
    <div
      className="glass-chip mt-3 inline-grid grid-cols-[1fr_auto_1fr] items-baseline gap-x-2 rounded-full px-3 py-1.5 font-mono text-[10.5px] tracking-[0.08em] text-[var(--color-fg-soft)]"
      aria-label={`Currently in ${profile.location}`}
    >
      <span className="text-right font-semibold uppercase tracking-[0.14em] text-[var(--color-fg)]">
        {profile.locationShort}
      </span>
      <span className="tabular-nums">{liveTime ?? "--:--"}</span>
      <span className="text-left text-[var(--color-fg-faint)]">
        {profile.locationGmtLabel}
      </span>
    </div>
  );
}
