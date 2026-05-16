"use client";

import { useEffect, useState } from "react";

/**
 * Hero location panel. Three city cards arranged left-to-right tracking
 * the narrative arc: Yangon (born), Singapore (schooled), HCMC (working).
 * Each card displays a role label, live local time updating every 60s,
 * and the GMT offset. HCMC is the currently-active city: it gets a ruby
 * border, ruby-soft surface tint, and a pulsing live dot so the panel
 * answers "where is Lwin right now" at a glance, no hover required.
 *
 * Replaces the earlier `HeroGlobe`. The globe felt cool but did not give
 * a first-time visitor any spatial reference: tooltips required hover and
 * the rotating sphere did not anchor a location. This panel keeps the
 * three-city narrative arc but lets all three speak immediately.
 *
 * Uses the global `animate-fade-up` keyframe (see globals.css) so cards
 * are visible on first paint. framer-motion's SSR emits initial styles
 * inline which can leave cards mid-fade if JS does not run; CSS keyframes
 * are deterministic.
 */

type City = {
  id: string;
  label: string;
  role: string;
  tzMinutes: number;
};

const CITIES: City[] = [
  { id: "yangon", label: "Yangon", role: "Born", tzMinutes: 390 },
  { id: "singapore", label: "Singapore", role: "Schooled at SP, SMU", tzMinutes: 480 },
  { id: "hcmc", label: "HCMC", role: "Working at VNTT", tzMinutes: 420 },
];

const ACTIVE_CITY_ID = "hcmc";

// Convert a UTC instant into "HH:MM" for a given timezone offset (minutes).
// Shift the epoch by tzMinutes then read UTC components: independent of
// the viewer's own clock so the panel says the same thing in any browser.
function formatLocalTime(now: Date, tzMinutes: number): string {
  const shifted = new Date(now.getTime() + tzMinutes * 60_000);
  const hh = String(shifted.getUTCHours()).padStart(2, "0");
  const mm = String(shifted.getUTCMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

function formatTzLabel(tzMinutes: number): string {
  const sign = tzMinutes >= 0 ? "+" : "-";
  const abs = Math.abs(tzMinutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return m === 0
    ? `GMT${sign}${h}`
    : `GMT${sign}${h}:${String(m).padStart(2, "0")}`;
}

export function LocationPanel() {
  // Suppress SSR/CSR time mismatch: render placeholder "--:--" until
  // mount, then swap to the live value on the first client tick.
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<Date>(() => new Date(0));

  useEffect(() => {
    setMounted(true);
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="w-full overflow-hidden rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-bg-warm)] p-4 sm:p-5"
      style={{ boxShadow: "var(--shadow-map)" }}
    >
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-muted)]">
          Where I am
        </div>
        {/* Hidden on mobile: once cards stack vertically the city list
            becomes visually redundant with the card titles, and it would
            overflow the panel header on narrow viewports. */}
        <div className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-faint)] sm:block">
          Yangon &middot; Singapore &middot; HCMC
        </div>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        {CITIES.map((c) => (
          <CityCard
            key={c.id}
            city={c}
            mounted={mounted}
            now={now}
            isActive={c.id === ACTIVE_CITY_ID}
          />
        ))}
      </div>
    </div>
  );
}

function CityCard({
  city,
  mounted,
  now,
  isActive,
}: {
  city: City;
  mounted: boolean;
  now: Date;
  isActive: boolean;
}) {
  const liveTime = mounted ? formatLocalTime(now, city.tzMinutes) : "--:--";
  const tzLabel = formatTzLabel(city.tzMinutes);

  // Active card swaps to the ruby-tinted surface. Inactive cards stay on
  // the neutral card surface so the active state reads as a clear focal
  // point without overwhelming the other two narrative steps.
  const surfaceClass = isActive
    ? "border-[var(--color-ruby)] bg-[var(--color-ruby-soft)]"
    : "border-[var(--color-border-soft)] bg-[var(--color-bg-card)]";

  return (
    <div
      className={`flex-1 rounded-xl border ${surfaceClass} px-4 py-3.5`}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-[var(--color-ruby)]">
          {city.role}
        </span>
        {isActive && (
          <span aria-hidden="true" className="relative inline-flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-live)] opacity-70" />
            <span
              className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-live)]"
              style={{ boxShadow: "0 0 6px var(--color-live)" }}
            />
          </span>
        )}
      </div>
      <div className="mt-1.5 font-sans text-[15px] font-semibold leading-tight text-[var(--color-fg)]">
        {city.label}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span
          className="font-mono text-[22px] font-semibold leading-none tracking-[-0.01em] text-[var(--color-fg)]"
          aria-label={`Local time in ${city.label} is ${liveTime}`}
        >
          {liveTime}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-fg-faint)]">
          {tzLabel}
        </span>
      </div>
    </div>
  );
}
