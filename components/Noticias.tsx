"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getNoticias, formatearFecha, type Noticia } from "@/lib/api";

const IMAGEN_PREDETERMINADA =
  "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1800&q=85";

function TarjetaSecundaria({ noticia }: { noticia: Noticia }) {
  return (
    <Link
      href={`/noticias/${noticia.slug}`}
      className="group flex gap-3 rounded-xl bg-white/10 p-3 ring-1 ring-white/15 backdrop-blur-sm transition hover:bg-white/20"
    >
      <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-black/40">
        <Image
          src={noticia.imagen_url || IMAGEN_PREDETERMINADA}
          alt=""
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0">
        <p className="line-clamp-2 text-sm font-semibold leading-5 group-hover:text-[#F7F3EA]">
          {noticia.titulo}
        </p>
        <p className="mt-1 text-xs text-white/70">
          {formatearFecha(noticia.fecha_publicacion)}
        </p>
      </div>
    </Link>
  );
}

export default function Noticias() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  const cargarNoticias = useCallback(() => {
    getNoticias()
      .then((datos) => {
        setNoticias(datos);
        setError(false);
      })
      .catch((err) => {
        console.error("Error al cargar noticias:", err);
        setError(true);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  function reintentar() {
    setCargando(true);
    setError(false);
    cargarNoticias();
  }

  useEffect(() => {
    void cargarNoticias();
  }, [cargarNoticias]);

  if (cargando) {
    return (
      <section className="flex min-h-[480px] items-center justify-center bg-[#111827] text-white">
        <p className="animate-pulse text-lg">Cargando noticias...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex min-h-[350px] items-center justify-center bg-[#111827] px-6 text-center text-white">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#A6192E]">
            Actualidad SEDEDE
          </p>
          <h2 className="mt-3 text-2xl font-bold">
            No se pudieron cargar las noticias
          </h2>
          <p className="mt-2 text-white/75">
            Revisa la conexión con el servidor e inténtalo de nuevo.
          </p>
          <button
            type="button"
            onClick={reintentar}
            className="mt-6 rounded-lg bg-[#A6192E] px-6 py-3 font-semibold transition hover:bg-[#7F1424]"
          >
            Reintentar
          </button>
        </div>
      </section>
    );
  }

  if (noticias.length === 0) {
    return (
      <section className="flex min-h-[350px] items-center justify-center bg-gray-100 px-6 text-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#A6192E]">
            Actualidad SEDEDE
          </p>
          <h2 className="mt-3 text-2xl font-bold text-gray-900">
            No hay noticias publicadas
          </h2>
          <p className="mt-2 text-gray-600">
            Las noticias publicadas aparecerán aquí.
          </p>
        </div>
      </section>
    );
  }

  const destacada = noticias.find((n) => n.destacada) ?? noticias[0];
  const secundarias = noticias
    .filter((n) => n.id !== destacada.id)
    .slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-[#101318] text-white">
      {/* Imagen de fondo de la noticia destacada */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url("${destacada.imagen_url || IMAGEN_PREDETERMINADA}")`,
        }}
      />

      {/* Oscurece la imagen para que el texto se lea */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

      <div className="relative mx-auto flex min-h-[620px] max-w-[1800px] flex-col justify-center gap-10 px-6 py-16 sm:px-10 lg:flex-row lg:items-center lg:px-16">
        {/* Noticia destacada */}
        <div className="max-w-5xl flex-1 animate-[fadeIn_0.6s_ease-out]">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-1 w-12 rounded-full bg-[#A6192E]" />
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-white sm:text-base">
              {destacada.destacada ? "Noticia destacada" : "Actualidad SEDEDE"}
            </span>
          </div>

          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-white/75 sm:text-sm">
            {destacada.categoria || "Institucional"} ·{" "}
            {formatearFecha(destacada.fecha_publicacion)}
          </p>

          <h2 className="max-w-5xl text-3xl font-extrabold uppercase leading-[1.12] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            {destacada.titulo}
          </h2>

          {destacada.resumen && (
            <p className="mt-6 max-w-3xl text-base leading-7 text-white/90 sm:text-lg sm:leading-8 md:text-xl">
              {destacada.resumen}
            </p>
          )}

          <Link
            href={`/noticias/${destacada.slug}`}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#A6192E] px-7 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#7F1424] focus:outline-none focus:ring-2 focus:ring-white sm:px-10 sm:text-base"
          >
            Leer noticia completa
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Otras noticias, pequeñas al costado */}
        {secundarias.length > 0 && (
          <>
            <aside className="hidden w-80 shrink-0 flex-col gap-4 lg:flex">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                Otras noticias
              </p>
              {secundarias.map((noticia) => (
                <TarjetaSecundaria key={noticia.id} noticia={noticia} />
              ))}
            </aside>

            <div className="grid gap-3 sm:grid-cols-3 lg:hidden">
              {secundarias.map((noticia) => (
                <TarjetaSecundaria key={noticia.id} noticia={noticia} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
