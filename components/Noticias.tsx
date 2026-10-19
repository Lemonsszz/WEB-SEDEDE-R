
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getNoticias, type Noticia } from "@/lib/api";

const IMAGEN_PREDETERMINADA =
  "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1800&q=85";

function formatearFecha(fecha: string | null) {
  if (!fecha) return "Actualidad deportiva";

  return new Date(fecha).toLocaleDateString("es-BO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function Noticias() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [indice, setIndice] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    getNoticias()
      .then((datos) => {
        setNoticias(datos);
        setIndice(0);
      })
      .catch((error) => {
        console.error("Error al cargar noticias:", error);
      })
      .finally(() => setCargando(false));
  }, []);

  // Avanza automáticamente cada 6 segundos.
  useEffect(() => {
    if (pausado || noticias.length < 2) return;

    const intervalo = window.setInterval(() => {
      setIndice((actual) => (actual + 1) % noticias.length);
    }, 6000);

    return () => window.clearInterval(intervalo);
  }, [noticias.length, pausado]);

  function anterior() {
    setIndice((actual) =>
      actual === 0 ? noticias.length - 1 : actual - 1
    );
  }

  function siguiente() {
    setIndice((actual) => (actual + 1) % noticias.length);
  }

  if (cargando) {
    return (
      <section className="flex min-h-[480px] items-center justify-center bg-[#111827] text-white">
        <p className="animate-pulse text-lg">Cargando noticias...</p>
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

  const noticia = noticias[indice];

  return (
    <section
      className="relative overflow-hidden bg-[#101318] text-white"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocusCapture={() => setPausado(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPausado(false);
        }
      }}
    >
      {/* Imagen de fondo de la noticia activa */}
      <div
        key={noticia.id}
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url("${noticia.imagen_url || IMAGEN_PREDETERMINADA}")`,
        }}
      />

      {/* Oscurece la imagen para que el texto se lea */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

      <div className="relative mx-auto flex min-h-[560px] max-w-[1800px] flex-col justify-center px-6 pt-8 pb-16 sm:px-10 sm:pt-10 lg:min-h-[620px] lg:px-16 lg:pt-8">
        {/* Contenido de la noticia principal */}
        <div
          key={`contenido-${noticia.id}`}
          className="max-w-5xl -translate-y-5 animate-[fadeIn_0.6s_ease-out] pb-24 md:pb-10 md:pr-48 lg:pr-52"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-1 w-12 rounded-full bg-[#A6192E]" />
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-white sm:text-base">
              {noticia.destacada ? "Noticia destacada" : "Actualidad SEDEDE"}
            </span>
          </div>

          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-white/75 sm:text-sm">
            {noticia.categoria || "Institucional"} ·{" "}
            {formatearFecha(noticia.fecha_publicacion)}
          </p>

          <h2 className="max-w-5xl text-3xl font-extrabold uppercase leading-[1.12] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            {noticia.titulo}
          </h2>

          {noticia.resumen && (
            <p className="mt-6 max-w-3xl text-base leading-7 text-white/90 sm:text-lg sm:leading-8 md:text-xl">
              {noticia.resumen}
            </p>
          )}

          <Link
            href={`/noticias/${noticia.slug}`}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#A6192E] px-7 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#7F1424] focus:outline-none focus:ring-2 focus:ring-white sm:px-10 sm:text-base"
          >
            Leer noticia completa
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Flechas de navegación */}
        {noticias.length > 1 && (
          <>
            <div className="absolute bottom-7 left-6 z-20 flex items-center gap-3 sm:left-10 lg:left-16">
              <button
                type="button"
                onClick={anterior}
                aria-label="Noticia anterior"
                className="-translate-y-5 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-[#A6192E] text-2xl font-bold text-white transition hover:scale-105 hover:bg-[#7F1424] focus:outline-none focus:ring-2 focus:ring-white"
              >
                ‹
              </button>

              <button
                type="button"
                onClick={siguiente}
                aria-label="Noticia siguiente"
                className="-translate-y-5 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-[#A6192E] text-2xl font-bold text-white transition hover:scale-105 hover:bg-[#7F1424] focus:outline-none focus:ring-2 focus:ring-white"
              >
                ›
              </button>

              <span className="ml-2 text-sm font-semibold text-white/90">
                {String(indice + 1).padStart(2, "0")} /{" "}
                {String(noticias.length).padStart(2, "0")}
              </span>
            </div>

            {/* Miniaturas de las noticias anteriores y siguientes */}
            <div className="absolute bottom-6 right-6 z-20 flex max-w-[55%] gap-3 overflow-x-auto pb-1 md:bottom-auto md:right-7 md:top-1/2 md:max-w-none md:-translate-y-1/2 md:flex-col md:overflow-visible lg:right-10">
              {noticias.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIndice(i)}
                  aria-label={`Ver noticia: ${item.titulo}`}
                  aria-current={i === indice ? "true" : undefined}
                  className={`group relative h-14 w-20 flex-none overflow-hidden rounded-lg border-2 transition-all duration-300 sm:h-16 sm:w-24 md:h-[76px] md:w-32 ${
                    i === indice
                      ? "scale-105 border-[#A6192E] shadow-lg shadow-black/40"
                      : "border-white/40 opacity-75 hover:scale-105 hover:border-white hover:opacity-100"
                  }`}
                >
                  <img
                    src={item.imagen_url || IMAGEN_PREDETERMINADA}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  {i === indice && (
                    <span className="absolute inset-0 border-2 border-[#A6192E]" />
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}