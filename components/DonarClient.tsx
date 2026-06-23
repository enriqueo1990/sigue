"use client";

import { useState } from "react";

const amounts = [10, 25, 50, 100];

export default function DonarClient() {
  const [amount, setAmount] = useState(25);
  const [monthly, setMonthly] = useState(false);
  const [showNotice, setShowNotice] = useState(false);

  return (
    <main className="mx-auto max-w-[760px] px-5 pb-24 pt-20 text-center sm:px-8">
      <div className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
        Apoya la obra
      </div>
      <h1
        className="mt-4 font-serif font-medium leading-[1.07] tracking-[-0.015em] text-ink"
        style={{ fontSize: "clamp(38px, 4.8vw, 58px)" }}
      >
        Tu ofrenda multiplica estos recursos.
      </h1>
      <p className="mx-auto mt-6 max-w-[560px] text-lg leading-[1.7] text-body">
        Todo el material de SIGUE es y seguirá siendo gratuito. Las donaciones
        cubren la producción, edición y traducción de nuevos libros y estudios
        para la iglesia hispanohablante.
      </p>

      <div className="mt-11 rounded-[10px] border border-line bg-surface p-9 text-left">
        <div className="text-[13px] font-bold uppercase tracking-[0.04em] text-faint">
          Elige un monto
        </div>
        <div className="mt-4 grid grid-cols-4 gap-3">
          {amounts.map((v) => {
            const active = amount === v;
            return (
              <button
                key={v}
                type="button"
                onClick={() => setAmount(v)}
                className={`rounded-md border py-4 text-lg font-bold transition-colors ${
                  active
                    ? "border-accent bg-accent text-white"
                    : "border-[#e0d6c6] bg-white text-ink hover:border-faint"
                }`}
              >
                ${v}
              </button>
            );
          })}
        </div>

        <div className="mt-3.5 flex flex-wrap items-center gap-3.5">
          <button
            type="button"
            onClick={() => setMonthly((v) => !v)}
            className="rounded-full border border-ink bg-ink px-4 py-2.5 text-[13.5px] font-bold text-papel"
          >
            {monthly ? "Mensual" : "Una vez"}
          </button>
          <span className="text-sm text-muted">
            Toca para alternar entre donación única y mensual.
          </span>
        </div>

        <button
          type="button"
          onClick={() => setShowNotice(true)}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-[5px] bg-accent px-4 py-4 text-[17px] font-bold text-white transition-colors hover:bg-accent-dark"
        >
          Donar ${amount}
          {monthly ? " al mes" : ""}
        </button>

        {showNotice && (
          <div className="mt-4 rounded-md border border-line bg-papel px-4 py-3 text-center text-sm text-body">
            Estamos habilitando las donaciones en línea. Mientras tanto,{" "}
            <span className="font-semibold text-ink">escríbenos</span> y con gusto
            coordinamos tu ofrenda. ¡Gracias por tu apoyo!
          </div>
        )}

        <p className="mt-4 text-center text-[13px] text-faint">
          Donación segura · SIGUE es un ministerio sin fines de lucro
        </p>
      </div>

      <p className="mt-8 text-[15px] leading-relaxed text-muted">
        ¿Prefieres donar por transferencia o apoyar de otra forma?{" "}
        <span className="font-semibold text-ink">Contáctanos</span> y con gusto te
        orientamos.
      </p>
    </main>
  );
}
