import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getDeportistas } from "@/content/deportistas";

export const metadata: Metadata = {
  title: "Deportistas de élite — SEDEDE",
  description:
    "Deportistas que representan y destacan en el deporte departamental de Oruro.",
};

export default function DeportistasPage() {
  const deportistas = getDeportistas();

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="bg-[#A6192E] py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F7F3EA]">
            Orgullo deportivo
          </p>

          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
            Deportistas de élite
          </h1>

          <p className="mt-4 max-w-2xl text-white/80">
            Conoce a los deportistas que representan y destacan en el deporte
            departamental.
          </p>
        </div>
      </section>

      <section className="bg-[#F7F3EA] px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {deportistas.map((deportista) => (
            <Link
              key={deportista.slug}
              href={`/deportistas/${deportista.slug}`}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[#E5DED2] transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative h-72 overflow-hidden bg-gray-200">
                <Image
                  src={deportista.imagen}
                  alt={deportista.nombre}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <p className="text-sm font-semibold text-[#A6192E]">
                  {deportista.disciplina}
                </p>

                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  {deportista.nombre}
                </h2>

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
      </section>

      <Footer />
    </main>
  );
}
