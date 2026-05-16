"use client";

import { useEffect, useRef, useState } from "react";

// Hero "live ops" panel. Replaces the previous globe with a compact
// dashboard tile that shows the kind of thing Lwin actually builds:
// three city clocks for the work footprint, a 7d NEA-style uptime
// sparkline, online/offline counters for the Osiris rigs and the
// VNTT pilot, and a tailing MQTT log. The hero IS proof of the
// "I build IoT systems" claim sitting directly above it.
//
// The numbers and topic names are plausible but not load-bearing
// claims about live infrastructure. Treat as a representative
// sample of the data shapes Lwin works with day to day.
//
// Reduced motion: clock still ticks, log feed stops growing, live
// dot stops pinging.

type LogEntry = { id: number; ts: string; topic: string; payload: string };

const HUB_CITIES = [
  { id: "yangon", label: "Yangon", tzMinutes: 390 },
  { id: "singapore", label: "Singapore", tzMinutes: 480 },
  { id: "hcmc", label: "HCMC", tzMinutes: 420 },
];

// 14 plausible 7d uptime samples. Static so the visual is
// deterministic; the sparkline reads as "real-ish historical data,"
// not a per-render random walk.
const UPTIME_SPARK = [
  99.2, 99.8, 100, 100, 98.4, 99.6, 100, 99.9, 99.7, 100, 99.1, 100, 99.8,
  100,
];
const UPTIME_LABEL = "99.7%";

// Log pool. Topics mirror real IoT patterns: <project>/<site>/<sensor>
// or <project>/<site>/heartbeat. Payloads are small numerics or status
// flags. New entries are picked at random and pushed to the feed.
const LOG_POOL: { topic: string; payload: string }[] = [
  { topic: "nea/sg-jurong/heartbeat", payload: "OK" },
  { topic: "nea/sg-changi/ph", payload: "7.1" },
  { topic: "nea/sg-woodlands/level", payload: "87 mm" },
  { topic: "nea/sg-east/flow", payload: "12.3 L/min" },
  { topic: "nea/sg-jurong/ph", payload: "6.9" },
  { topic: "nea/sg-changi/level", payload: "91 mm" },
  { topic: "nea/sg-woodlands/heartbeat", payload: "OK" },
  { topic: "osiris/rig-1/humidity", payload: "64 %" },
  { topic: "osiris/rig-2/temp", payload: "24.8 °C" },
  { topic: "osiris/rig-3/pump", payload: "pulsed 220 ms" },
  { topic: "osiris/rig-2/heartbeat", payload: "OK" },
  { topic: "vntt/vn-thuduc/temp", payload: "27.3 °C" },
  { topic: "vntt/vn-binhthanh/ingest", payload: "OK" },
  { topic: "vntt/vn-thuduc/heartbeat", payload: "OK" },
];

const VISIBLE_LOG_ROWS = 6;

