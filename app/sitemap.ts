import type { MetadataRoute } from "next";
import { getAllResources } from "@/lib/resources";

const BASE = "https://siguerecursos.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/recursos`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/acerca`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE}/donar`, changeFrequency: "yearly", priority: 0.5 },
  ];

  const resourceRoutes: MetadataRoute.Sitemap = getAllResources().map((r) => ({
    url: `${BASE}/recursos/${r.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...resourceRoutes];
}
