import Link from "next/link";
import Image from "next/image";
import { getAsociacionesDestacadas } from "@/content/asociaciones";

export default function Asociaciones() {
  const asociaciones = getAsociacionesDestacadas(6);

  return (
    <section className="bg-[#171717] py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#DFA3AD]">
              Deporte departamental
            </p>

            <h2 className="text-4xl font-bold md:text-5xl">
              Asociaciones deportivas
            </h2>

            <p className="mt-4 max-w-2xl text-gray-400">
              Conoce las asociaciones departamentales
            </p>
          </div>

          <Link
            href="/asociaciones"
            className="hidden rounded-lg border border-[#7F1424] px-5 py-3 text-sm font-semibold transition hover:bg-white hover:text-gray-950 md:block"
          >
            Ver las 18 asociaciones →
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {asociaciones.map((asociacion) => (
            <Link
              key={asociacion.slug}
              href={`/asociaciones/${asociacion.slug}`}
              className="group relative block h-72 overflow-hidden rounded-2xl ring-1 ring-white/10"
            >
              <Image
                src={asociacion.imagen}
                alt={asociacion.disciplina}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-sm font-medium text-[#DFA3AD]">
                  {asociacion.disciplina}
                </p>

                <h3 className="mt-1 text-2xl font-bold">
                  {asociacion.nombre}
                </h3>

                <span className="mt-4 inline-block text-sm font-semibold text-white opacity-0 transition group-hover:opacity-100">
                  Ver asociación →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/asociaciones"
          className="mt-8 block w-full rounded-lg border border-[#7F1424] px-5 py-3 text-center text-sm font-semibold md:hidden"
        >
          Ver las 18 asociaciones →
        </Link>
      </div>
    </section>
  );
}
