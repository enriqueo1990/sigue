import type { Metadata } from "next";
import type { Resource } from "./resources";

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

/* ───────────────────────── Datos estructurados (JSON-LD) ───────────────────────── */

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    description: SITE_DESCRIPTION,
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "es",
    description: SITE_DESCRIPTION,
  };
}

export function bookLd(resource: Resource) {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: resource.title,
    ...(resource.subtitle ? { alternativeHeadline: resource.subtitle } : {}),
    description: resource.desc,
    url: `${SITE_URL}/recursos/${resource.slug}`,
    image: `${SITE_URL}${resource.cover}`,
    inLanguage: "es",
    isAccessibleForFree: true,
    bookFormat: "https://schema.org/EBook",
    ...(resource.pages ? { numberOfPages: resource.pages } : {}),
    ...(resource.category ? { genre: resource.category } : {}),
    author: resource.author
      ? { "@type": "Person", name: resource.author }
      : { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}

export function breadcrumbLd(resource: Resource) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Recursos",
        item: `${SITE_URL}/recursos`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: resource.title,
        item: `${SITE_URL}/recursos/${resource.slug}`,
      },
    ],
  };
}
