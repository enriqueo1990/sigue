import { Redis } from "@upstash/redis";

let client: Redis | null = null;

/**
 * Devuelve el cliente de Upstash solo si las variables de entorno están
 * configuradas. Si no, devuelve null y el sitio funciona igual (sin contador).
 */
function getRedis(): Redis | null {
  if (client) return client;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  client = new Redis({ url, token });
  return client;
}

export async function incrementDownload(slug: string): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  try {
    await redis.incr(`downloads:${slug}`);
  } catch {
    // Nunca bloqueamos una descarga por un fallo del contador.
  }
}

export async function getDownloadCount(slug: string): Promise<number | null> {
  const redis = getRedis();
  if (!redis) return null;
  try {
    return (await redis.get<number>(`downloads:${slug}`)) ?? 0;
  } catch {
    return null;
  }
}

/**
 * Lee de una sola vez el contador de varios recursos. Devuelve un mapa
 * slug → descargas, o null si Upstash no está configurado o falla.
 */
export async function getDownloadCounts(
  slugs: string[],
): Promise<Record<string, number> | null> {
  const redis = getRedis();
  if (!redis || slugs.length === 0) return null;
  try {
    const keys = slugs.map((s) => `downloads:${s}`);
    const values = await redis.mget<(number | null)[]>(...keys);
    const out: Record<string, number> = {};
    slugs.forEach((s, i) => {
      out[s] = values[i] ?? 0;
    });
    return out;
  } catch {
    return null;
  }
}
