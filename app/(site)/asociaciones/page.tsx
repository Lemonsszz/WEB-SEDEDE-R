import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAsociaciones } from "@/content/asociaciones";

export const metadata: Metadata = {
  title: "Asociaciones deportivas — SEDEDE",
  description:
    "Asociaciones departamentales que agrupan y organizan cada disciplina deportiva en Oruro.",
};

export default function AsociacionesPage() {
  const asociaciones = getAsociaciones();

  return (
    <div className="min-h-screen bg-white">

      <section className="bg-[#A6192E] py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F7F3EA]">
            Deporte departamental
          </p>

          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
            Asociaciones deportivas
          </h1>

          <p className="mt-4 max-w-2xl text-white/80">
            Las {asociaciones.length} asociaciones departamentales que
            organizan y promueven cada disciplina en Oruro.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {asociaciones.map((asociacion) => (
            <Link
              key={asociacion.slug}
              href={`/asociaciones/${asociacion.slug}`}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-48 w-full bg-gray-200">
                <Image
                  src={asociacion.imagen}
                  alt={asociacion.disciplina}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-5 text-sm font-semibold text-white">
                  {asociacion.disciplina}
                </p>
              </div>

              <div className="p-6">
                <h2 className="text-lg font-bold leading-6 text-gray-900 transition group-hover:text-[#A6192E]">
                  {asociacion.nombre}
                </h2>

                <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
                  {asociacion.descripcion}
                </p>

                <span className="mt-4 inline-block text-sm font-semibold text-[#A6192E] group-hover:underline">
                  Ver asociación →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
