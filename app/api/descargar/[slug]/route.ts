import { NextRequest, NextResponse } from "next/server";
import { getResource } from "@/lib/resources";
import { incrementDownload } from "@/lib/redis";

/**
 * Registra la descarga (contador en Upstash, si está configurado) y redirige
 * al PDF. Pasar por aquí permite mover los PDFs a Cloudflare R2 en el futuro
 * sin tocar los botones del sitio.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const resource = getResource(slug);

  if (!resource) {
    return new NextResponse("Recurso no encontrado", { status: 404 });
  }

  await incrementDownload(slug);

  return NextResponse.redirect(new URL(resource.pdf, request.url), {
    status: 302,
  });
}
