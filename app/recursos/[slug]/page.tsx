import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllResources, getResource } from "@/lib/resources";
import DownloadCount from "@/components/DownloadCount";

export function generateStaticParams() {
  return getAllResources().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) return {};
  return {
    title: resource.title,
    description: resource.desc,
    openGraph: {
      title: `${resource.title} · SIGUE`,
      description: resource.desc,
      images: [{ url: resource.cover }],
    },
  };
}

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) notFound();

  const includesLabel =
    resource.type === "Libro" ? "Contenido del libro" : "Lo que incluye";

  const meta: { k: string; v: string }[] = [
    { k: "Formato", v: "PDF" },
    { k: "Páginas", v: String(resource.pages) },
    { k: "Categoría", v: resource.category },
    { k: "Idioma", v: "Español" },
  ];
  if (resource.author) meta.push({ k: "Autor", v: resource.author });

  return (
    <main className="mx-auto max-w-[1180px] px-5 pb-24 pt-12 sm:px-8">
      <Link
        href="/recursos"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition-colors hover:text-accent"
      >
        ← Volver a recursos
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-[380px_1fr] lg:gap-[76px]">
        {/* Columna izquierda: portada + descarga + metadatos */}
        <div className="lg:sticky lg:top-[104px] lg:self-start">
          <Image
            src={resource.cover}
            alt={resource.title}
            width={760}
            height={1074}
            sizes="(max-width: 1024px) 100vw, 380px"
            priority
            className="w-full rounded-md shadow-[0_24px_50px_-18px_rgba(33,26,20,0.45)]"
          />
          <a
            href={`/api/descargar/${resource.slug}`}
            className="mt-6 flex items-center justify-center gap-2 rounded-[4px] bg-accent px-4 py-4 text-base font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            ↓ Descargar PDF
          </a>
          {resource.epub && (
            <a
              href={resource.epub}
              download
              className="mt-2.5 flex items-center justify-center gap-2 rounded-[4px] border border-[#d8ccb9] px-4 py-3 text-sm font-semibold text-ink transition-colors hover:bg-[#efe8dc]"
            >
              Descargar EPUB
            </a>
          )}

          <DownloadCount slug={resource.slug} />

          <div className="mt-6 border-t border-line">
            {meta.map((m) => (
              <div
                key={m.k}
                className="flex justify-between border-b border-line py-3 text-[14.5px]"
              >
                <span className="font-medium text-faint">{m.k}</span>
                <span className="text-right font-semibold text-ink">{m.v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Columna derecha: contenido */}
        <div>
          <div
            className="text-xs font-bold uppercase tracking-[0.16em]"
            style={{ color: resource.accent }}
          >
            {resource.typeLabel}
          </div>
          <h1
            className="mt-3.5 font-serif font-medium leading-[1.06] tracking-[-0.015em] text-ink"
            style={{ fontSize: "clamp(38px, 4.6vw, 56px)" }}
          >
            {resource.title}
          </h1>
          <p className="mt-2.5 font-serif text-[22px] italic text-muted">
            {resource.subtitle}
          </p>
          {resource.author && (
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.04em] text-faint">
              Por {resource.author}
            </p>
          )}

          <div className="prose-sigue mt-7">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {resource.body}
            </ReactMarkdown>
          </div>

          {resource.includes.length > 0 && (
            <>
              <h2 className="mt-11 font-serif text-[26px] font-medium text-ink">
                {includesLabel}
              </h2>
              <div className="mt-5">
                {resource.includes.map((item, i) => (
                  <div
                    key={item}
                    className="flex items-baseline gap-5 border-t border-line py-[15px]"
                  >
                    <span
                      className="min-w-7 font-serif text-lg font-medium"
                      style={{ color: resource.accent }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[17px] font-medium leading-snug text-ink">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          {resource.quote && (
            <div
              className="mt-11 border-l-[3px] py-1.5 pl-6"
              style={{ borderColor: resource.accent }}
            >
              <p className="font-serif text-2xl italic leading-snug text-ink">
                {resource.quote}
              </p>
              <div className="mt-3.5 text-xs font-bold uppercase tracking-[0.16em] text-faint">
                {resource.quoteRef}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
