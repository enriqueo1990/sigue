import { NextResponse } from "next/server";
import { getResource } from "@/lib/resources";
import { getDownloadCount } from "@/lib/redis";

/** Devuelve el número de descargas de un recurso (null si Upstash no está configurado). */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (!getResource(slug)) {
    return NextResponse.json({ count: null }, { status: 404 });
  }
  const count = await getDownloadCount(slug);
  return NextResponse.json({ count });
}
