import { Sidebar } from "@/components/sidebar/sidebar";
import { MobileDock } from "@/components/dock/mobile-dock";
import { KeyboardNav } from "@/components/layout/keyboard-nav";
import { LocaleSwap } from "@/components/layout/locale-swap";
import { CmdPalette } from "@/components/cmd-palette/cmd-palette";
// LocalePromptBanner intentionally not rendered — the floating
// bottom-right "switch language?" prompt felt intrusive when it
// appeared on the OTHER locale after a manual switch. Sidebar +
// mobile dock both surface the toggle clearly enough. The component
// file stays in components/ui/locale-prompt-banner.tsx so it can be
// re-mounted here if we want to A/B test it later.

// Sync (not async) because some pages — like /projects — are
// "use client" and import DashboardShell into the client bundle.
// Async server components can't run inside a client module graph.
// The skip-to-main-content link lives in app/layout.tsx instead,
// which is a true server component and CAN call getT().
export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <KeyboardNav />
      <CmdPalette />
      <Sidebar />
      <main
        id="main-content"
        className="min-h-dvh px-6 pt-12 pb-32 outline-none lg:ml-[260px] lg:px-16 lg:pt-16"
      >
        <LocaleSwap>
          <div className="mx-auto max-w-[860px]">{children}</div>
        </LocaleSwap>
      </main>
      <MobileDock />
    </>
  );
}
