import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: "%s | Nyne Owls" },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_GB",
    title: SITE.title,
    description: SITE.description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: SITE.title, description: SITE.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f7f4" },
    { media: "(prefers-color-scheme: dark)", color: "#1f1e1c" },
  ],
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  alternateName: ["nyneowls", "Nyne Owls Studio"],
  url: SITE.url,
  email: SITE.email,
  description: SITE.description,
};

const siteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  alternateName: ["nyneowls"],
  url: SITE.url,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body>
        <JsonLd data={orgSchema} />
        <JsonLd data={siteSchema} />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <a
            href="#main"
            className="fixed left-3 top-[-60px] z-50 bg-nyne px-4 py-3 text-[13px] font-bold text-white focus:top-2"
          >
            Skip to content
          </a>
          <ScrollProgress />
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}