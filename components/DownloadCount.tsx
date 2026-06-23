"use client";

import { useEffect, useState } from "react";

export default function DownloadCount({ slug }: { slug: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    fetch(`/api/conteo/${slug}`)
      .then((r) => r.json())
      .then((d) => {
        if (active) setCount(typeof d.count === "number" ? d.count : null);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [slug]);

  // No mostramos nada hasta que haya al menos una descarga real.
  if (!count || count < 1) return null;

  const formatted = new Intl.NumberFormat("es-ES").format(count);
  return (
    <p className="mt-3 text-center text-[13px] text-faint">
      {formatted} {count === 1 ? "descarga" : "descargas"}
    </p>
  );
}
