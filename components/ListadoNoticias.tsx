"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getNoticias, formatearFecha, type Noticia } from "@/lib/api";
import ImagenNoticia from "@/components/ImagenNoticia";

function claveFechaBolivia(fecha: string | null): string {
  if (!fecha) {
    return "";
  }

  const valor = new Date(fecha);

  if (Number.isNaN(valor.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/La_Paz",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(valor);
}

export default function ListadoNoticias() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [fecha, setFecha] = useState("");

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

  const filtradas = useMemo(() => {
    if (!fecha) {
      return noticias;
    }

    return noticias.filter(
      (noticia) => claveFechaBolivia(noticia.fecha_publicacion) === fecha
    );
  }, [noticias, fecha]);

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
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Todas las noticias
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {filtradas.length} de {noticias.length} noticias
            </p>
          </div>

          <div className="flex flex-wrap items-end gap-3">
            <div>
              <label
                htmlFor="filtro-fecha"
                className="block text-sm font-medium text-gray-700"
              >
                Filtrar por fecha
              </label>
              <input
                id="filtro-fecha"
                type="date"
                value={fecha}
                onChange={(evento) => setFecha(evento.target.value)}
                className="mt-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#A6192E]"
              />
            </div>

            <button
              type="button"
              onClick={() => setFecha("")}
              disabled={!fecha}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-[#A6192E] hover:text-[#A6192E] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Limpiar
            </button>
          </div>
        </div>

        {filtradas.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              No hay noticias en esa fecha
            </h2>
            <p className="mt-2 text-gray-600">
              Prueba con otra fecha o límpiate el filtro.
            </p>
            <button
              type="button"
              onClick={() => setFecha("")}
              className="mt-6 rounded-lg bg-[#A6192E] px-6 py-3 font-semibold text-white transition hover:bg-[#7F1424]"
            >
              Ver todas las noticias
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtradas.map((noticia) => (
              <article
                key={noticia.id}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                  <ImagenNoticia
                    src={noticia.imagen_url}
                    alt={noticia.titulo}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-[#A6192E] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                    {noticia.categoria || "Institucional"}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    {formatearFecha(noticia.fecha_publicacion)}
                  </p>

                  <h2 className="mt-2 text-xl font-bold leading-6 text-gray-900 transition group-hover:text-[#A6192E]">
                    {noticia.titulo}
                  </h2>

                  {noticia.resumen && (
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                      {noticia.resumen}
                    </p>
                  )}

                  <Link
                    href={`/noticias/${noticia.slug}`}
                    className="mt-5 inline-block text-sm font-semibold text-[#A6192E] hover:underline"
                  >
                    Leer noticia →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
