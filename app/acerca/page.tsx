import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Acerca de",
  description:
    "SIGUE reúne libros cortos, guías de discipulado y estudios bíblicos gratuitos para grupos pequeños y la iglesia hispanohablante.",
};

const values = [
  {
    t: "La Palabra en el centro",
    d: "Cada recurso conduce de vuelta a la Escritura y al evangelio.",
  },
  {
    t: "Para la iglesia local",
    d: "Hecho para usarse en grupos pequeños y discipulado personal.",
  },
  {
    t: "Gratis para todos",
    d: "Descarga, imprime y comparte sin costo ni restricciones.",
  },
];

export default function AcercaPage() {
  return (
    <main>
      <section className="mx-auto max-w-[1180px] px-5 pb-4 pt-20 sm:px-8">
        <div className="max-w-[760px]">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
            Acerca de SIGUE
          </div>
          <h1
            className="mt-4 font-serif font-medium leading-[1.05] tracking-[-0.015em] text-ink"
            style={{ fontSize: "clamp(40px, 5vw, 64px)" }}
          >
            Recursos para hacer discípulos, al alcance de toda la iglesia.
          </h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1180px] items-start gap-12 px-5 pb-20 pt-12 sm:px-8 lg:grid-cols-[1fr_420px] lg:gap-[72px]">
        <div>
          <p className="text-[19px] leading-[1.7] text-[#3f382f]">
            SIGUE nace de una convicción sencilla: cada creyente está llamado a
            seguir a Cristo y a ayudar a otros a hacer lo mismo. Por eso reunimos
            libros cortos, guías de discipulado y estudios bíblicos pensados para
            grupos pequeños y para el acompañamiento uno a uno.
          </p>
          <p className="mt-5 text-[17px] leading-[1.7] text-body">
            Todo nuestro material se produce a partir de predicaciones y
            enseñanzas de pastores, y se ofrece de forma gratuita para que ninguna
            iglesia, líder o grupo se quede sin recursos para crecer en la
            Palabra.
          </p>

          <div className="mt-10 border-t border-line pt-8">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
              Basado en las enseñanzas de
            </div>
            <div className="mt-5 grid gap-x-7 gap-y-6 sm:grid-cols-2">
              <div>
                <h3 className="font-serif text-xl font-medium text-ink">
                  Pastor Enrique Oriolo
                </h3>
                <a
                  href="https://ibdelagracia.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-[15px] text-muted underline-offset-2 transition-colors hover:text-accent hover:underline"
                >
                  Iglesia Bíblica de la Gracia ↗
                </a>
              </div>
              <div>
                <h3 className="font-serif text-xl font-medium text-ink">
                  Pastor Ricardo Daglio
                </h3>
                <p className="mt-1 text-[15px] leading-relaxed text-muted">
                  Iglesia Bíblica de Villa Regina y{" "}
                  <a
                    href="https://ibgeneralroca.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-2 transition-colors hover:text-accent hover:underline"
                  >
                    Iglesia Bíblica de General Roca ↗
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-7 sm:grid-cols-3">
            {values.map((v) => (
              <div key={v.t} className="border-t-[1.5px] border-line pt-[18px]">
                <h3 className="font-serif text-xl font-medium text-ink">{v.t}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">
                  {v.d}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-11 rounded-lg border border-line bg-surface px-8 py-7">
            <p className="font-serif text-[22px] italic leading-snug text-ink">
              El nombre lo dice todo:{" "}
              <span className="text-accent">SIGUE</span>. La marca une la cruz con
              una flecha, porque seguir a Jesús es avanzar tras Él, un paso a la
              vez.
            </p>
          </div>
        </div>

        <div className="relative min-h-[420px] self-stretch lg:min-h-[520px]">
          <div className="absolute -inset-0.5 rotate-[1.4deg] rounded-xl border border-line2" />
          <Image
            src="/hero/about-estudio.jpg"
            alt="Persona estudiando la Biblia y tomando notas"
            fill
            sizes="(max-width: 1024px) 100vw, 420px"
            className="rounded-[11px] object-cover shadow-[0_26px_52px_-22px_rgba(33,26,20,0.42)]"
          />
        </div>
      </section>

      <section className="bg-accent text-white">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-7 px-5 py-[72px] sm:px-8">
          <div className="max-w-[560px]">
            <h2 className="font-serif text-[34px] font-medium leading-tight">
              Estos recursos son gratuitos porque alguien los sostiene.
            </h2>
            <p className="mt-3.5 text-[16.5px] leading-relaxed opacity-90">
              Tu ofrenda hace posible producir, editar y traducir más material
              para la iglesia.
            </p>
          </div>
          <Link
            href="/donar"
            className="whitespace-nowrap rounded-[4px] bg-white px-8 py-4 text-base font-bold text-accent transition-colors hover:bg-papel"
          >
            Apoyar la obra →
          </Link>
        </div>
      </section>
    </main>
  );
}
