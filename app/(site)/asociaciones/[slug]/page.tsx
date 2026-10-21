import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  getAsociacionBySlug,
  getAsociaciones,
} from "@/content/asociaciones";
import { getDeportistas } from "@/content/deportistas";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAsociaciones().map((asociacion) => ({ slug: asociacion.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const asociacion = getAsociacionBySlug(slug);

  if (!asociacion) {
    return { title: "Asociación no encontrada — SEDEDE" };
  }

  return {
    title: `${asociacion.nombre} — SEDEDE`,
    description: asociacion.descripcion,
  };
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
    <div className="min-h-screen bg-gray-50">

      <section className="relative flex min-h-[340px] items-end overflow-hidden bg-[#101318]">
        <Image
          src={asociacion.imagen}
          alt={asociacion.nombre}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

        <div className="relative mx-auto w-full max-w-7xl px-6 py-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#DFA3AD]">
            {asociacion.disciplina}
          </p>

          <h1 className="mt-3 max-w-4xl text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            {asociacion.nombre}
          </h1>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 md:p-10">
            <p className="leading-8 text-gray-700">{asociacion.descripcion}</p>

            {deportistas.length > 0 && (
              <>
                <h2 className="mt-10 text-2xl font-bold text-gray-900">
                  Deportistas de esta asociación
                </h2>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {deportistas.map((deportista) => (
                    <Link
                      key={deportista.slug}
                      href={`/deportistas/${deportista.slug}`}
                      className="group flex items-center gap-4 rounded-xl bg-gray-50 p-4 ring-1 ring-gray-200 transition hover:bg-white hover:shadow-md"
                    >
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-gray-200">
                        <Image
                          src={deportista.imagen}
                          alt={deportista.nombre}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 group-hover:text-[#A6192E]">
                          {deportista.nombre}
                        </p>
                        <p className="text-sm text-gray-600">
                          {deportista.logro}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}

            <Link
              href="/asociaciones"
              className="mt-10 inline-block font-semibold text-[#A6192E] hover:underline"
            >
              ← Volver a asociaciones
            </Link>
          </article>
        </div>
      </section>

    </div>
  );
}
