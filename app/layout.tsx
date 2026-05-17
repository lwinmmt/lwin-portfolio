import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ConsoleBranding } from "@/components/console-branding";
import { MotionProvider } from "@/components/providers/motion-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Minimal root metadata. The real title/description/OG/Twitter cards
// are emitted per-locale by app/[lang]/layout.tsx generateMetadata,
// so EN and VI visitors get language-matched social previews. This
// root-level fallback only applies to error pages or routes that
// somehow render outside the [lang] tree.
export const metadata: Metadata = {
  metadataBase: new URL("https://lwinmmt.com"),
  title: "Lwin MMT",
  // Icons resolved automatically from app/icon.svg and app/apple-icon.svg.
};

// Root layout is fully static — no cookies(), no headers(), nothing
// that would mark routes dynamic. The LocaleProvider + locale-aware
// content move into app/[lang]/layout.tsx, which prerenders both
// EN and VI variants at build time via generateStaticParams.
//
// `html lang="en"` is hardcoded as a baseline; the [lang]/layout
// provides the actual locale context for content. Most search
// engines weight document content over this attribute anyway.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        {/* Skip link: keyboard / screen-reader users tabbing in jump
            straight to main content instead of traversing every
            sidebar nav row + utility control first. Visually hidden
            until focused; the focus-visible state pops it to the
            top-left of the viewport. Text stays English here at the
            root layout so the page can be fully static — the rest of
            the chrome translates inside [lang]/layout. */}
        {/* Skip link uses focus-visible (not focus) so it only pops
            out for keyboard users. A mouse click on the link itself
            would otherwise leave it briefly visible until blur. */}
        <a
          href="#main-content"
          className="sr-only fixed left-3 top-3 z-[80] rounded-md bg-[var(--color-fg)] px-3 py-2 font-sans text-sm font-medium text-[var(--color-bg)] focus-visible:not-sr-only focus-visible:outline-none"
        >
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <MotionProvider>
            <ConsoleBranding />
            {children}
          </MotionProvider>
        </ThemeProvider>
        {/* Vercel Analytics (page views, referrers) + Speed Insights
            (real-user Core Web Vitals). Both ship tiny inline scripts
            that only beacon in production on the lwinmmt.com /
            lwin-portfolio.vercel.app domain — no data is collected
            from local dev. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
