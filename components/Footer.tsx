import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/seo";

const footerLinks = [
  { href: "/", label: "Inicio" },
  { href: "/recursos", label: "Recursos" },
  { href: "/acerca", label: "Acerca de" },
  { href: "/donar", label: "Donar" },
];

export default function Footer() {
  return (
    <footer className="bg-night text-night-text">
      <div className="mx-auto max-w-[1180px] px-5 py-16 sm:px-8">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div className="max-w-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/logo-sigue-blanco.png" alt="SIGUE" className="h-6 w-auto" />
            <p className="mt-5 text-[14.5px] leading-relaxed">
              Recursos gratuitos de discipulado para la iglesia. Producidos a
              partir de predicaciones y enseñanzas de pastores.
            </p>
            {/* Newsletter: pendiente para fase 2. Para reactivarlo, volver a importar
                y renderizar <NewsletterForm /> (el componente y la API /api/suscribir
                siguen en el repo). */}
          </div>

          <div className="flex flex-col gap-3">
            <div className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-[#6e6358]">
              Navegar
            </div>
            {footerLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[14.5px] text-[#d8cfc2] transition-colors hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <div className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-[#6e6358]">
              Contacto
            </div>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-[14.5px] text-[#d8cfc2] transition-colors hover:text-white"
            >
              {CONTACT_EMAIL}
            </a>
            <p className="max-w-[220px] text-[13.5px] leading-relaxed text-[#6e6358]">
              ¿Dudas, sugerencias o quieres aportar un recurso? Escríbenos.
            </p>
          </div>
        </div>

        <div className="mt-11 flex flex-col justify-between gap-3 border-t border-[#3a322a] pt-6 text-[13px] text-[#6e6358] sm:flex-row">
          <span>© 2026 SIGUE</span>
          <span>Hecho para la iglesia · Gratis para compartir</span>
        </div>
      </div>
    </footer>
  );
}
