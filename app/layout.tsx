import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ConsoleBranding } from "@/components/console-branding";
import { LocaleProvider } from "@/lib/i18n/client";
import { getLocale } from "@/lib/i18n/server";
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

export const metadata: Metadata = {
  title: {
    default: "Lwin MMT, AI and IIoT Engineer",
    template: "%s | Lwin MMT",
  },
  description:
    "I build IoT systems and ship products end-to-end. Cloud, hardware, and the operating system in between. Currently AI & IIoT Engineer at VNTT, Ho Chi Minh City.",
  metadataBase: new URL("https://lwinmmt.com"),
  openGraph: {
    title: "Lwin MMT, AI and IIoT Engineer",
    description:
      "Engineer by training. Founder by accident. Daily AI-tools operator. Currently at VNTT, HCMC.",
    url: "https://lwinmmt.com",
    siteName: "Lwin MMT",
    locale: "en_SG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lwin MMT, AI and IIoT Engineer",
    description:
      "Engineer by training. Founder by accident. Daily AI-tools operator.",
  },
  // Icons resolved automatically from app/icon.svg and app/apple-icon.svg.
  // No explicit `icons` block needed: Next.js generates the link tags.
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Locale resolution: explicit cookie wins, else Accept-Language
  // (Vietnamese browsers auto-flip), else English. The whole tree
  // reads from this single source via the LocaleProvider so any
  // client component can call useLocale() / useT() without prop
  // drilling.
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LocaleProvider locale={locale}>
            <ConsoleBranding />
            {children}
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
