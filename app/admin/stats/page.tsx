import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllResources } from "@/lib/resources";
import { getDownloadCounts } from "@/lib/redis";

// Siempre fresco: leemos los contadores de Redis en cada visita.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Estadísticas",
  robots: { index: false, follow: false },
};

const nf = new Intl.NumberFormat("es-ES");

export default async function StatsPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const token = process.env.STATS_TOKEN;
  const { key } = await searchParams;
  // Sin token configurado, o si no coincide, la página no existe.
  if (!token || key !== token) notFound();

  const resources = getAllResources();
  const counts = await getDownloadCounts(resources.map((r) => r.slug));
  const redisOff = counts === null;

  const rows = resources
    .map((r) => ({
      slug: r.slug,
      title: r.title,
      typeLabel: r.typeLabel,
      accent: r.accent,
      count: counts?.[r.slug] ?? 0,
    }))
    .sort((a, b) => b.count - a.count);

  const total = rows.reduce((sum, r) => sum + r.count, 0);
  const max = Math.max(1, ...rows.map((r) => r.count));

  return (
    <main className="mx-auto max-w-[820px] px-5 pb-24 pt-12 sm:px-8">
      <div className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
        Panel privado
      </div>
      <h1 className="mt-3 font-serif text-[40px] font-medium leading-tight tracking-[-0.015em] text-ink">
        Descargas por recurso
      </h1>
      <p className="mt-3 text-[17px] text-muted">
        {nf.format(total)} descargas en total · {rows.length} recursos
      </p>

      {redisOff && (
        <p className="mt-6 rounded-md border border-line bg-surface px-5 py-4 text-[15px] text-muted">
          El contador (Upstash) no está configurado en este entorno, así que los
          números aparecen en cero. En producción se leen normalmente.
        </p>
      )}

      <div className="mt-10 border-t border-line">
        {rows.map((r, i) => (
          <div
            key={r.slug}
            className="flex items-center gap-5 border-b border-line py-4"
          >
            <span className="min-w-7 font-serif text-lg font-medium text-faint">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0 flex-1">
              <Link
                href={`/recursos/${r.slug}`}
                className="font-serif text-[19px] font-medium leading-snug text-ink transition-colors hover:text-accent"
              >
                {r.title}
              </Link>
              <div
                className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.14em]"
                style={{ color: r.accent }}
              >
                {r.typeLabel}
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(r.count / max) * 100}%`,
                    backgroundColor: r.accent,
                  }}
                />
              </div>
            </div>
            <div className="min-w-[72px] text-right">
              <span className="font-serif text-2xl font-medium text-ink">
                {nf.format(r.count)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
