"use client";

import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import ResourceCard from "./ResourceCard";
import type { Resource } from "@/lib/resources";

const filters = [
  { key: "todos", label: "Todos" },
  { key: "libros", label: "Libros" },
  { key: "estudios", label: "Estudios bíblicos" },
] as const;

type FilterKey = (typeof filters)[number]["key"];

export default function CatalogClient({ resources }: { resources: Resource[] }) {
  const [filter, setFilter] = useState<FilterKey>("todos");
  const [query, setQuery] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(resources, {
        keys: ["title", "subtitle", "desc", "includes", "category"],
        threshold: 0.4,
      }),
    [resources],
  );

  const results = useMemo(() => {
    let list = query.trim()
      ? fuse.search(query.trim()).map((r) => r.item)
      : resources;
    if (filter === "libros") list = list.filter((r) => r.type === "Libro");
    else if (filter === "estudios") list = list.filter((r) => r.type === "Estudio");
    return list;
  }, [resources, fuse, query, filter]);

  return (
    <>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2.5">
          {filters.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                className={`rounded-full border px-[18px] py-2.5 text-sm font-semibold transition-colors ${
                  active
                    ? "border-ink bg-ink text-papel"
                    : "border-line bg-transparent text-muted hover:border-faint"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por título o tema…"
          aria-label="Buscar recursos"
          className="w-full rounded-full border border-line bg-surface px-5 py-2.5 text-sm text-ink placeholder:text-faint focus:border-accent focus:outline-none sm:w-72"
        />
      </div>

      {results.length === 0 ? (
        <p className="mt-20 text-center text-[17px] text-muted">
          No encontramos recursos para tu búsqueda.
        </p>
      ) : (
        <div className="mt-11 grid grid-cols-2 gap-x-7 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {results.map((r) => (
            <ResourceCard key={r.slug} resource={r} />
          ))}
        </div>
      )}
    </>
  );
}
