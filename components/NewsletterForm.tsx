"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "ok" | "error";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/suscribir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string };
      if (res.ok) {
        setStatus("ok");
        setMessage(data.message ?? "¡Listo! Te avisaremos de cada nuevo recurso.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message ?? "No pudimos suscribirte. Intenta de nuevo.");
      }
    } catch {
      setStatus("error");
      setMessage("No pudimos suscribirte. Intenta de nuevo.");
    }
  }

  if (status === "ok") {
    return <p className="text-[14.5px] text-[#d8cfc2]">{message}</p>;
  }

  return (
    <form onSubmit={onSubmit} className="flex max-w-sm flex-col gap-2 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@correo.com"
        aria-label="Correo electrónico"
        className="min-w-0 flex-1 rounded-[4px] border border-[#3a322a] bg-transparent px-3 py-2.5 text-[14.5px] text-white placeholder:text-[#6e6358] focus:border-accent focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-[4px] bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark disabled:opacity-60"
      >
        {status === "loading" ? "Enviando…" : "Suscribirme"}
      </button>
      {status === "error" && (
        <p className="text-[13px] text-[#e0a99c] sm:hidden">{message}</p>
      )}
    </form>
  );
}
