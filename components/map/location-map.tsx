"use client";

import { useEffect, useRef, useState } from "react";

const HCMC: [number, number] = [10.7769, 106.7009];
const INITIAL_ZOOM = 10;
const FINAL_ZOOM = 12;

export function LocationMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<unknown>(null);
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    let flyTimer: ReturnType<typeof setTimeout> | null = null;

    async function init() {
      const L = (await import("leaflet")).default;

      if (cancelled || !mapRef.current || mapInstanceRef.current) return;

      const map = L.map(mapRef.current, {
        zoomControl: false,
        attributionControl: true,
        dragging: false,
        touchZoom: false,
        doubleClickZoom: false,
        scrollWheelZoom: false,
        boxZoom: false,
        keyboard: false,
      }).setView(HCMC, INITIAL_ZOOM);

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution: "&copy; OSM &copy; CARTO",
          subdomains: "abcd",
          maxZoom: 19,
          detectRetina: true,
        },
      ).addTo(map);

      const pinIcon = L.divIcon({
        className: "map-pin-icon",
        html: '<div class="map-pin"></div>',
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });
      L.marker(HCMC, { icon: pinIcon, interactive: false }).addTo(map);

      mapInstanceRef.current = map;

      // Leaflet sometimes calculates the wrong tile grid if the container
      // sized after mount. Force a recalc once the browser has laid out.
      requestAnimationFrame(() => map.invalidateSize());

      // Animated zoom-in on first load
      const prefersReducedMotion = typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        map.setView(HCMC, FINAL_ZOOM);
      } else {
        flyTimer = setTimeout(() => {
          map.flyTo(HCMC, FINAL_ZOOM, { duration: 1.8, easeLinearity: 0.25 });
        }, 350);
      }
    }

    init();

    return () => {
      cancelled = true;
      if (flyTimer) clearTimeout(flyTimer);
      const map = mapInstanceRef.current as { remove: () => void } | null;
      if (map) {
        map.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    function updateTime() {
      const now = new Date();
      const opts: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Ho_Chi_Minh",
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
      };
      setTime(now.toLocaleTimeString("en-US", opts));
    }
    updateTime();
    // Display is hh:mm only, so once per minute is enough.
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative h-[320px] w-full overflow-hidden rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-bg-warm)] animate-fade-up"
      style={{ animationDelay: "50ms", boxShadow: "var(--shadow-map)" }}
    >
      <div ref={mapRef} className="map-tiles-light h-full w-full" />

      <div className="glass-overlay absolute top-4 right-4 z-[500] flex items-center gap-2.5 rounded-xl px-3.5 py-2">
        <span
          className="block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-live)]"
          style={{ boxShadow: "0 0 6px var(--color-live)" }}
        />
        <span className="font-mono text-[12px] font-semibold tracking-[0.04em] text-[var(--color-fg)]">
          {time || "--:--"}
        </span>
        <span className="font-mono text-[11px] tracking-[0.05em] text-[var(--color-fg-muted)]">
          GMT+7
        </span>
      </div>

      <div className="glass-overlay absolute bottom-4 left-4 z-[500] rounded-xl px-3 py-2">
        <div className="font-sans text-[12.5px] font-semibold leading-tight text-[var(--color-fg)]">
          Ho Chi Minh City
        </div>
        <div className="mt-0.5 font-mono text-[10px] tracking-[0.04em] text-[var(--color-fg-muted)]">
          <span className="text-[var(--color-ruby)]">&#9679;</span> 10&deg;48&prime;N &middot; 106&deg;36&prime;E
        </div>
      </div>
    </div>
  );
}
