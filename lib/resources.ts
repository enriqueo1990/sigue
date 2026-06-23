import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ResourceType = "Libro" | "Estudio";

export interface Resource {
  slug: string;
  title: string;
  subtitle: string;
  type: ResourceType;
  typeLabel: string;
  author: string | null;
  accent: string;
  cover: string;
  pdf: string;
  epub: string | null;
  pages: number;
  category: string;
  featured: boolean;
  order: number;
  desc: string;
  includes: string[];
  quote: string;
  quoteRef: string;
  body: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "recursos");

export function getAllResources(): Resource[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));

  const resources = files.map((file): Resource => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data, content } = matter(raw);

    return {
      slug,
      title: data.title,
      subtitle: data.subtitle ?? "",
      type: data.type as ResourceType,
      typeLabel: data.typeLabel ?? data.type,
      author: data.author ?? null,
      accent: data.accent ?? "#C2462F",
      cover: data.cover,
      pdf: data.pdf,
      epub: data.epub ?? null,
      pages: Number(data.pages ?? 0),
      category: data.category ?? "",
      featured: Boolean(data.featured),
      order: Number(data.order ?? 99),
      desc: data.desc ?? "",
      includes: data.includes ?? [],
      quote: data.quote ?? "",
      quoteRef: data.quoteRef ?? "",
      body: content.trim(),
    };
  });

  return resources.sort((a, b) => a.order - b.order);
}

export function getResource(slug: string): Resource | undefined {
  return getAllResources().find((r) => r.slug === slug);
}

export function getFeaturedResource(): Resource {
  const all = getAllResources();
  return all.find((r) => r.featured) ?? all[0];
}

export function getResourcesByType(type: ResourceType): Resource[] {
  return getAllResources().filter((r) => r.type === type);
}
