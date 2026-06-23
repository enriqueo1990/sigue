import type { Metadata } from "next";
import CatalogClient from "@/components/CatalogClient";
import { getAllResources } from "@/lib/resources";

export const metadata: Metadata = {
  title: "Recursos",
  description:
    "Biblioteca de libros cortos y guías de discipulado en PDF, gratis para grupos pequeños y la iglesia local.",
};

export default function RecursosPage() {
  const resources = getAllResources();

  return (
    <main className="mx-auto max-w-[1180px] px-5 pb-24 pt-16 sm:px-8">
      <div className="max-w-[640px]">
        <div className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
          Biblioteca
        </div>
        <h1
          className="mt-3.5 font-serif font-medium leading-[1.05] tracking-[-0.015em] text-ink"
          style={{ fontSize: "clamp(40px, 5vw, 60px)" }}
        >
          Recursos
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Libros cortos y guías de discipulado producidos a partir de
          predicaciones y enseñanzas de pastores. Descarga gratuita en PDF.
        </p>
      </div>

      <CatalogClient resources={resources} />
    </main>
  );
}
