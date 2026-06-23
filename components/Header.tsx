"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/acerca", label: "Acerca de" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-papel/85 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1180px] items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/logo-sigue-negro.png" alt="SIGUE" className="h-6 w-auto" />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[14.5px] font-medium text-ink transition-colors hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/recursos"
            className="rounded-[4px] bg-accent px-[18px] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            Explorar recursos
          </Link>
          <Link
            href="/donar"
            className="rounded-[4px] border border-[#c9bca8] px-[17px] py-[9px] text-sm font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-papel"
          >
            Donar
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-md text-ink md:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-1 border-t border-line bg-papel px-5 py-4 md:hidden">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2 text-[15px] font-medium text-ink"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/recursos"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-[4px] bg-accent px-4 py-3 text-center text-sm font-semibold text-white"
          >
            Explorar recursos
          </Link>
          <Link
            href="/donar"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-[4px] border border-[#c9bca8] px-4 py-3 text-center text-sm font-semibold text-ink"
          >
            Donar
          </Link>
        </div>
      )}
    </header>
  );
}
