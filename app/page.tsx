import Link from "next/link";
import Image from "next/image";
import ResourceCard from "@/components/ResourceCard";
import { getFeaturedResource, getResourcesByType } from "@/lib/resources";

export default function HomePage() {
  const featured = getFeaturedResource();
  const guides = getResourcesByType("Estudio");

  return (
    <main>
      {/* ===================== HERO ===================== */}
      <section className="mx-auto grid max-w-[1180px] items-center gap-12 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[1fr_430px] lg:gap-[72px] lg:pb-[84px] lg:pt-[92px]">
        <div>
          <div className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-accent">
            Recursos gratuitos para la iglesia
          </div>
          <h1
            className="font-serif font-medium leading-[1.04] tracking-[-0.015em] text-ink"
            style={{ fontSize: "clamp(46px, 6vw, 78px)" }}
          >
            Material para seguir a Cristo,{" "}
            <em className="italic text-accent">juntos.</em>
          </h1>
          <p className="mt-7 max-w-[570px] text-[19px] leading-relaxed text-muted">
            Libros cortos, guías de discipulado y estudios bíblicos semanales,
            pensados para grupos pequeños y para el acompañamiento uno a uno.
            Gratis para descargar, compartir y usar en tu iglesia.
          </p>
          <div className="mt-10 flex flex-wrap gap-3.5">
            <Link
              href="/recursos"
              className="inline-flex items-center gap-2 rounded-[4px] bg-accent px-7 py-[15px] text-[15px] font-semibold text-white transition-colors hover:bg-accent-dark"
            >
              Explorar recursos →
            </Link>
            <Link
              href="/recursos"
              className="rounded-[4px] border border-[#d8ccb9] px-[26px] py-[15px] text-[15px] font-semibold text-ink transition-colors hover:bg-[#efe8dc]"
            >
              Ver estudios bíblicos
            </Link>
          </div>
        </div>

        <div className="relative min-h-[420px] self-stretch lg:min-h-[540px]">
          <div className="absolute -inset-0.5 rotate-[-1.6deg] rounded-xl border border-line2" />
          <Image
            src="/hero/hero-grupo.jpg"
            alt="Dos personas estudiando juntas la Biblia"
            fill
            sizes="(max-width: 1024px) 100vw, 430px"
            priority
            className="rounded-[11px] object-cover shadow-[0_26px_52px_-22px_rgba(33,26,20,0.42)]"
          />
        </div>
      </section>

      {/* ===================== DESTACADO ===================== */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[380px_1fr] lg:gap-[72px] lg:py-[90px]">
          <div className="relative mx-auto w-full max-w-[320px] lg:max-w-none">
            <div className="absolute left-4 top-4 z-10 rounded-[3px] bg-accent px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white">
              Nuevo
            </div>
            <Image
              src={featured.cover}
              alt={featured.title}
              width={760}
              height={1074}
              sizes="(max-width: 1024px) 320px, 380px"
              className="w-full rounded-md shadow-[0_24px_50px_-18px_rgba(33,26,20,0.45)]"
            />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
              Destacado
            </div>
            <h2
              className="mt-3.5 font-serif font-medium leading-[1.08] tracking-[-0.01em] text-ink"
              style={{ fontSize: "clamp(34px, 4vw, 46px)" }}
            >
              {featured.title}
            </h2>
            <p className="mt-2 font-serif text-[21px] italic text-muted">
              {featured.subtitle}
            </p>
            {featured.author && (
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.04em] text-faint">
                Por {featured.author}
              </p>
            )}
            <p className="mt-5 max-w-[520px] text-[17px] leading-[1.65] text-body">
              {featured.desc}
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Link
                href={`/recursos/${featured.slug}`}
                className="inline-flex items-center gap-2 rounded-[4px] bg-accent px-[26px] py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-accent-dark"
              >
                Ver recurso →
              </Link>
              <a
                href={`/api/descargar/${featured.slug}`}
                className="inline-flex items-center gap-2 rounded-[4px] border border-[#d8ccb9] px-6 py-3.5 text-[15px] font-semibold text-ink transition-colors hover:bg-[#efe8dc]"
              >
                Descargar PDF
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== ESTUDIOS ===================== */}
      <section className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 lg:py-24">
        <div className="mb-11 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
              Para grupos pequeños
            </div>
            <h2 className="mt-3 font-serif text-[38px] font-medium leading-tight tracking-[-0.01em] text-ink">
              Estudios bíblicos
            </h2>
          </div>
          <Link
            href="/recursos"
            className="border-b-[1.5px] border-accent pb-0.5 text-[15px] font-semibold text-ink transition-colors hover:text-accent"
          >
            Ver todos los recursos →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-7 gap-y-9 sm:grid-cols-3">
          {guides.map((r) => (
            <ResourceCard key={r.slug} resource={r} />
          ))}
        </div>
      </section>

      {/* ===================== CITA ===================== */}
      <section className="bg-accent px-5 py-24 text-white sm:px-8 lg:py-28">
        <div className="mx-auto max-w-[880px] text-center">
          <p
            className="font-serif font-normal italic leading-[1.32]"
            style={{ fontSize: "clamp(28px, 3.6vw, 42px)" }}
          >
            «Id, pues, y haced discípulos a todas las naciones… enseñándoles que
            guarden todas las cosas que os he mandado.»
          </p>
          <div className="mt-7 text-[13px] font-bold uppercase tracking-[0.2em] opacity-80">
            Mateo 28:19–20
          </div>
        </div>
      </section>

      {/* ===================== CÓMO USAR ===================== */}
      <section className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto mb-14 max-w-[620px] text-center">
          <div className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
            Sencillo de empezar
          </div>
          <h2 className="mt-3 font-serif text-[38px] font-medium leading-tight tracking-[-0.01em] text-ink">
            Cómo usar SIGUE
          </h2>
        </div>
        <div className="grid gap-12 md:grid-cols-3">
          {[
            {
              n: "01",
              t: "Elige un recurso",
              d: "Explora los libros y estudios bíblicos y descarga el que se ajuste a tu grupo.",
            },
            {
              n: "02",
              t: "Reúne tu grupo",
              d: "Cada guía está pensada para un grupo pequeño o para el discipulado uno a uno.",
            },
            {
              n: "03",
              t: "Descarga y comparte",
              d: "Imprime, reenvía y multiplica. Todo el material es gratuito para la iglesia.",
            },
          ].map((step) => (
            <div key={step.n} className="border-t-[1.5px] border-line pt-6">
              <div className="font-serif text-[34px] leading-none text-accent">
                {step.n}
              </div>
              <h3 className="mb-2 mt-4 text-lg font-bold text-ink">{step.t}</h3>
              <p className="text-[15.5px] leading-relaxed text-muted">{step.d}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
