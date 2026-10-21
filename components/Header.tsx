"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Boton from "@/components/ui/Boton";

const enlaces = [
  { href: "/", texto: "Inicio" },
  { href: "/sedede", texto: "SEDEDE" },
  { href: "/asociaciones", texto: "Asociaciones" },
  { href: "/deportistas", texto: "Élite" },
  { href: "/noticias", texto: "Noticias" },
  { href: "/comunicados", texto: "Comunicados" },
  { href: "/eventos", texto: "Eventos" },
  { href: "/documentos", texto: "Documentos" },
];

export default function Header() {
  const [abierto, setAbierto] = useState(false);
  const pathname = usePathname();

  function activo(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full bg-surface/90 shadow-header backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-contenido items-center justify-between gap-space-md px-margin">
        <Link href="/" className="group flex items-center gap-space-sm focus:outline-none">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary shadow-[0_4px_12px_rgba(155,11,36,0.2)] transition-transform duration-300 group-hover:scale-105">
            <span className="font-display text-headline-md font-black leading-none text-white">
              S
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-display text-headline-sm font-extrabold uppercase leading-tight tracking-tight text-tinta">
              SEDEDE
            </span>
            <span className="font-display text-label-sm font-semibold uppercase tracking-wider text-tinta-2">
              Servicio Departamental de Deportes
            </span>
          </div>
        </Link>

        <nav className="hidden h-full items-center gap-space-md lg:flex">
          {enlaces.map((enlace) => (
            <Link
              key={enlace.href}
              href={enlace.href}
              aria-current={activo(enlace.href) ? "page" : undefined}
              className="flex h-full items-center px-space-xs transition-colors"
            >
              <span
                className={`border-b-2 pb-1 transition-colors ${
                  activo(enlace.href)
                    ? "border-primary font-display text-headline-sm font-bold text-primary"
                    : "border-transparent font-display text-label-md text-tinta-2 hover:text-tinta"
                }`}
              >
                {enlace.texto}
              </span>
            </Link>
          ))}

          <Boton href="/contacto" tamano="sm" className="ml-space-xs">
            Contacto
          </Boton>
        </nav>

        <button
          type="button"
          onClick={() => setAbierto((valor) => !valor)}
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={abierto}
          className="flex h-10 w-10 items-center justify-center rounded-full text-tinta-2 transition-colors hover:bg-hueso-3 hover:text-tinta lg:hidden"
        >
          {abierto ? (
            <X aria-hidden className="h-5 w-5" />
          ) : (
            <Menu aria-hidden className="h-5 w-5" />
          )}
        </button>
      </div>

      {abierto && (
        <nav className="border-t border-hueso-4 bg-surface px-margin pb-space-md pt-space-sm shadow-header lg:hidden">
          {enlaces.map((enlace) => (
            <Link
              key={enlace.href}
              href={enlace.href}
              onClick={() => setAbierto(false)}
              aria-current={activo(enlace.href) ? "page" : undefined}
              className={`block border-b border-hueso-3 py-space-sm pl-space-sm font-display text-label-md transition-colors ${
                activo(enlace.href)
                  ? "border-l-2 border-primary font-bold text-primary"
                  : "text-tinta-2 hover:text-primary"
              }`}
            >
              {enlace.texto}
            </Link>
          ))}

          <Boton href="/contacto" tamano="sm" className="mt-space-md w-full">
            Contacto
          </Boton>
        </nav>
      )}
    </header>
  );
}