// HH:MM or HH:MM:SS for a given UTC offset in minutes, independent of
// the viewer's local timezone.
function formatTime(date: Date, tzMinutes: number, withSeconds = false) {
  const shifted = new Date(date.getTime() + tzMinutes * 60_000);
  const hh = String(shifted.getUTCHours()).padStart(2, "0");
  const mm = String(shifted.getUTCMinutes()).padStart(2, "0");
  if (!withSeconds) return `${hh}:${mm}`;
  const ss = String(shifted.getUTCSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

export function HeroOpsPanel() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<Date>(() => new Date(0));
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [lastMsgSec, setLastMsgSec] = useState(0);
  const [reduced, setReduced] = useState(false);
  const logIdRef = useRef(0);
  const lastLogTimeRef = useRef(0);

  useEffect(() => {
    setMounted(true);
    const initial = new Date();
    setNow(initial);
    lastLogTimeRef.current = initial.getTime();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Tick the clocks and the "last msg ago" counter every second so the
  // panel feels alive even before the next log line arrives.
  useEffect(() => {
    if (!mounted) return;
    const id = setInterval(() => {
      const d = new Date();
      setNow(d);
      setLastMsgSec(Math.floor((d.getTime() - lastLogTimeRef.current) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, [mounted]);

  // Seed the log feed at mount so it is not empty on first paint.
  useEffect(() => {
    if (!mounted) return;
    const seed: LogEntry[] = [];
    const base = new Date();
    for (let i = VISIBLE_LOG_ROWS - 1; i >= 0; i--) {
      const t = new Date(base.getTime() - i * 3200);
      const entry = LOG_POOL[(LOG_POOL.length - i - 1 + LOG_POOL.length) % LOG_POOL.length];
      seed.push({
        id: ++logIdRef.current,
        // Log timestamps in Singapore time, matching where the bulk of
        // the deployments actually live.
        ts: formatTime(t, 480, true),
        topic: entry.topic,
        payload: entry.payload,
      });
    }
    setLogs(seed);
    lastLogTimeRef.current = base.getTime();
  }, [mounted]);

  // Push a new log line every 3-4.5s. Skip entirely under reduced motion
  // so the panel does not auto-animate.
  useEffect(() => {
    if (!mounted || reduced) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      const delay = 2800 + Math.random() * 1700;
      timer = setTimeout(() => {
        if (cancelled) return;
        const entry = LOG_POOL[Math.floor(Math.random() * LOG_POOL.length)];
        const ts = new Date();
        setLogs((curr) => {
          const next = [
            ...curr,
            {
              id: ++logIdRef.current,
              ts: formatTime(ts, 480, true),
              topic: entry.topic,
              payload: entry.payload,
            },
          ];
          return next.slice(-VISIBLE_LOG_ROWS);
        });
        lastLogTimeRef.current = ts.getTime();
        schedule();
      }, delay);
    };
    schedule();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [mounted, reduced]);

  return (
    <div
      className="w-full overflow-hidden rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-bg-warm)]"
      style={{ boxShadow: "var(--shadow-map)" }}
      aria-label="Live IoT operations panel"
    >
      {/* Header row: live indicator + 3 city clocks */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-[var(--color-border-soft)] px-5 py-3">
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="relative inline-flex h-2 w-2">
            {!reduced && (
              <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-live)] opacity-70" />
            )}
            <span
              className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-live)]"
              style={{ boxShadow: "0 0 6px var(--color-live)" }}
            />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-muted)]">
            Live
          </span>
        </div>
        <div className="flex flex-wrap items-baseline gap-x-3.5 gap-y-1">
          {HUB_CITIES.map((c) => (
            <div key={c.id} className="flex items-baseline gap-1.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-faint)]">
                {c.label}
              </span>
              <span className="font-mono text-[13px] tabular-nums text-[var(--color-fg)]">
                {mounted ? formatTime(now, c.tzMinutes) : "--:--"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stat rows */}
      <div className="flex flex-col gap-2.5 border-b border-[var(--color-border-soft)] px-5 py-4">
        <StatRow
          label="NEA uptime (7d)"
          value={
            <div className="flex items-center gap-3">
              <Sparkline values={UPTIME_SPARK} />
              <span className="font-mono text-[12px] tabular-nums text-[var(--color-fg)]">
                {UPTIME_LABEL}
              </span>
            </div>
          }
        />
        <StatRow
          label="Osiris rigs"
          value={
            <span className="inline-flex items-center gap-1.5 font-mono text-[12px] text-[var(--color-fg)]">
              <DotMark />
              3 online <span className="text-[var(--color-fg-faint)]">/</span> 0 offline
            </span>
          }
        />
        <StatRow
          label="VNTT pilot"
          value={
            <span className="inline-flex items-center gap-1.5 font-mono text-[12px] text-[var(--color-fg)]">
              <DotMark />
              ingest OK <span className="text-[var(--color-fg-faint)]">/</span> last msg {mounted ? lastMsgSec : 0}s
            </span>
          }
        />
      </div>

      {/* MQTT-style log feed */}
      <div className="px-5 pt-3 pb-4">
        <div className="mb-2 flex items-baseline justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-muted)]">
            MQTT tail
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-faint)]">
            $ mosquitto_sub /#
          </span>
        </div>
        <ul className="flex flex-col gap-[3px]" aria-live="off">
          {logs.length === 0 && (
            <li className="font-mono text-[11px] text-[var(--color-fg-faint)]">
              awaiting messages.
            </li>
          )}
          {logs.map((l) => (
            <li
              key={l.id}
              className="grid grid-cols-[auto_1fr_auto] items-baseline gap-2 font-mono text-[11px] leading-[1.5]"
            >
              <span className="text-[var(--color-fg-faint)] tabular-nums">[{l.ts}]</span>
              <span className="truncate text-[var(--color-fg-soft)]">{l.topic}</span>
              <span className="text-[var(--color-ruby)] tabular-nums">{l.payload}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-fg-muted)]">
        {label}
      </span>
      {value}
    </div>
  );
}

function DotMark() {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-live)]"
      style={{ boxShadow: "0 0 4px var(--color-live)" }}
    />
  );
}

function Sparkline({ values }: { values: number[] }) {
  const w = 86;
  const h = 18;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(0.5, max - min);
  const pad = 1;
  const points = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * (w - pad * 2) + pad;
      const y = h - pad - ((v - min) / range) * (h - pad * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className="text-[var(--color-ruby)]"
      aria-hidden="true"
    >
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
