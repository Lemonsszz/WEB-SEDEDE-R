import Link from "next/link";
import Image from "next/image";
import { getDeportistasDestacados } from "@/content/deportistas";

export default function Deportistas() {
  const deportistas = getDeportistasDestacados(3);

  return (
    <section className="bg-[#F7F3EA] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A6192E]">
            Orgullo deportivo
          </p>

          <h2 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">
            Deportistas de Élite
          </h2>

          <p className="mt-4 max-w-2xl text-gray-600">
            Conoce a los deportistas que representan y destacan en el deporte
            departamental.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {deportistas.map((deportista) => (
            <Link
              key={deportista.slug}
              href={`/deportistas/${deportista.slug}`}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[#E5DED2] transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative h-80 overflow-hidden bg-gray-200">
                <Image
                  src={deportista.imagen}
                  alt={deportista.nombre}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#A6192E]/0 transition duration-500 group-hover:bg-[#7F1424]/10" />
              </div>

              <div className="p-6">
                <p className="text-sm font-semibold text-[#A6192E]">
                  {deportista.disciplina}
                </p>

                <h3 className="mt-2 text-2xl font-bold text-gray-900">
                  {deportista.nombre}
                </h3>

                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-gray-600">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#A6192E] text-white">
                    ★
                  </span>

                  <span>{deportista.logro}</span>
                </div>

                <span className="mt-5 inline-block text-sm font-semibold text-gray-900 group-hover:text-[#A6192E]">
                  Ver perfil →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/deportistas"
          className="mt-10 inline-block rounded-lg border border-[#7F1424] px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-[#A6192E] hover:text-white"
        >
          Ver todos los deportistas →
        </Link>
      </div>
    </section>
  );
}
