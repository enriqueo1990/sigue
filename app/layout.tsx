import type { Metadata } from "next";
import { Newsreader, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
  metadataBase: new URL("https://siguerecursos.com"),
  title: {
    default: "SIGUE — Recursos cristianos gratuitos",
    template: "%s · SIGUE",
  },
  description:
    "Libros cortos, guías de discipulado y estudios bíblicos gratuitos en PDF, pensados para grupos pequeños y la iglesia local.",
  keywords: [
    "estudios bíblicos",
    "grupos pequeños",
    "discipulado",
    "recursos cristianos",
    "PDF gratis",
    "iglesia",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "SIGUE",
    title: "SIGUE — Recursos cristianos gratuitos",
    description:
      "Libros cortos y estudios bíblicos gratuitos en PDF para grupos pequeños y la iglesia local.",
    url: "https://siguerecursos.com",
  },
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
      </body>
    </html>
  );
}
