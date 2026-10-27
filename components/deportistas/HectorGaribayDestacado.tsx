import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Mountain, Timer, Trophy } from "lucide-react";
import { hectorGaribay as hector } from "@/content/hector-garibay";

/**
 * Versión compacta de Héctor Garibay para la portada.
 *
 * Deliberadamente **no** es el bloque de `/deportistas` (dos secciones oscuras
 * con foto, métricas, registro de marcas y ficha técnica): acá es una sola
 * tarjeta horizontal, de media pantalla de alto, que se comporta como un enlace
 * grande al expediente. Toda la tarjeta enlaza a `/deportistas/hector-garibay`,
 * así que se puede tocar en cualquier punto y no solo en el botón.
 */
export default function HectorGaribayDestacado() {
  const href = `/deportistas/${hector.slug}`;

  return (
    <Link
      href={href}
      aria-label={`Ver el expediente técnico de ${hector.nombre}`}
      data-reveal=""
      className="group relative block overflow-hidden rounded-3xl bg-noche text-white shadow-flotante ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(16,19,24,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-hueso"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Contenido */}
        <div className="relative z-10 flex flex-col justify-center gap-space-sm p-space-lg lg:col-span-7 lg:p-space-xl">
          <div className="flex flex-wrap items-center gap-space-xs">
            <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-gold" />
            <span className="font-display text-kicker uppercase tracking-wider text-gold-soft">
              Deportista de élite
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-space-xs py-0.5 font-display text-label-sm text-white/70">
              <BadgeCheck aria-hidden className="h-3.5 w-3.5 shrink-0" />
              {hector.contexto}
            </span>
          </div>

          <h3 className="text-balance break-words font-display text-headline-lg font-black uppercase leading-none tracking-tight text-white sm:text-headline-xl">
            {hector.nombreCorto}{" "}
            <span className="text-gold">{hector.apellidoDestacado}</span>
          </h3>

          <div className="flex flex-wrap items-end gap-x-space-sm gap-y-1">
            <span className="flex items-baseline gap-space-xs">
              <span className="font-display text-headline-xl font-black leading-none tracking-tight text-gold tabular-nums sm:text-stat-display">
                {hector.record.tiempo}
              </span>
              <span className="font-display text-label-md font-semibold uppercase text-white/60">
                {hector.record.prueba}
              </span>
            </span>
            <span className="inline-flex items-center gap-1 pb-1 font-display text-label-sm font-bold uppercase tracking-wide text-gold-soft">
              <Trophy aria-hidden className="h-3.5 w-3.5 shrink-0" />
              Récord nacional vigente
            </span>
          </div>

          <p className="max-w-2xl text-body-md leading-relaxed text-white/70">
            {hector.resumen}
          </p>

          <div className="flex flex-wrap items-center gap-x-space-md gap-y-space-xs pt-space-xs text-label-sm text-white/60">
            <span className="inline-flex items-center gap-1">
              <Timer aria-hidden className="h-4 w-4 shrink-0 text-gold-soft" />
              {hector.pruebaPrincipal}
            </span>
            <span className="inline-flex items-center gap-1">
              <Mountain aria-hidden className="h-4 w-4 shrink-0 text-gold-soft" />
              {hector.origen}
            </span>
          </div>

          <span className="mt-space-xs inline-flex w-fit items-center gap-space-xs rounded-full bg-primary px-space-md py-space-xs font-display text-label-md font-bold text-white transition-colors duration-300 group-hover:bg-primary-dark">
            Ver su historia
            <ArrowRight
              aria-hidden
              className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>

        {/* Foto */}
        <div className="relative order-first min-h-[220px] overflow-hidden bg-noche-2 sm:min-h-[300px] lg:order-none lg:col-span-5 lg:min-h-full">
          <Image
            src={hector.imagen}
            alt={`${hector.nombre}, maratonista boliviano de Oruro`}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-noche via-noche/25 to-transparent lg:bg-gradient-to-r lg:from-noche lg:via-noche/30 lg:to-transparent" />
          <span className="absolute right-space-sm top-space-sm inline-flex items-center gap-1 rounded-full bg-noche/70 px-space-xs py-1 font-display text-[10px] font-bold uppercase tracking-wider text-gold-soft backdrop-blur-sm">
            <Trophy aria-hidden className="h-3 w-3 shrink-0" />
            42K
          </span>
        </div>
      </div>

      {/* Brillo que cruza la tarjeta al pasar el mouse */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/3 z-20 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-700 group-hover:left-[110%] group-hover:opacity-100"
      />
    </Link>
  );
}
