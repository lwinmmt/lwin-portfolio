import { Sidebar } from "@/components/sidebar/sidebar";
import { MobileDock } from "@/components/dock/mobile-dock";
import { KeyboardNav } from "@/components/layout/keyboard-nav";
import { CmdPalette } from "@/components/cmd-palette/cmd-palette";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <KeyboardNav />
      <CmdPalette />
      <Sidebar />
      <main
        id="main-content"
        // ml-var reads --sidebar-w which Sidebar updates via a data
        // attribute on <html>. Lets the main content reflow when the
        // sidebar collapses without any JS coordination from here.
        className="min-h-dvh px-6 pt-12 pb-32 outline-none lg:px-16 lg:pt-16 lg:ml-[var(--sidebar-w,260px)] transition-[margin-left] duration-200"
      >
        <div className="mx-auto max-w-[860px]">{children}</div>
      </main>
      <MobileDock />
    </>
  );
}
