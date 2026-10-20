import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import { getNoticia, formatearFecha } from "@/lib/api";

export default async function DetalleNoticia({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const noticia = await getNoticia(slug).catch(() => notFound());

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <div className="px-5 py-12">
        <article className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm md:p-10">
          <p className="mb-3 font-semibold text-[#A6192E]">
            {noticia.categoria || "Institucional"}
          </p>

          <h1 className="text-3xl font-bold md:text-4xl">
            {noticia.titulo}
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            {noticia.resumen}
          </p>

          {noticia.imagen_url && (
            <Image
              src={noticia.imagen_url}
              alt={noticia.titulo}
              width={1600}
              height={1000}
              priority
              className="mt-8 h-auto max-h-[500px] w-full rounded-xl object-cover"
            />
          )}

          <p className="mt-4 text-sm text-gray-500">
            {formatearFecha(noticia.fecha_publicacion)}
          </p>

          <div className="mt-8 whitespace-pre-line leading-8 text-gray-700">
            {noticia.contenido}
          </div>

          <Link
            href="/noticias"
            className="mt-10 inline-block font-semibold text-[#A6192E] hover:underline"
          >
            ← Volver a noticias
          </Link>
        </article>
      </div>
    </main>
  );
}
