import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Mountain,
  Timer,
  Trophy,
} from "lucide-react";
import { hectorGaribay as hector } from "@/content/hector-garibay";
import Boton from "@/components/ui/Boton";
import Kicker from "@/components/ui/Kicker";
import Badge from "@/components/ui/Badge";

/**
 * Bloque de Héctor Garibay para `/deportistas`.
 *
 * Va justo debajo del banner rojo, que se conserva. Todo el bloque comparte un
 * fondo oscuro medio (`noche-2`): la cabecera con el nombre y el panel técnico
 * con la foto y las marcas.
 */
export default function HectorGaribay() {
  return (
    <>
      {/* Cabecera: nombre, récord y métricas */}
      <section
        data-reveal=""
        className="relative w-full overflow-hidden border-b border-white/10 bg-noche-2 text-white"
      >
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 1200 400"
        >
          <path
            d="M-100 350 C 300 200, 700 380, 1300 120"
            stroke="#a6192e"
            strokeDasharray="6 6"
            strokeWidth="2"
          />
          <path
            d="M-50 380 C 350 240, 750 390, 1350 160"
            opacity="0.6"
            stroke="#fed65b"
            strokeWidth="1.5"
          />
          <circle cx="850" cy="180" fill="#a6192e" opacity="0.15" r="140" />
        </svg>

        <div className="relative z-10 mx-auto flex max-w-contenido flex-col gap-space-lg px-margin py-space-lg lg:py-space-xl">
          <div className="flex flex-wrap items-center justify-between gap-space-sm border-b border-white/10 pb-space-md">
            <div className="flex min-w-0 flex-wrap items-center gap-space-xs font-display text-label-sm uppercase tracking-wider">
              <span className="inline-block h-2 w-2 shrink-0 animate-pulse rounded-full bg-gold" />
              <span className="text-gold-soft">{hector.programa}</span>
              <span className="text-white/40">/</span>
              <span className="text-white/60">{hector.altitud}</span>
            </div>

            <span className="inline-flex shrink-0 items-center gap-space-xs rounded-full border border-white/10 bg-white/5 px-space-sm py-1 font-display text-label-sm text-gold-soft">
              <BadgeCheck aria-hidden className="h-4 w-4" />
              {hector.contexto}
            </span>
          </div>

          <div className="grid grid-cols-1 items-end gap-gutter-lg lg:grid-cols-12">
            <div className="flex min-w-0 flex-col gap-space-xs lg:col-span-7">
              <div className="flex items-center gap-space-xs">
                <span className="h-[2px] w-8 shrink-0 bg-primary" />
                <Kicker tono="dorado">
                  Pabellón de campeones departamentales
                </Kicker>
              </div>

              <h2 className="text-balance break-words font-display text-headline-xl font-black uppercase leading-none tracking-tight text-white lg:text-display-hero">
                {hector.nombreCorto}{" "}
                <span className="text-gold">{hector.apellidoDestacado}</span>
              </h2>

              <p className="max-w-2xl pt-space-xs text-body-md leading-relaxed text-white/70">
                {hector.presentacion}
              </p>

              <div className="flex flex-wrap items-center gap-space-xs pt-space-sm">
                {hector.etiquetas.map((etiqueta, indice) => (
                  <span
                    key={etiqueta}
                    className={`rounded-full px-space-sm py-1 font-display text-label-sm ${
                      indice === 0
                        ? "bg-primary font-bold uppercase tracking-wider text-white"
                        : "bg-white/10 text-white/80"
                    }`}
                  >
                    {etiqueta}
                  </span>
                ))}
              </div>
            </div>

            <dl className="grid min-w-0 grid-cols-2 gap-gutter-sm rounded-2xl border border-white/10 bg-white/[0.03] p-space-md backdrop-blur-sm lg:col-span-5">
              {hector.metricas.map((metrica, indice) => (
                <div key={metrica.etiqueta} className="flex min-w-0 flex-col">
                  <dt className="order-2 mt-1 text-label-sm font-medium uppercase leading-tight text-white/60">
                    {metrica.etiqueta}
                  </dt>
                  <dd
                    className={`order-1 break-words font-display text-headline-lg font-black leading-none tracking-tight tabular-nums sm:text-headline-xl ${
                      indice === 0 ? "text-gold" : "text-white"
                    }`}
                  >
                    {metrica.valor}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Panel técnico: foto + récord + acceso al expediente */}
      <section data-reveal="" className="w-full bg-noche-2 py-space-xl text-white">
        <div className="mx-auto flex max-w-contenido flex-col gap-space-md px-margin">
          <div className="flex flex-wrap items-end justify-between gap-space-sm pb-space-sm">
            <div className="flex min-w-0 flex-wrap items-center gap-space-xs">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
              <h3 className="font-display text-headline-sm font-extrabold uppercase tracking-tight text-white">
                Radar de alto rendimiento
              </h3>
              <span className="text-body-sm text-white/50">
                — Ficha técnica del atleta
              </span>
            </div>

            <span className="inline-flex items-center gap-space-xs font-display text-label-sm font-semibold text-white/60">
              <BadgeCheck aria-hidden className="h-4 w-4 text-gold-soft" />
              Marcas homologadas por World Athletics
            </span>
          </div>

          <article className="grid grid-cols-1 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-flotante lg:grid-cols-12">
            {/* Foto */}
            <div className="relative min-h-[380px] overflow-hidden bg-noche sm:min-h-[460px] lg:col-span-6 lg:min-h-[560px]">
              <Image
                src={hector.imagen}
                alt={`${hector.nombre}, maratonista boliviano de Oruro`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-noche via-noche/35 to-noche/10" />

              <div className="relative z-10 flex h-full flex-col justify-between gap-space-md p-space-md">
                <div className="flex flex-wrap items-start justify-between gap-space-xs">
                  <Badge tono="dorado" icono={Trophy}>
                    Récord nacional vigente
                  </Badge>
                  <Badge tono="vidrio">Referente del fondismo</Badge>
                </div>

                <div className="flex flex-col gap-space-xs">
                  <div className="flex flex-wrap items-center gap-space-xs">
                    <span className="rounded bg-primary px-space-xs py-0.5 font-display text-kicker uppercase text-white">
                      {hector.pruebaPrincipal}
                    </span>
                    <span className="text-label-sm text-white/70">
                      {hector.origen}
                    </span>
                  </div>

                  <p className="font-display text-headline-xl font-black uppercase leading-none tracking-tight text-white">
                    {hector.nombreCorto}
                  </p>

                  <p className="max-w-lg text-body-sm leading-relaxed text-white/75">
                    {hector.resumen}
                  </p>

                  <div className="flex flex-wrap items-center gap-space-md pt-space-xs text-label-sm text-white/70">
                    <span className="inline-flex items-center gap-1">
                      <Timer aria-hidden className="h-4 w-4 shrink-0 text-gold-soft" />
                      Récord nacional 2:07:44
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Mountain
                        aria-hidden
                        className="h-4 w-4 shrink-0 text-gold-soft"
                      />
                      Base: Oruro, 3.735 m
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ficha técnica */}
            <div className="flex min-w-0 flex-col justify-between gap-space-lg p-space-md lg:col-span-6 lg:p-space-lg">
              <div className="flex flex-col gap-space-xs border-b border-white/10 pb-space-md">
                <div className="flex flex-wrap items-center justify-between gap-space-xs">
                  <span className="font-display text-kicker uppercase text-white/60">
                    Récord nacional vigente homologado
                  </span>
                  <span className="shrink-0 rounded bg-gold px-space-xs py-0.5 font-display text-label-sm font-bold text-gold-deep">
                    Oficial WA / FAB
                  </span>
                </div>

                <div className="flex flex-wrap items-baseline gap-x-space-xs gap-y-1">
                  <span className="font-display text-headline-xl font-black leading-none tracking-tight text-gold tabular-nums lg:text-stat-display">
                    {hector.record.tiempo}
                  </span>
                  <span className="font-display text-headline-sm font-bold text-white/70">
                    / {hector.record.prueba}
                  </span>
                </div>

                <p className="text-body-sm leading-relaxed text-white/65">
                  {hector.record.descripcion}
                </p>
              </div>

              <div className="flex flex-col gap-space-xs rounded-2xl bg-white/5 p-space-sm ring-1 ring-white/10">
                <div className="flex flex-wrap items-center justify-between gap-space-xs border-b border-white/10 pb-space-xs">
                  <span className="inline-flex items-center gap-1.5 font-display text-label-md font-bold text-white">
                    <Trophy aria-hidden className="h-4 w-4 shrink-0 text-gold-soft" />
                    Registro de marcas
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1 font-display text-label-sm text-white/60">
                    <BadgeCheck aria-hidden className="h-3.5 w-3.5" />
                    World Athletics
                  </span>
                </div>

                <ul className="flex flex-col divide-y divide-white/10">
                  {hector.marcas.map((marca) => (
                    <li
                      key={`${marca.evento}-${marca.tiempo}`}
                      className="flex flex-wrap items-center justify-between gap-x-space-sm gap-y-space-xs py-space-xs"
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-space-xs">
                        <span className="shrink-0 rounded bg-primary px-2 py-0.5 font-display text-kicker text-white">
                          {marca.distancia}
                        </span>
                        <div className="min-w-0">
                          <span className="block font-display text-label-md font-bold leading-tight text-white">
                            {marca.evento}
                          </span>
                          <span className="block text-body-sm text-white/60">
                            {marca.sede} · {marca.anio}
                          </span>
                        </div>
                      </div>

                      <div className="flex shrink-0 flex-col items-end">
                        <span className="font-display text-headline-sm font-black leading-tight text-gold tabular-nums">
                          {marca.tiempo}
                        </span>
                        <span
                          className={`mt-0.5 max-w-[9rem] rounded px-1.5 py-0.5 text-right font-display text-[10px] font-bold uppercase leading-tight ${
                            marca.record
                              ? "bg-gold text-gold-deep"
                              : "bg-white/10 text-white/70"
                          }`}
                        >
                          {marca.distincion}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 gap-space-sm sm:grid-cols-2">
                <div className="rounded-2xl bg-white/5 p-space-sm ring-1 ring-white/10">
                  <span className="block font-display text-label-sm font-semibold uppercase text-white/60">
                    Próximo desafío
                  </span>
                  <span className="mt-0.5 block font-display text-headline-sm font-bold text-white">
                    {hector.proximoDesafio.titulo}
                  </span>
                  <span className="text-body-sm font-semibold text-gold-soft">
                    {hector.proximoDesafio.detalle}
                  </span>
                </div>

                <div className="rounded-2xl bg-white/5 p-space-sm ring-1 ring-white/10">
                  <span className="block font-display text-label-sm font-semibold uppercase text-white/60">
                    Categoría de beca SEDEDE
                  </span>
                  <span className="mt-0.5 block font-display text-headline-sm font-bold text-gold-soft">
                    {hector.beca.titulo}
                  </span>
                  <span className="text-body-sm text-white/60">
                    {hector.beca.detalle}
                  </span>
                </div>
              </div>

              <Boton
                href={`/deportistas/${hector.slug}`}
                className="w-full"
                ariaLabel={`Ver el expediente técnico de ${hector.nombre}`}
              >
                Ver expediente técnico
                <ArrowRight aria-hidden className="h-5 w-5 shrink-0" />
              </Boton>
            </div>
          </article>

          <p className="text-center text-body-sm text-white/50">
            {hector.notaProvisional}{" "}
            <Link
              href="/contacto"
              className="font-semibold text-gold-soft transition-colors hover:text-gold"
            >
              Enviar una corrección
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
