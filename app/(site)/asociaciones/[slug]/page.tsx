import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  getAsociacionBySlug,
  getAsociaciones,
} from "@/content/asociaciones";
import { getDeportistas } from "@/content/deportistas";
import Kicker from "@/components/ui/Kicker";
import { metadatos, resumenTexto } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAsociaciones().map((asociacion) => ({ slug: asociacion.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const asociacion = getAsociacionBySlug(slug);

  if (!asociacion) {
    return metadatos({
      titulo: "Asociación no encontrada",
      descripcion: "La asociación que buscás no está disponible.",
      ruta: `/asociaciones/${slug}`,
      noIndexar: true,
    });
  }

  return metadatos({
    titulo: asociacion.nombre,
    descripcion:
      resumenTexto(asociacion.descripcion) ??
      `Asociación departamental de ${asociacion.nombre} en Oruro.`,
    ruta: `/asociaciones/${asociacion.slug}`,
    imagen: asociacion.imagen,
  });
}

export default async function DetalleAsociacion({ params }: Props) {
  const { slug } = await params;
  const asociacion = getAsociacionBySlug(slug);

  if (!asociacion) {
    notFound();
  }

  const deportistas = getDeportistas().filter(
    (deportista) => deportista.asociacionSlug === asociacion.slug
  );

  return (
    <div className="min-h-screen bg-hueso">
      <section className="w-full pt-space-xl">
        <div className="mx-auto max-w-4xl px-margin">
          <article className="overflow-hidden rounded-3xl bg-white shadow-tarjeta">
            <div className="relative h-64 w-full bg-hueso-3 sm:h-80">
              <Image
                src={asociacion.imagen}
                alt={asociacion.nombre}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col gap-space-sm p-space-lg">
              <Kicker tono="primario">{asociacion.disciplina}</Kicker>

              <h1 className="text-balance break-words font-display text-headline-xl font-black leading-tight tracking-tight text-tinta">
                {asociacion.nombre}
              </h1>

              <p className="text-body-md leading-relaxed text-tinta-2">
                {asociacion.descripcion}
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="w-full py-space-xl">
        <div className="mx-auto flex max-w-4xl flex-col gap-space-md px-margin">
          {deportistas.length > 0 ? (
            <section className="flex flex-col gap-space-md">
              <h2 className="font-display text-headline-md font-extrabold tracking-tight text-tinta">
                Deportistas de esta asociación
              </h2>

              <div className="grid grid-cols-1 gap-gutter-sm sm:grid-cols-2">
                {deportistas.map((deportista) => (
                  <Link
                    key={deportista.slug}
                    href={`/deportistas/${deportista.slug}`}
                    className="group flex items-center gap-space-md rounded-2xl bg-white p-space-sm shadow-tarjeta transition-all duration-300 hover:-translate-y-1 hover:shadow-tarjeta-hover"
                  >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-hueso-3">
                      <Image
                        src={deportista.imagen}
                        alt={deportista.nombre}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-display text-headline-sm font-extrabold text-tinta transition-colors group-hover:text-primary">
                        {deportista.nombre}
                      </p>
                      <p className="text-body-sm text-tinta-2">{deportista.logro}</p>
                    </div>

                    <ArrowRight
                      aria-hidden
                      className="h-5 w-5 shrink-0 text-tinta-3 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary"
                    />
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <Link
            href="/asociaciones"
            className="inline-flex w-fit items-center gap-2 font-display text-label-md font-semibold text-primary transition-colors hover:text-primary-dark"
          >
            <ArrowLeft aria-hidden className="h-4 w-4" />
            Volver a asociaciones
          </Link>
        </div>
      </section>
    </div>
  );
}
