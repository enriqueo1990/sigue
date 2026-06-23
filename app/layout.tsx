import type { Metadata, Viewport } from "next";
import { Newsreader, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { socialMeta, SITE_URL, SITE_DESCRIPTION, organizationLd, websiteLd } from "@/lib/seo";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SIGUE — Recursos cristianos gratuitos",
    template: "%s · SIGUE",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "estudios bíblicos",
    "grupos pequeños",
    "discipulado",
    "recursos cristianos",
    "PDF gratis",
    "iglesia",
  ],
  ...socialMeta({
    title: "SIGUE — Recursos cristianos gratuitos",
    description: SITE_DESCRIPTION,
    path: "/",
  }),
};

export const viewport: Viewport = {
  themeColor: "#f6f1e8",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${newsreader.variable} ${hanken.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <JsonLd data={organizationLd()} />
        <JsonLd data={websiteLd()} />
      </body>
    </html>
  );
}
