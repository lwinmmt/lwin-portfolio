"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarIcon } from "@/components/sidebar/sidebar-icon";
import { EmailButton } from "@/components/ui/email-button";
import { profile } from "@/lib/content";
import { isActiveRoute } from "@/lib/nav-utils";
import { useT } from "@/lib/i18n/client";
import type { MessageKey } from "@/lib/i18n/messages";

type DockItem = {
  href: string;
  icon: string;
  /** Translation key for the screen-reader label. Pulled through useT
   *  on render so VI mode does not show English aria text. */
  labelKey: MessageKey;
};

const dockItems: DockItem[] = [
  { href: "/", icon: "home", labelKey: "nav.home" },
  { href: "/about", icon: "user", labelKey: "nav.about" },
  { href: "/projects", icon: "code", labelKey: "nav.projects" },
  { href: "/uses", icon: "laptop", labelKey: "nav.uses" },
  { href: "/resume", icon: "file", labelKey: "nav.resume" },
  { href: `mailto:${profile.email}`, icon: "mail", labelKey: "nav.email" },
];

export function MobileDock() {
  const pathname = usePathname();
  const t = useT();
  return (
    <nav
      aria-label={t("nav.aria.mobile")}
      className="glass-pill fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-full p-2 lg:hidden"
    >
      {dockItems.map((item) => {
        const active = isActiveRoute(item.href, pathname);
        const label = t(item.labelKey);
        const itemClass =
          "flex h-9 w-9 items-center justify-center rounded-full transition-colors " +
          (active
            ? "bg-[var(--color-fg)] text-[var(--color-bg)]"
            : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]");

        if (item.href.startsWith("mailto:")) {
          const email = item.href.replace(/^mailto:/, "");
          return (
            <EmailButton
              key={item.href}
              email={email}
              className={itemClass}
              ariaLabel={label}
              tooltipPlacement="top"
            >
              <SidebarIcon name={item.icon} className="h-4 w-4" />
            </EmailButton>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-label={label}
            className={itemClass}
          >
            <SidebarIcon name={item.icon} className="h-4 w-4" />
          </Link>
        );
      })}
    </nav>
  );
}
