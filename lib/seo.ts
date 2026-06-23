import type { Metadata } from "next";

export const SITE_URL = "https://siguerecursos.com";
export const SITE_NAME = "SIGUE";
export const SITE_DESCRIPTION =
  "Libros cortos, guías de discipulado y estudios bíblicos gratuitos en PDF, pensados para grupos pequeños y la iglesia local.";

const DEFAULT_OG_IMAGE = "/og/og-default.png";

/**
 * Devuelve los metadatos sociales (Open Graph + Twitter + canonical) completos
 * y consistentes para una página. La imagen por defecto es la del sitio; las
 * páginas de recurso pasan su propia tarjeta 1200x630.
 */
export function socialMeta({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Pick<Metadata, "alternates" | "openGraph" | "twitter"> {
  const images = [{ url: image, width: 1200, height: 630, alt: title }];
  return {
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "es_ES",
      siteName: SITE_NAME,
      url: path,
      title,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
