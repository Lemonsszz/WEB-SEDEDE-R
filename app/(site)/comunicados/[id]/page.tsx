import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Download } from "lucide-react";
import {
  formatearFecha,
  getComunicado,
  getComunicados,
  type Comunicado,
} from "@/lib/api";
import Banner from "@/components/ui/Banner";
import Badge from "@/components/ui/Badge";
import { metadatos, resumenTexto } from "@/lib/seo";

// El detalle se genera en el servidor y se revalida cada minuto.
export const revalidate = 60; // = REVALIDACION_DATOS (debe ser un literal)

/**
 * Título y descripción propios de cada comunicado. Si el comunicado no existe
 * (o el API falla) se marca la página como `noindex` y la página responde 404.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const comunicado = await getComunicado(id);

    return metadatos({
      titulo: comunicado.titulo,
      descripcion:
        resumenTexto(comunicado.resumen || comunicado.contenido) ??
        "Comunicado oficial del Servicio Departamental de Deportes de Oruro.",
      ruta: `/comunicados/${comunicado.id}`,
      tipo: "article",
      publicadoEn: comunicado.fecha_publicacion,
    });
  } catch {
    return metadatos({
      titulo: "Comunicado no encontrado",
      descripcion: "El comunicado que buscás no está disponible.",
      ruta: `/comunicados/${id}`,
      noIndexar: true,
    });
  }
}

// Prerenderiza los comunicados existentes; los nuevos se generan bajo demanda.
export async function generateStaticParams() {
  try {
    const comunicados = await getComunicados();
    return comunicados.map((comunicado) => ({
      id: String(comunicado.id),
    }));
  } catch (error) {
    console.error("No se pudieron prerenderizar los comunicados:", error);
    return [];
  }
}

export default async function DetalleComunicado({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let comunicado: Comunicado;

  try {
    comunicado = await getComunicado(id);
  } catch {
    notFound();
  }

  return (
    <>
      <Banner
        kicker="Comunicado oficial"
        titulo={comunicado.titulo}
        claseTitulo="text-headline-xl lg:text-[44px] lg:leading-[52px]"
      />

      <section className="w-full bg-hueso py-space-xl">
        <div className="mx-auto flex max-w-3xl flex-col gap-space-md px-margin">
          <div className="flex flex-wrap items-center gap-4">
            <Badge tono="primario">SEDEDE</Badge>
            <span className="inline-flex items-center gap-1.5 font-display text-label-md text-tinta-2">
              <CalendarDays aria-hidden className="h-4 w-4 text-tinta-3" />
              {formatearFecha(comunicado.fecha_publicacion)}
            </span>
          </div>

          <article className="rounded-2xl border border-hueso-5 bg-white p-space-lg shadow-tarjeta">
            {comunicado.resumen ? (
              <p className="border-l-4 border-primary pl-space-md text-body-lg font-medium leading-relaxed text-tinta">
                {comunicado.resumen}
              </p>
            ) : null}

            {comunicado.contenido ? (
              <div className="mt-space-md whitespace-pre-line text-body-md leading-relaxed text-tinta-2">
                {comunicado.contenido}
              </div>
            ) : null}

            {comunicado.archivo_url ? (
              <a
                href={comunicado.archivo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-space-lg inline-flex items-center gap-2 rounded-full bg-primary px-space-md py-space-xs font-display text-label-md font-semibold text-white shadow-boton transition-colors hover:bg-primary-dark"
              >
                <Download aria-hidden className="h-4 w-4" />
                Descargar documento
              </a>
            ) : null}
          </article>

          <Link
            href="/comunicados"
            className="inline-flex w-fit items-center gap-2 font-display text-label-md font-semibold text-primary transition-colors hover:text-primary-dark"
          >
            <ArrowLeft aria-hidden className="h-4 w-4" />
            Volver a comunicados
          </Link>
        </div>
      </section>
    </>
  );
}
