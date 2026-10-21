"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, Newspaper } from "lucide-react";
import { getNoticias, formatearFecha, type Noticia } from "@/lib/api";
import ImagenNoticia from "@/components/ImagenNoticia";
import Boton from "@/components/ui/Boton";

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
      <section className="w-full bg-surface py-space-xl">
        <div className="mx-auto max-w-contenido px-margin">
          <p className="animate-pulse text-center text-body-md text-tinta-2">
            Cargando noticias...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full bg-surface py-space-xl">
        <div className="mx-auto flex max-w-contenido flex-col items-center gap-space-sm px-margin text-center">
          <h2 className="font-display text-headline-md font-extrabold text-tinta">
            No se pudieron cargar las noticias
          </h2>
          <p className="text-body-md text-tinta-2">
            Revisa la conexión con el servidor e inténtalo de nuevo.
          </p>
          <Boton onClick={reintentar} className="mt-2">
            Reintentar
          </Boton>
        </div>
      </section>
    );
  }

  if (noticias.length === 0) {
    return (
      <section className="w-full bg-surface py-space-xl">
        <div className="mx-auto flex max-w-contenido flex-col items-center gap-space-sm px-margin text-center">
          <Newspaper aria-hidden className="h-10 w-10 text-tinta-3" />
          <h2 className="font-display text-headline-md font-extrabold text-tinta">
            No hay noticias publicadas
          </h2>
          <p className="text-body-md text-tinta-2">
            Las noticias publicadas aparecerán aquí.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-surface py-space-xl">
      <div className="mx-auto flex max-w-contenido flex-col gap-space-lg px-margin">
        <div className="flex flex-col gap-space-md rounded-2xl bg-white p-space-md shadow-tarjeta sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-headline-md font-extrabold tracking-tight text-tinta">
              Todas las noticias
            </h2>
            <p className="mt-1 text-body-sm text-tinta-2">
              {filtradas.length} de {noticias.length} noticias
            </p>
          </div>

          <div className="flex flex-wrap items-end gap-3">
            <div>
              <label
                htmlFor="filtro-fecha"
                className="block font-display text-label-sm font-medium text-tinta-2"
              >
                Filtrar por fecha
              </label>
              <input
                id="filtro-fecha"
                type="date"
                value={fecha}
                onChange={(evento) => setFecha(evento.target.value)}
                className="mt-1 rounded-lg border border-hueso-4 bg-white px-3 py-2 text-base text-tinta focus:outline-none sm:text-body-md focus:ring-2 focus:ring-primary"
              />
            </div>

            <button
              type="button"
              onClick={() => setFecha("")}
              disabled={!fecha}
              className="rounded-lg border border-hueso-4 px-4 py-2 font-display text-label-sm font-semibold text-tinta-2 transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              Limpiar
            </button>
          </div>
        </div>

        {filtradas.length === 0 ? (
          <div className="flex flex-col items-center gap-space-sm rounded-2xl bg-white p-space-lg text-center shadow-tarjeta">
            <h2 className="font-display text-headline-md font-extrabold text-tinta">
              No hay noticias en esa fecha
            </h2>
            <p className="text-body-md text-tinta-2">
              Prueba con otra fecha o limítate el filtro.
            </p>
            <Boton onClick={() => setFecha("")}>Ver todas las noticias</Boton>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-gutter-lg sm:grid-cols-2 lg:grid-cols-3">
            {filtradas.map((noticia) => (
              <article
                key={noticia.id}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-tarjeta transition-all duration-300 hover:-translate-y-1.5 hover:shadow-tarjeta-hover"
              >
                <div className="relative h-48 w-full overflow-hidden bg-hueso-3">
                  <ImagenNoticia
                    src={noticia.imagen_url}
                    alt={noticia.titulo}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-space-sm top-space-sm rounded-full bg-primary px-space-sm py-1 font-display text-label-sm font-bold uppercase text-white">
                    {noticia.categoria || "Institucional"}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-space-md">
                  <span className="inline-flex items-center gap-1.5 font-display text-label-sm uppercase tracking-wider text-tinta-3">
                    <CalendarDays aria-hidden className="h-4 w-4" />
                    {formatearFecha(noticia.fecha_publicacion)}
                  </span>

                  <h3 className="mt-2 font-display text-headline-sm font-extrabold leading-snug tracking-tight text-tinta transition-colors group-hover:text-primary">
                    {noticia.titulo}
                  </h3>

                  {noticia.resumen ? (
                    <p className="mt-3 line-clamp-3 text-body-sm leading-relaxed text-tinta-2">
                      {noticia.resumen}
                    </p>
                  ) : null}

                  <Link
                    href={`/noticias/${noticia.slug}`}
                    className="mt-auto inline-flex items-center gap-1 pt-space-md font-display text-label-md font-semibold text-primary transition-colors hover:text-primary-dark"
                  >
                    Leer noticia
                    <ArrowRight
                      aria-hidden
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    />
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
