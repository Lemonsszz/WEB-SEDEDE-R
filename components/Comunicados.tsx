import Link from "next/link";
import { ArrowRight, CalendarDays, Download, Megaphone } from "lucide-react";
import { formatearFecha, getComunicados, type Comunicado } from "@/lib/api";
import Badge from "@/components/ui/Badge";
import Kicker from "@/components/ui/Kicker";

function TarjetaComunicado({ comunicado }: { comunicado: Comunicado }) {
  return (
    <article className="group flex flex-col gap-space-md rounded-2xl border border-hueso-5 bg-white p-space-md shadow-tarjeta transition-all duration-300 hover:-translate-y-1 hover:shadow-tarjeta-hover">
      <div className="flex items-start justify-between gap-space-sm">
        <Badge tono="primario" icono={Megaphone}>
          Comunicado oficial
        </Badge>
        <span className="inline-flex items-center gap-1.5 whitespace-nowrap font-display text-label-sm text-tinta-2">
          <CalendarDays aria-hidden className="h-4 w-4 text-tinta-3" />
          {formatearFecha(comunicado.fecha_publicacion)}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-display text-headline-sm font-extrabold leading-snug tracking-tight text-tinta transition-colors group-hover:text-primary">
          {comunicado.titulo}
        </h3>

        {comunicado.resumen ? (
          <p className="text-body-sm leading-relaxed text-tinta-2">
            {comunicado.resumen}
          </p>
        ) : null}
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-hueso-5 pt-space-sm">
        <Link
          href={`/comunicados/${comunicado.id}`}
          className="inline-flex items-center gap-1 font-display text-label-md font-semibold text-primary transition-colors hover:text-primary-dark"
        >
          Leer comunicado
          <ArrowRight
            aria-hidden
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>

        {comunicado.archivo_url ? (
          <a
            href={comunicado.archivo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-display text-label-md font-semibold text-tinta transition-colors hover:text-primary"
          >
            <Download aria-hidden className="h-4 w-4" />
            Ver documento
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default async function Comunicados({
  esListado = false,
}: {
  esListado?: boolean;
}) {
  let comunicados: Comunicado[] = [];

  try {
    comunicados = await getComunicados();
  } catch (error) {
    console.error("Error al cargar comunicados:", error);
  }

  return (
    <section className="w-full bg-hueso py-space-xl">
      <div className="mx-auto flex max-w-contenido flex-col gap-space-lg px-margin">
        {!esListado ? (
          <div className="flex flex-col justify-between gap-space-md md:flex-row md:items-end">
            <div className="flex flex-col gap-space-xs">
              <Kicker tono="primario">Información oficial</Kicker>
              <h2 className="font-display text-headline-xl font-black tracking-tight text-tinta">
                Comunicados
              </h2>
              <p className="max-w-xl text-body-md text-tinta-2">
                Conoce las últimas comunicaciones oficiales de SEDEDE.
              </p>
            </div>

            <Link
              href="/comunicados"
              className="inline-flex items-center gap-space-xs self-start rounded-full bg-white px-space-md py-space-xs font-display text-label-md text-tinta shadow-tarjeta transition-colors hover:text-primary md:self-auto"
            >
              <span>Ver todos</span>
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
        ) : null}

        {comunicados.length === 0 ? (
          <p className="rounded-2xl border border-hueso-5 bg-white p-space-lg text-center text-body-md text-tinta-2">
            No hay comunicados publicados por el momento.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-gutter-lg md:grid-cols-2 lg:grid-cols-3">
            {comunicados.map((comunicado) => (
              <TarjetaComunicado key={comunicado.id} comunicado={comunicado} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
