"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getNoticias, formatearFecha, type Noticia } from "@/lib/api";

export default function ListadoNoticias() {
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
      <section className="bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="animate-pulse text-center text-gray-500">
            Cargando noticias...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gray-50 px-6 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          No se pudieron cargar las noticias
        </h2>
        <p className="mt-2 text-gray-600">
          Revisa la conexión con el servidor e inténtalo de nuevo.
        </p>
        <button
          type="button"
          onClick={reintentar}
          className="mt-6 rounded-lg bg-[#A6192E] px-6 py-3 font-semibold text-white transition hover:bg-[#7F1424]"
        >
          Reintentar
        </button>
      </section>
    );
  }

  if (noticias.length === 0) {
    return (
      <section className="bg-gray-50 px-6 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          No hay noticias publicadas
        </h2>
        <p className="mt-2 text-gray-600">
          Las noticias publicadas aparecerán aquí.
        </p>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 px-6 py-16">
      <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {noticias.map((noticia) => (
          <article
            key={noticia.id}
            className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative h-48 w-full bg-gray-200">
              <Image
                src={
                  noticia.imagen_url ||
                  "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80"
                }
                alt={noticia.titulo}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition duration-300 group-hover:scale-105"
              />
            </div>

            <div className="p-6">
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-[#A6192E]">
                <span>{noticia.categoria || "Institucional"}</span>
                <span className="text-gray-400">·</span>
                <span className="text-gray-500">
                  {formatearFecha(noticia.fecha_publicacion)}
                </span>
              </div>

              <h2 className="mt-3 text-xl font-bold leading-6 text-gray-900 transition group-hover:text-[#A6192E]">
                {noticia.titulo}
              </h2>

              {noticia.resumen && (
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                  {noticia.resumen}
                </p>
              )}

              <Link
                href={`/noticias/${noticia.slug}`}
                className="mt-4 inline-block text-sm font-semibold text-[#A6192E] hover:underline"
              >
                Leer noticia →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
