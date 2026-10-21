import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  formatearFecha,
  getComunicado,
  type Comunicado,
} from "@/lib/api";

export default async function DetalleComunicado({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let comunicado: Comunicado;

  try {
    comunicado = await getComunicado(id);
  } catch {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="bg-[#A6192E] py-16 text-white">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F7F3EA]">
            Comunicado oficial
          </p>

          <h1 className="mt-3 text-3xl font-bold md:text-4xl">
            {comunicado.titulo}
          </h1>

          <p className="mt-4 text-sm text-white/80">
            {formatearFecha(comunicado.fecha_publicacion)}
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-6 py-12">
        {comunicado.resumen && (
          <p className="text-lg leading-relaxed text-gray-700">
            {comunicado.resumen}
          </p>
        )}

        {comunicado.contenido && (
          <div className="mt-8 whitespace-pre-line leading-8 text-gray-700">
            {comunicado.contenido}
          </div>
        )}

        {comunicado.archivo_url && (
          <a
            href={comunicado.archivo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 rounded-lg bg-[#A6192E] px-6 py-3 font-semibold text-white transition hover:bg-[#7F1424]"
          >
            Descargar documento
            <span aria-hidden="true">↓</span>
          </a>
        )}

        <div className="mt-12">
          <Link
            href="/comunicados"
            className="font-semibold text-[#A6192E] hover:underline"
          >
            ← Volver a comunicados
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  );
}
