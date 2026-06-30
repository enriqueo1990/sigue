import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllResources, getResource, getSeriesResources } from "@/lib/resources";
import DownloadCount from "@/components/DownloadCount";
import JsonLd from "@/components/JsonLd";
import { socialMeta, bookLd, breadcrumbLd } from "@/lib/seo";

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
    ...socialMeta({
      title: `${resource.title} · SIGUE`,
      description: resource.desc,
      path: `/recursos/${resource.slug}`,
      // La tarjeta OG se genera dinámicamente en opengraph-image.tsx.
      image: null,
    }),
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

  const seriesParts = resource.series
    ? getSeriesResources(resource.series)
    : [];
  const inSeries = seriesParts.length > 1;
  const seriesIndex = seriesParts.findIndex((r) => r.slug === resource.slug);

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
      <JsonLd data={bookLd(resource)} />
      <JsonLd data={breadcrumbLd(resource)} />
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
            {inSeries && (
              <> · Parte {seriesIndex + 1} de {seriesParts.length}</>
            )}
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

          {inSeries && (
            <div className="mt-12 border-t border-line pt-9">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-faint">
                Serie en {seriesParts.length} partes
              </div>
              <h2 className="mt-2 font-serif text-[26px] font-medium text-ink">
                {resource.series}
              </h2>
              <div className="mt-5 flex flex-col gap-2.5">
                {seriesParts.map((part, i) => {
                  const current = part.slug === resource.slug;
                  const inner = (
                    <>
                      <span
                        className="min-w-7 font-serif text-lg font-medium"
                        style={{ color: part.accent }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="relative h-[64px] w-[46px] shrink-0 overflow-hidden rounded bg-[#eee7db]">
                        <Image
                          src={part.cover}
                          alt=""
                          fill
                          sizes="46px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="font-serif text-[18px] font-medium leading-snug text-ink">
                          {part.title}
                        </div>
                        <div className="mt-0.5 truncate text-sm text-muted">
                          {current ? "Estás leyendo este estudio" : part.subtitle}
                        </div>
                      </div>
                    </>
                  );
                  return current ? (
                    <div
                      key={part.slug}
                      className="flex items-center gap-4 rounded-md border border-accent bg-surface px-3.5 py-3"
                    >
                      {inner}
                    </div>
                  ) : (
                    <Link
                      key={part.slug}
                      href={`/recursos/${part.slug}`}
                      className="flex items-center gap-4 rounded-md border border-line px-3.5 py-3 transition-colors hover:border-faint hover:bg-surface"
                    >
                      {inner}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
