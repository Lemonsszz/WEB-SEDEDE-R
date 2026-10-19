
import Link from "next/link";
import { getComunicados, type Comunicado } from "@/lib/api";

function formatearFecha(fecha: string | null) {
  if (!fecha) return "Fecha no disponible";

  return new Date(fecha).toLocaleDateString("es-BO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default async function Comunicados() {
  let comunicados: Comunicado[] = [];

  try {
    comunicados = await getComunicados();
  } catch (error) {
    console.error("Error al cargar comunicados:", error);
  }

  return (
    <section className="bg-[#F7F3EA] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#A6192E]">
              Información oficial
            </p>

            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Comunicados
            </h2>

            <p className="mt-3 max-w-2xl text-gray-600">
              Conoce las últimas comunicaciones oficiales de SEDEDE.
            </p>
          </div>

          <Link
            href="/comunicados"
            className="hidden text-sm font-semibold text-[#A6192E] hover:text-[#7F1424] md:block"
          >
            Ver todos →
          </Link>
        </div>

        {comunicados.length === 0 ? (
          <p className="rounded-xl border border-[#E5DED2] bg-white p-8 text-center text-gray-600">
            No hay comunicados publicados por el momento.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {comunicados.map((comunicado) => (
              <article
                key={comunicado.id}
                className="group rounded-2xl border border-[#E5DED2] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-[#A6192E]">
                  Comunicado oficial
                </p>

                <h3 className="mt-4 text-xl font-bold leading-snug text-gray-900">
                  {comunicado.titulo}
                </h3>

                {comunicado.resumen && (
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {comunicado.resumen}
                  </p>
                )}

                <p className="mt-5 text-sm text-gray-500">
                  {formatearFecha(comunicado.fecha_publicacion)}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <Link
                    href={`/comunicados/${comunicado.id}`}
                    className="text-sm font-semibold text-[#A6192E] transition hover:text-[#7F1424]"
                  >
                    Leer comunicado completo →
                  </Link>

                  {comunicado.archivo_url && (
                    <a
                      href={comunicado.archivo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-gray-900 transition hover:text-[#A6192E]"
                    >
                      Ver documento ↗
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        <Link
          href="/comunicados"
          className="mt-8 inline-block text-sm font-semibold text-[#A6192E] md:hidden"
        >
          Ver todos →
        </Link>
      </div>
    </section>
  );
}