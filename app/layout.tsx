import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { TurnstileSiteKeyProvider } from "@/components/forms/TurnstileField";
import { getTurnstileSiteKey } from "@/lib/turnstile";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bansalimmigration.com.au"),
  title: "Registered Migration Agents Melbourne - Bansal Immigration Consultants",
  description:
    "MARN listed registered migration agents in Melbourne for skilled, partner, student, and employer-sponsored visas. Fast-track your Australian PR with Bansal Immigration.",
  icons: {
    icon: "/img/logo/favicon.webp",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    googleBot: {
      index: false,
      follow: false,
      noarchive: true,
      nosnippet: true,
      noimageindex: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col font-sans antialiased text-gray-900 bg-white"
        suppressHydrationWarning
      >
        <TurnstileSiteKeyProvider siteKey={getTurnstileSiteKey()}>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </TurnstileSiteKeyProvider>
      </body>
    </html>
  );
}
