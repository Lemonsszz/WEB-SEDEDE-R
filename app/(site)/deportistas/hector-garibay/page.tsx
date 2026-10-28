import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  MapPin,
  Timer,
  Trophy,
} from "lucide-react";
import { hectorGaribay as hector } from "@/content/hector-garibay";
import Kicker from "@/components/ui/Kicker";
import { metadatos, SITIO_URL } from "@/lib/seo";

export const metadata: Metadata = metadatos({
  titulo: `${hector.nombre} — expediente técnico`,
  descripcion: hector.resumen,
  ruta: `/deportistas/${hector.slug}`,
  imagen: hector.imagen,
});

export default function ExpedienteHectorGaribay() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: hector.nombre,
    jobTitle: "Maratonista",
    nationality: "Boliviana",
    birthPlace: "Totoral, Oruro, Bolivia",
    image: `${SITIO_URL}${hector.imagen}`,
    url: `${SITIO_URL}/deportistas/${hector.slug}`,
    description: hector.resumen,
    award: hector.marcas.map(
      (marca) => `${marca.distincion} — ${marca.evento} ${marca.anio}`
    ),
  };

  return (
    <div className="min-h-screen bg-hueso">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Encabezado del expediente */}
      <section className="relative w-full overflow-hidden bg-noche text-white">
        <div className="pointer-events-none absolute inset-0 opacity-25">
          <svg
            aria-hidden
            className="h-full w-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 1200 320"
          >
            <path
              d="M-100 300 C 300 160, 700 320, 1300 90"
              stroke="#a6192e"
              strokeDasharray="6 6"
              strokeWidth="2"
            />
            <path
              d="M-50 320 C 350 190, 750 330, 1350 130"
              opacity="0.6"
              stroke="#fed65b"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        <div className="relative mx-auto flex max-w-contenido flex-col gap-space-md px-margin py-space-lg lg:py-space-xl">
          <Link
            href="/deportistas"
            className="inline-flex w-fit items-center gap-2 font-display text-label-md font-semibold text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft aria-hidden className="h-4 w-4" />
            Volver a deportistas de élite
          </Link>

          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs">
              <span className="h-[2px] w-8 bg-primary" />
              <Kicker tono="dorado">Expediente técnico</Kicker>
            </div>

            <h1 className="text-balance break-words font-display text-headline-xl font-black uppercase leading-none tracking-tight text-white lg:text-display-hero">
              {hector.nombreCorto}{" "}
              <span className="text-gold">{hector.apellidoDestacado}</span>
            </h1>

            <p className="max-w-2xl text-body-md leading-relaxed text-white/70">
              {hector.presentacion}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
            <div className="inline-flex max-w-full flex-wrap items-baseline gap-x-space-xs gap-y-1 rounded-2xl border border-white/10 bg-white/5 px-space-md py-space-sm">
              <span className="font-display text-headline-xl font-black leading-none text-gold tabular-nums">
                {hector.record.tiempo}
              </span>
              <span className="text-label-sm uppercase leading-tight text-white/60">
                Récord nacional 42K
              </span>
            </div>

            <span className="inline-flex items-center gap-1.5 font-display text-label-sm text-white/70">
              <MapPin aria-hidden className="h-4 w-4 text-gold-soft" />
              {hector.origen} · {hector.altitud}
            </span>

            <span className="inline-flex items-center gap-1.5 font-display text-label-sm text-white/70">
              <BadgeCheck aria-hidden className="h-4 w-4 text-gold-soft" />
              Marcas homologadas por World Athletics
            </span>
          </div>
        </div>
      </section>

      {/* Marcas y récords oficiales */}
      <section data-reveal="" className="w-full py-space-xl">
        <div className="mx-auto flex max-w-contenido flex-col gap-space-lg px-margin">
          <div className="flex flex-col gap-space-xs">
            <Kicker tono="primario">Historial cronológico de competencia</Kicker>
            <h2 className="font-display text-headline-lg font-black uppercase tracking-tight text-tinta lg:text-headline-xl">
              Marcas y récords oficiales
            </h2>
            <p className="max-w-2xl text-body-md text-tinta-2">
              Tiempos registrados en circuitos certificados por World Athletics
              y homologados ante la Federación Atlética de Bolivia.
            </p>
          </div>

          {/* Móvil: una tarjeta por marca */}
          <div className="flex flex-col gap-space-sm md:hidden">
            {hector.marcas.map((marca) => (
              <article
                key={`${marca.evento}-movil`}
                className="flex flex-col gap-space-xs rounded-2xl bg-white p-space-md shadow-tarjeta"
              >
                <div className="flex items-center justify-between gap-space-xs">
                  <span className="shrink-0 rounded bg-primary px-2 py-0.5 font-display text-kicker text-white">
                    {marca.distancia}
                  </span>
                  <span className="font-display text-label-sm text-tinta-3">
                    {marca.anio}
                  </span>
                </div>

                <div className="flex flex-wrap items-baseline justify-between gap-x-space-xs gap-y-1">
                  <span className="min-w-0 break-words font-display text-label-md font-bold text-tinta">
                    {marca.prueba}
                  </span>
                  <span className="shrink-0 font-display text-headline-md font-black text-primary tabular-nums">
                    {marca.tiempo}
                  </span>
                </div>

                <div className="min-w-0">
                  <span className="block break-words font-display text-body-sm font-semibold text-tinta">
                    {marca.evento}
                  </span>
                  <span className="block break-words text-body-sm text-tinta-2">
                    {marca.sede}
                  </span>
                </div>

                <span
                  className={`mt-1 w-fit max-w-full break-words rounded-full px-space-sm py-1 font-display text-label-sm font-bold uppercase leading-tight ${
                    marca.record
                      ? "bg-gold text-gold-deep"
                      : "bg-hueso-2 text-tinta-2"
                  }`}
                >
                  {marca.distincion}
                </span>
              </article>
            ))}
          </div>

          {/* Escritorio: tabla */}
          <div className="hidden overflow-hidden rounded-2xl bg-white shadow-tarjeta md:block">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-hueso-5 bg-hueso-2 font-display text-label-sm uppercase tracking-wider text-tinta-2">
                    <th className="px-space-md py-space-md">Prueba / distancia</th>
                    <th className="px-space-md py-space-md">Tiempo oficial</th>
                    <th className="px-space-md py-space-md">Evento / sede</th>
                    <th className="px-space-md py-space-md">Año</th>
                    <th className="px-space-md py-space-md text-right">
                      Distinción
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-hueso-5">
                  {hector.marcas.map((marca) => (
                    <tr
                      key={`${marca.evento}-tabla`}
                      className="transition-colors hover:bg-hueso-2/60"
                    >
                      <td className="px-space-md py-space-md">
                        <span className="flex items-center gap-space-xs font-display text-label-md font-bold text-tinta">
                          <Timer aria-hidden className="h-4 w-4 text-primary" />
                          {marca.prueba}
                        </span>
                      </td>

                      <td className="px-space-md py-space-md font-display text-headline-sm font-black text-primary tabular-nums">
                        {marca.tiempo}
                      </td>

                      <td className="px-space-md py-space-md">
                        <span className="block font-display text-label-md font-semibold text-tinta">
                          {marca.evento}
                        </span>
                        <span className="text-body-sm text-tinta-2">
                          {marca.sede}
                        </span>
                      </td>

                      <td className="px-space-md py-space-md font-display text-label-md font-semibold text-tinta">
                        {marca.anio}
                      </td>

                      <td className="px-space-md py-space-md text-right">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-space-sm py-1 font-display text-label-sm font-bold ${
                            marca.record
                              ? "bg-gold text-gold-deep"
                              : "bg-hueso-2 text-tinta-2"
                          }`}
                        >
                          <Trophy aria-hidden className="h-3.5 w-3.5" />
                          {marca.distincion}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Trayectoria y raíces */}
      <section data-reveal="" className="w-full pb-space-xl">
        <div className="mx-auto max-w-contenido px-margin">
          <div className="grid grid-cols-1 gap-gutter-lg lg:grid-cols-12">
            <div className="flex flex-col gap-space-md lg:col-span-7">
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center gap-space-xs">
                  <span className="h-[2px] w-8 bg-primary" />
                  <Kicker tono="primario">Trayectoria y raíces</Kicker>
                </div>
                <h2 className="font-display text-headline-lg font-black uppercase tracking-tight text-tinta">
                  De Totoral a la cima del fondismo
                </h2>
              </div>

              {hector.biografia.map((parrafo) => (
                <p
                  key={parrafo.slice(0, 40)}
                  className="text-body-md leading-relaxed text-tinta-2"
                >
                  {parrafo}
                </p>
              ))}

              <blockquote className="rounded-2xl border-l-4 border-primary bg-white p-space-md shadow-tarjeta">
                <p className="font-display text-headline-sm font-bold italic leading-snug text-primary">
                  “{hector.cita}”
                </p>
                <footer className="mt-2 font-display text-label-sm font-bold uppercase text-tinta-2">
                  — {hector.nombre}
                </footer>
              </blockquote>
            </div>

            <aside className="flex flex-col gap-space-md lg:col-span-5">
              <div className="relative overflow-hidden rounded-3xl bg-white shadow-tarjeta">
                <div className="relative h-64 w-full sm:h-80">
                  <Image
                    src={hector.imagen}
                    alt={`${hector.nombre} en competencia`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center"
                  />
                </div>

                <div className="flex flex-col gap-space-xs p-space-md">
                  <span className="font-display text-label-sm font-bold uppercase tracking-wider text-primary">
                    {hector.disciplina} · {hector.origen}
                  </span>
                  <span className="font-display text-headline-md font-black tracking-tight text-tinta">
                    {hector.nombre}
                  </span>
                  <p className="text-body-sm leading-relaxed text-tinta-2">
                    {hector.resumen}
                  </p>
                </div>
              </div>



              <p className="text-body-sm leading-relaxed text-tinta-3">
                {hector.notaProvisional}
              </p>
            </aside>
          </div>

          <div className="mt-space-lg flex flex-wrap items-center justify-between gap-space-sm border-t border-hueso-5 pt-space-md">
            <Link
              href="/deportistas"
              className="inline-flex items-center gap-2 font-display text-label-md font-semibold text-primary transition-colors hover:text-primary-dark"
            >
              <ArrowLeft aria-hidden className="h-4 w-4" />
              Volver a deportistas de élite
            </Link>

            <span className="font-display text-label-sm uppercase tracking-wider text-tinta-3">
              SEDEDE Oruro · Ficha de alto rendimiento
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
