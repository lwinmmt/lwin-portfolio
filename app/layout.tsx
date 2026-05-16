import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ConsoleBranding } from "@/components/console-branding";
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
      <head>
        {/* Read the sidebar collapsed pref BEFORE React hydrates so the
            CSS variable --sidebar-w is correct on first paint. Otherwise
            the sidebar starts at 260px, then snaps to 64px after JS runs,
            and the main content margin reflows. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('sidebarCollapsed')==='1')document.documentElement.setAttribute('data-sidebar-collapsed','1')}catch(e){}",
          }}
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ConsoleBranding />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
