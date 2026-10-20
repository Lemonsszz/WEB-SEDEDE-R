"use client";

import { useState } from "react";
import Link from "next/link";

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

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#A6192E] text-white font-bold">
            S
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              SEDEDE
            </h1>
            <p className="text-xs text-gray-500">
              Servicio Departamental de Deportes
            </p>
          </div>
        </Link>

        {/* Navegación escritorio */}
        <nav className="hidden items-center gap-7 md:flex">
          {enlaces.map((enlace) => (
            <Link
              key={enlace.href}
              href={enlace.href}
              className="text-sm font-medium text-gray-600 hover:text-[#A6192E]"
            >
              {enlace.texto}
            </Link>
          ))}

          <Link
            href="/contacto"
            className="rounded-xl bg-[#A6192E] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#7F1424] hover:shadow-md"
          >
            Contacto
          </Link>
        </nav>

        {/* Botón menú móvil */}
        <button
          type="button"
          onClick={() => setAbierto((valor) => !valor)}
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={abierto}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-gray-700 transition hover:text-[#A6192E] md:hidden"
        >
          <span className="text-xl leading-none">{abierto ? "✕" : "☰"}</span>
        </button>

      </div>

      {/* Menú móvil (drawer) */}
      {abierto && (
        <nav className="border-t border-gray-200 bg-white px-6 pb-6 pt-2 md:hidden">
          {enlaces.map((enlace) => (
            <Link
              key={enlace.href}
              href={enlace.href}
              onClick={() => setAbierto(false)}
              className="block border-b border-gray-100 py-3 text-sm font-medium text-gray-700 transition hover:text-[#A6192E]"
            >
              {enlace.texto}
            </Link>
          ))}

          <Link
            href="/contacto"
            onClick={() => setAbierto(false)}
            className="mt-4 block rounded-xl bg-[#A6192E] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#7F1424]"
          >
            Contacto
          </Link>
        </nav>
      )}
    </header>
  );
}
