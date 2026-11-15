import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/lib/seo";
import { organizationSchema, websiteSchema } from "@/lib/schema";

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
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f7f4" },
    { media: "(prefers-color-scheme: dark)", color: "#1f1e1c" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" suppressHydrationWarning className={inter.variable}>
      <body>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
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