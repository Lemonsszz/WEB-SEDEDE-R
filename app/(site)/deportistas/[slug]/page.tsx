import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  getDeportistaBySlug,
  getDeportistas,
} from "@/content/deportistas";
import { getAsociacionBySlug } from "@/content/asociaciones";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getDeportistas().map((deportista) => ({ slug: deportista.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const deportista = getDeportistaBySlug(slug);

  if (!deportista) {
    return { title: "Deportista no encontrado — SEDEDE" };
  }

  return {
    title: `${deportista.nombre} — SEDEDE`,
    description: `${deportista.disciplina} · ${deportista.logro}`,
  };
}

export default async function DetalleDeportista({ params }: Props) {
  const { slug } = await params;
  const deportista = getDeportistaBySlug(slug);

  if (!deportista) {
    notFound();
  }

  const asociacion = getAsociacionBySlug(deportista.asociacionSlug);

  return (
    <div className="min-h-screen bg-gray-50">

      <section className="px-6 py-14">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
          <div className="grid md:grid-cols-[380px_1fr]">
            <div className="relative h-80 bg-gray-200 md:h-full md:min-h-[460px]">
              <Image
                src={deportista.imagen}
                alt={deportista.nombre}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 380px"
                className="object-cover"
              />
            </div>

            <div className="p-6 md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A6192E]">
                {deportista.disciplina}
              </p>

              <h1 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
                {deportista.nombre}
              </h1>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#F7F3EA] px-4 py-2 text-sm font-semibold text-[#7F1424] ring-1 ring-[#E5DED2]">
                <span aria-hidden="true">★</span>
                {deportista.logro}
              </div>

              <p className="mt-6 leading-8 text-gray-700">{deportista.bio}</p>

              {asociacion && (
                <div className="mt-8 rounded-xl bg-gray-50 p-5 ring-1 ring-gray-200">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
                    Asociación
                  </p>

                  <Link
                    href={`/asociaciones/${asociacion.slug}`}
                    className="mt-2 inline-block font-semibold text-[#A6192E] hover:underline"
                  >
                    {asociacion.nombre} →
                  </Link>
                </div>
              )}

              <Link
                href="/deportistas"
                className="mt-10 inline-block font-semibold text-[#A6192E] hover:underline"
              >
                ← Volver a deportistas
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
