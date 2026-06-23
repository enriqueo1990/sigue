# SIGUE — Recursos cristianos gratuitos

Sitio web de [siguerecursos.com](https://siguerecursos.com): libros cortos, guías de
discipulado y estudios bíblicos gratuitos en PDF para grupos pequeños y la iglesia local.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** — tokens de diseño en `app/globals.css`
- **Contenido en Markdown** (`content/recursos/`) leído con `gray-matter`
- **Buscador** con `fuse.js` (en el navegador, sin base de datos)
- **Contador de descargas** con Upstash Redis (opcional)
- **Newsletter** con MailerLite (opcional)
- Tipografías: Newsreader + Hanken Grotesk (`next/font`)

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
```

## Variables de entorno

El sitio funciona sin ninguna variable (sin contador y guardando los correos solo en
consola). Para activar las integraciones, copia `.env.example` a `.env.local` y completa:

| Variable | Para qué |
|---|---|
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | Contador de descargas |
| `MAILERLITE_API_KEY` / `MAILERLITE_GROUP_ID` | Suscripción al newsletter |

## Agregar un nuevo recurso

1. Crea `content/recursos/<slug>.md` con el frontmatter (mira los existentes como modelo).
2. Coloca la portada en `public/covers/` y el PDF en `public/pdfs/`.
3. Listo: aparece en el catálogo, se genera su página `/recursos/<slug>` y entra al sitemap.

No hace falta tocar código ni base de datos.

## Estructura

```
app/                 Rutas (Inicio, Recursos, Detalle, Acerca, Donar) + APIs
components/           Header, Footer, tarjetas, formularios, catálogo
content/recursos/     Los recursos en Markdown
lib/                  Loader de contenido y cliente de Redis
public/               Logos, portadas, PDFs, EPUB
_reference/           Diseño original de Claude Design (solo referencia)
```

## Despliegue

Pensado para **Vercel** (conectar el repo de GitHub). Si el tráfico de descargas crece,
mover los PDFs a **Cloudflare R2** sin tocar los botones: solo cambia el destino de la
redirección en `app/api/descargar/[slug]/route.ts`.
