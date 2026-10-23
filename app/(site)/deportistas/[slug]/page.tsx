import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Trophy } from "lucide-react";
import {
  getDeportistaBySlug,
  getDeportistas,
} from "@/content/deportistas";
import { getAsociacionBySlug } from "@/content/asociaciones";
import Kicker from "@/components/ui/Kicker";
import Badge from "@/components/ui/Badge";
import { metadatos } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getDeportistas().map((deportista) => ({ slug: deportista.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const deportista = getDeportistaBySlug(slug);

  if (!deportista) {
    return metadatos({
      titulo: "Deportista no encontrado",
      descripcion: "El perfil que buscás no está disponible.",
      ruta: `/deportistas/${slug}`,
      noIndexar: true,
    });
  }

  return metadatos({
    titulo: deportista.nombre,
    descripcion: `${deportista.disciplina} · ${deportista.logro}`,
    ruta: `/deportistas/${deportista.slug}`,
  });
}

export default async function DetalleDeportista({ params }: Props) {
  const { slug } = await params;
  const deportista = getDeportistaBySlug(slug);

  if (!deportista) {
    notFound();
  }

  const asociacion = getAsociacionBySlug(deportista.asociacionSlug);

  return (
    <div className="min-h-screen bg-hueso">
      <section className="w-full py-space-xl">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-white shadow-tarjeta">
          <div className="grid md:grid-cols-[380px_1fr]">
            <div className="relative h-80 w-full bg-hueso-3 md:h-full md:min-h-[460px]">
              <Image
                src={deportista.imagen}
                alt={deportista.nombre}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 380px"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col gap-space-md p-space-lg">
              <Kicker tono="primario">{deportista.disciplina}</Kicker>

              <h1 className="font-display text-headline-xl font-black leading-tight tracking-tight text-tinta">
                {deportista.nombre}
              </h1>

              <div>
                <Badge tono="dorado" icono={Trophy}>
                  {deportista.logro}
                </Badge>
              </div>

              <p className="text-body-md leading-relaxed text-tinta-2">
                {deportista.bio}
              </p>

              {asociacion ? (
                <div className="rounded-2xl bg-hueso-2 p-space-md">
                  <p className="font-display text-label-sm uppercase tracking-wider text-tinta-3">
                    Asociación
                  </p>

                  <Link
                    href={`/asociaciones/${asociacion.slug}`}
                    className="mt-1 inline-flex items-center gap-1 font-display text-headline-sm font-bold text-primary transition-colors hover:text-primary-dark"
                  >
                    {asociacion.nombre}
                    <ArrowRight aria-hidden className="h-4 w-4" />
                  </Link>
                </div>
              ) : null}

              <Link
                href="/deportistas"
                className="inline-flex w-fit items-center gap-2 font-display text-label-md font-semibold text-primary transition-colors hover:text-primary-dark"
              >
                <ArrowLeft aria-hidden className="h-4 w-4" />
                Volver a deportistas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
