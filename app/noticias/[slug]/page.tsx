
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";

type Noticia = {
  titulo: string;
  resumen: string;
  contenido: string;
  imagen_url?: string | null;
  categoria: string;
  fecha_publicacion: string;
};

export default async function DetalleNoticia({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const respuesta = await fetch(
    `${process.env.API_URL || "http://127.0.0.1:8000/api"}/noticias/${encodeURIComponent(slug)}`,
    { cache: "no-store" }
  );

  if (!respuesta.ok) notFound();

  const datos = await respuesta.json();
  const noticia: Noticia = datos.noticia ?? datos;

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <div className="px-5 py-12">
        <article className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm md:p-10">
          <p className="mb-3 font-semibold text-red-800">
            {noticia.categoria}
          </p>

          <h1 className="text-3xl font-bold md:text-4xl">
            {noticia.titulo}
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            {noticia.resumen}
          </p>

          {noticia.imagen_url && (
            <img
              src={noticia.imagen_url}
              alt={noticia.titulo}
              className="mt-8 max-h-[500px] w-full rounded-xl object-cover"
            />
          )}

          <p className="mt-4 text-sm text-gray-500">
            {new Date(noticia.fecha_publicacion).toLocaleDateString("es-BO")}
          </p>

          <div className="mt-8 whitespace-pre-line leading-8 text-gray-700">
            {noticia.contenido}
          </div>

          <Link
            href="/noticias"
            className="mt-10 inline-block font-semibold text-red-800 hover:underline"
          >
            ← Volver a noticias
          </Link>
        </article>
      </div>
    </main>
  );
}