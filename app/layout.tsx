import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies, headers } from "next/headers";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ConsoleBranding } from "@/components/console-branding";
import { LanguageBanner } from "@/components/ui/language-banner";
import "./globals.css";

// Parse the Accept-Language header for the visitor's primary language.
// Format: `en-US,en;q=0.9,vi;q=0.8` -> we want the FIRST token's base.
function primaryLanguageFrom(header: string | null): string {
  if (!header) return "";
  const first = header.split(",")[0]?.split(";")[0]?.trim() ?? "";
  return first.toLowerCase();
}

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
  // Server-side language detection: read Accept-Language, only show the
  // banner to visitors whose primary browser language is Vietnamese.
  // Dismissal persists via the 'lb' cookie so return visitors do not
  // see it again.
  const [h, c] = await Promise.all([headers(), cookies()]);
  const primary = primaryLanguageFrom(h.get("accept-language"));
  const dismissed = c.get("lb")?.value === "1";
  const showLangBanner = !dismissed && primary.startsWith("vi");

  return (
    <html
      lang="en"
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
          <ConsoleBranding />
          {showLangBanner && <LanguageBanner />}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
