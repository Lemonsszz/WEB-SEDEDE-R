"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, ChevronRight, Clock } from "lucide-react";
import { getNoticias, formatearFecha, type Noticia } from "@/lib/api";
import ImagenNoticia from "@/components/ImagenNoticia";
import Boton from "@/components/ui/Boton";
import Kicker from "@/components/ui/Kicker";

const INTERVALO_ROTACION = 6500;
const MAXIMO_SECUNDARIAS = 3;

function minutosLectura(noticia: Noticia) {
  const palabras = (noticia.contenido ?? "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(palabras / 200));
}

function Fondo({ noticia, activa }: { noticia: Noticia; activa: boolean }) {
  return (
    <ImagenNoticia
      src={noticia.imagen_url}
      alt={noticia.titulo}
      decorativa
      eager={activa}
      className={`absolute inset-0 h-full w-full scale-105 object-cover transition-opacity duration-700 ${
        activa ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}

function TarjetaSecundaria({
  noticia,
  onSelect,
}: {
  noticia: Noticia;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`Ver noticia: ${noticia.titulo}`}
      className="group flex w-full items-center gap-space-sm rounded-xl bg-noche-3/70 p-space-xs text-left shadow-vidrio backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-noche-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-noche-2 2xl:h-20 2xl:w-24">
        <ImagenNoticia
          src={noticia.imagen_url}
          alt={noticia.titulo}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="min-w-0 flex flex-col">
        <span className="font-display text-[10px] font-bold uppercase tracking-wider text-gold-soft">
          {noticia.categoria || "Institucional"}
        </span>
        <span className="truncate font-display text-body-md font-bold text-white transition-colors group-hover:text-primary-soft-dim">
          {noticia.titulo}
        </span>
        <span className="mt-0.5 flex items-center gap-1.5 font-display text-[11px] text-white/60">
          <CalendarDays aria-hidden className="h-3 w-3" />
          {formatearFecha(noticia.fecha_publicacion)}
        </span>
      </div>
    </button>
  );
}

export default function Noticias() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [activo, setActivo] = useState(0);
  const [reinicio, setReinicio] = useState(0);

  const totalCarrusel = Math.min(4, noticias.length);

  useEffect(() => {
    if (totalCarrusel < 2) return;

    const id = window.setInterval(() => {
      setActivo((indice) => (indice + 1) % totalCarrusel);
    }, INTERVALO_ROTACION);

    return () => window.clearInterval(id);
  }, [totalCarrusel, reinicio]);

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

  function elegir(indice: number) {
    setActivo(indice);
    setReinicio((valor) => valor + 1);
  }

  useEffect(() => {
    void cargarNoticias();
  }, [cargarNoticias]);

  if (cargando) {
    return (
      <section className="w-full bg-gradient-to-b from-primary via-primary-deep to-primary py-space-lg">
        <div className="mx-auto w-full max-w-contenido px-margin">
          <div className="flex min-h-[420px] items-center justify-center rounded-[2rem] bg-white/5 text-white shadow-flotante ring-1 ring-white/10">
            <p className="animate-pulse font-display text-body-lg">
              Cargando noticias...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full bg-gradient-to-b from-primary via-primary-deep to-primary py-space-lg">
        <div className="mx-auto w-full max-w-contenido px-margin">
          <div className="flex min-h-[320px] items-center justify-center rounded-[2rem] bg-white/5 px-space-lg text-center text-white shadow-flotante ring-1 ring-white/10">
            <div className="flex flex-col items-center gap-space-sm">
              <Kicker tono="rosa">Actualidad SEDEDE</Kicker>
              <h2 className="font-display text-headline-lg font-bold text-white">
                No se pudieron cargar las noticias
              </h2>
              <p className="text-body-md text-white/70">
                Revisa la conexión con el servidor e inténtalo de nuevo.
              </p>
              <Boton onClick={reintentar} className="mt-space-sm">
                Reintentar
              </Boton>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (noticias.length === 0) {
    return (
      <section className="w-full bg-gradient-to-b from-primary via-primary-deep to-primary py-space-lg">
        <div className="mx-auto w-full max-w-contenido px-margin">
          <div className="flex min-h-[320px] items-center justify-center rounded-[2rem] bg-white/5 px-space-lg text-center shadow-flotante ring-1 ring-white/10">
            <div className="flex flex-col items-center gap-space-sm">
              <Kicker tono="rosa">Actualidad SEDEDE</Kicker>
              <h2 className="font-display text-headline-lg font-bold text-white">
                No hay noticias publicadas
              </h2>
              <p className="text-body-md text-white/70">
                Las noticias publicadas aparecerán aquí.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const destacada = noticias.find((n) => n.destacada) ?? noticias[0];
  const carrusel = [
    destacada,
    ...noticias.filter((n) => n.id !== destacada.id),
  ].slice(0, 4);
  const indice = activo < carrusel.length ? activo : 0;
  const principal = carrusel[indice];
  const secundarias = carrusel
    .map((noticia, posicion) => ({ noticia, posicion }))
    .filter(({ posicion }) => posicion !== indice)
    .slice(0, MAXIMO_SECUNDARIAS);

  return (
    <section className="relative w-full bg-gradient-to-b from-primary via-primary-deep to-primary lg:py-space-lg">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-black/10 to-transparent" />

      {/* ---------- Móvil / tablet (debajo de lg) ----------
          Sin cajón flotante: la imagen cubre toda la sección y un degradado
          lateral oscurece los bordes para dar énfasis al título. Solo se
          muestran el título y el botón; las mini noticias quedan para lg+. */}
      <div className="lg:hidden">
        <div className="relative min-h-[calc(100svh-5rem)] w-full overflow-hidden">
          <div className="absolute inset-0">
            {carrusel.map((noticia, posicion) => (
              <Fondo
                key={noticia.id}
                noticia={noticia}
                activa={posicion === indice}
              />
            ))}
          </div>

          {/* Oscurecido lateral + refuerzo inferior para que el texto lea bien */}
          <div className="absolute inset-0 bg-gradient-to-r from-noche/95 via-noche/45 to-noche/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-noche/95 via-noche/25 to-transparent" />

          <div className="relative flex min-h-[calc(100svh-5rem)] flex-col justify-end gap-space-sm px-margin pb-space-xl pt-space-xl">
            <div className="flex items-center gap-space-sm">
              <span className="inline-block h-[3px] w-10 rounded-full bg-primary shadow-brillo" />
              <Kicker tono="rosa">
                {principal.destacada ? "Noticia destacada" : "Actualidad SEDEDE"}
              </Kicker>
            </div>

            <h1 className="text-balance font-display text-headline-lg font-black uppercase leading-[1.14] tracking-tight text-white">
              {principal.titulo}
            </h1>

            <div className="pt-space-xs">
              <Boton href={`/noticias/${principal.slug}`}>
                Leer noticia completa
                <ArrowRight
                  aria-hidden
                  className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Boton>
            </div>

            <div className="flex items-center gap-space-sm pt-space-sm">
              {carrusel.map((noticia, posicion) => (
                <button
                  key={noticia.id}
                  type="button"
                  onClick={() => elegir(posicion)}
                  aria-label={`Ver noticia: ${noticia.titulo}`}
                  className={`h-1 rounded-full transition-colors ${
                    posicion === indice
                      ? "w-12 bg-primary"
                      : "w-6 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Escritorio (lg+) ----------
          Se mantiene el panel flotante con las 3 mini noticias, tal como
          estaba. No tocar sin pedir confirmación: el usuario lo aprobó así. */}
      <div className="mx-auto hidden w-full max-w-contenido px-margin lg:block">
        <div className="relative overflow-hidden rounded-[2rem] bg-noche text-white shadow-flotante ring-1 ring-black/5">
          <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-primary/25 blur-[120px]" />
          <div className="pointer-events-none absolute -right-20 top-1/2 h-[26rem] w-[26rem] rounded-full bg-gold/10 blur-[130px]" />

          <div className="absolute inset-0">
            {carrusel.map((noticia, posicion) => (
              <Fondo
                key={noticia.id}
                noticia={noticia}
                activa={posicion === indice}
              />
            ))}
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-noche via-noche/80 to-noche/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-noche/90 via-transparent to-noche/20" />

          <div className="relative flex min-h-[560px] flex-col justify-center px-space-xl py-space-xl 2xl:min-h-[680px] 2xl:px-14 2xl:py-16">
            <div className="grid grid-cols-12 items-center gap-gutter-lg">
              <div className="z-10 flex flex-col gap-space-md lg:col-span-8">
                <div className="flex items-center gap-space-sm">
                  <span className="inline-block h-[3px] w-10 rounded-full bg-primary shadow-brillo" />
                  <Kicker tono="rosa">
                    {principal.destacada ? "Noticia destacada" : "Actualidad SEDEDE"}
                  </Kicker>
                </div>

                <div className="flex flex-wrap items-center gap-space-xs font-display text-label-sm uppercase tracking-wider text-white/70">
                  <span className="rounded-full bg-white/10 px-space-xs py-0.5 text-white backdrop-blur-sm">
                    {principal.categoria || "Institucional"}
                  </span>
                  <span aria-hidden>•</span>
                  <span>{formatearFecha(principal.fecha_publicacion)}</span>
                </div>

                <h1 className="text-balance font-display font-black uppercase leading-[1.12] tracking-tight text-white lg:text-[40px] lg:leading-[46px] 2xl:text-[52px] 2xl:leading-[58px]">
                  {principal.titulo}
                </h1>

                {principal.resumen && (
                  <p className="max-w-2xl text-body-lg leading-relaxed text-white/75 2xl:max-w-3xl">
                    {principal.resumen}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
                  <Boton href={`/noticias/${principal.slug}`}>
                    Leer noticia completa
                    <ArrowRight
                      aria-hidden
                      className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Boton>

                  <div className="flex items-center gap-space-sm font-display text-label-md text-white/70">
                    <span className="inline-flex items-center gap-1">
                      <Clock aria-hidden className="h-4 w-4 text-white" />
                      {minutosLectura(principal)} min lectura
                    </span>
                    <span className="h-1 w-1 rounded-full bg-white/40" />
                    <Link
                      href="/noticias"
                      className="font-medium text-white transition-colors hover:text-primary-soft-dim"
                    >
                      Ver
                    </Link>
                  </div>
                </div>

                <div className="flex items-center gap-space-sm pt-space-sm">
                  {carrusel.map((noticia, posicion) => (
                    <button
                      key={noticia.id}
                      type="button"
                      onClick={() => elegir(posicion)}
                      aria-label={`Ver noticia: ${noticia.titulo}`}
                      className={`h-1 rounded-full transition-colors ${
                        posicion === indice
                          ? "w-12 bg-primary"
                          : "w-6 bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  ))}
                  <span className="ml-space-xs font-display text-label-sm text-white/70">
                    {String(indice + 1).padStart(2, "0")} /{" "}
                    {String(carrusel.length).padStart(2, "0")} actualizaciones
                  </span>
                </div>
              </div>

              <aside className="z-10 flex flex-col gap-space-xs lg:col-span-4">
                <div className="flex items-center justify-between pb-space-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-gold-soft" />
                    <span className="font-display text-label-sm font-bold uppercase tracking-[0.16em] text-white/70">
                      Otras noticias relevantes
                    </span>
                  </div>
                  <Link
                    href="/noticias"
                    className="flex items-center gap-1 font-display text-label-sm text-gold-soft hover:underline"
                  >
                    Ver todas
                    <ChevronRight aria-hidden className="h-3.5 w-3.5" />
                  </Link>
                </div>

                {secundarias.map(({ noticia, posicion }) => (
                  <TarjetaSecundaria
                    key={noticia.id}
                    noticia={noticia}
                    onSelect={() => elegir(posicion)}
                  />
                ))}
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
