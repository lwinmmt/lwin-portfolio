import { Sidebar } from "@/components/sidebar/sidebar";
import { MobileDock } from "@/components/dock/mobile-dock";
import { KeyboardNav } from "@/components/layout/keyboard-nav";
import { LocaleSwap } from "@/components/layout/locale-swap";
import { CmdPalette } from "@/components/cmd-palette/cmd-palette";

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
