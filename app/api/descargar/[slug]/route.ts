import { NextRequest, NextResponse } from "next/server";
import { getResource } from "@/lib/resources";
import { incrementDownload } from "@/lib/redis";

/**
 * Registra la descarga (contador en Upstash, si está configurado) y entrega el
 * PDF como adjunto (Content-Disposition: attachment) para que el navegador lo
 * descargue al dispositivo en vez de abrirlo en el visor.
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

  const fileUrl = new URL(resource.pdf, request.url);
  const upstream = await fetch(fileUrl);

  // Si por algún motivo no se puede leer el archivo, caemos a una redirección.
  if (!upstream.ok || !upstream.body) {
    return NextResponse.redirect(fileUrl, { status: 302 });
  }

  const filename = `SIGUE - ${resource.title}.pdf`;
  const headers = new Headers();
  headers.set("Content-Type", "application/pdf");
  headers.set(
    "Content-Disposition",
    `attachment; filename="${slug}.pdf"; filename*=UTF-8''${encodeURIComponent(filename)}`,
  );
  const length = upstream.headers.get("content-length");
  if (length) headers.set("Content-Length", length);
  headers.set("Cache-Control", "public, max-age=0, must-revalidate");

  return new NextResponse(upstream.body, { status: 200, headers });
}
