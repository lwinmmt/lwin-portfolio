"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarIcon } from "@/components/sidebar/sidebar-icon";
import { EmailButton } from "@/components/ui/email-button";
import { profile } from "@/lib/content";
import { isActiveRoute } from "@/lib/nav-utils";

const dockItems = [
  { href: "/", icon: "home", label: "Home" },
  { href: "/about", icon: "user", label: "About" },
  { href: "/projects", icon: "code", label: "Projects" },
  { href: "/uses", icon: "laptop", label: "Uses" },
  { href: "/resume", icon: "file", label: "Resume" },
  { href: `mailto:${profile.email}`, icon: "mail", label: "Email" },
];

export function MobileDock() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Primary navigation, mobile"
      className="glass-pill fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-full p-2 lg:hidden"
    >
      {dockItems.map((item) => {
        const active = isActiveRoute(item.href, pathname);
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
              ariaLabel={item.label}
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
            aria-label={item.label}
            className={itemClass}
          >
            <SidebarIcon name={item.icon} className="h-4 w-4" />
          </Link>
        );
      })}
    </nav>
  );
}
