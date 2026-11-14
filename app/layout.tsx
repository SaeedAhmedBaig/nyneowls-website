import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nyneowls.com"),
  title: {
    default: "Nyne Owls | Brand Design, Business Software & Original Comics",
    template: "%s | Nyne Owls",
  },
  description:
    "Nyne Owls is a creative and technology company: brand identity design, business software, design resources and original comics.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <a
            href="#main"
            className="fixed left-3 top-[-60px] z-50 bg-nyne px-4 py-3 text-[13px] font-bold text-white focus:top-2"
          >
            Skip to content
          </a>
          <ScrollProgress />
          <SmoothScroll />
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