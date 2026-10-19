
import { getEventos, type Evento } from "@/lib/api";
import Link from "next/link";

function obtenerFecha(fecha: string) {
  const [anio, mes, dia] = fecha.split("-").map(Number);

  return new Date(Date.UTC(anio, mes - 1, dia));
}

function formatearDia(fecha: string) {
  return String(obtenerFecha(fecha).getUTCDate()).padStart(2, "0");
}

function formatearMes(fecha: string) {
  return obtenerFecha(fecha)
    .toLocaleDateString("es-BO", {
      month: "short",
      timeZone: "UTC",
    })
    .replace(".", "")
    .toUpperCase();
}

function formatearFechaCompleta(fecha: string) {
  return obtenerFecha(fecha).toLocaleDateString("es-BO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default async function Eventos() {
  let eventos: Evento[] = [];

  try {
    eventos = await getEventos();
  } catch (error) {
    console.error("Error al cargar eventos:", error);
  }

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A6192E]">
              Agenda deportiva
            </p>

            <h2 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">
              Próximos eventos
            </h2>
          </div>

          <Link
            href="/eventos"
            className="hidden text-sm font-semibold text-[#A6192E] hover:text-[#7F1424] md:block"
          >
            Ver calendario →
          </Link>
        </div>

        {eventos.length === 0 ? (
          <p className="border-y border-gray-200 px-4 py-10 text-center text-gray-600">
            No hay próximos eventos publicados por el momento.
          </p>
        ) : (
          <div className="divide-y divide-gray-200 border-y border-gray-200">
            {eventos.map((evento) => (
              <article
                key={evento.id}
                className="group flex flex-col gap-6 rounded-xl px-4 py-7 transition hover:bg-[#F7F3EA] md:flex-row md:items-center"
              >
                <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-xl bg-[#A6192E] text-white">
                  <span className="text-3xl font-bold leading-none">
                    {formatearDia(evento.fecha)}
                  </span>
                  <span className="mt-1 text-xs font-semibold">
                    {formatearMes(evento.fecha)}
                  </span>
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#A6192E]">
                    Evento deportivo
                  </p>

                  <h3 className="mt-1 text-xl font-bold text-gray-900">
                    {evento.titulo}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    📅 {formatearFechaCompleta(evento.fecha)}
                  </p>

                  {evento.hora && (
                    <p className="mt-1 text-sm text-gray-500">
                      🕒 {evento.hora.slice(0, 5)}
                    </p>
                  )}

                  {evento.lugar && (
                    <p className="mt-1 text-sm text-gray-500">
                      📍 {evento.lugar}
                    </p>
                  )}

                  {evento.descripcion && (
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">
                      {evento.descripcion}
                    </p>
                  )}
                </div>

                {evento.imagen_url && (
                  <a
                    href={evento.imagen_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-gray-900 transition hover:text-[#A6192E]"
                  >
                    Ver imagen ↗
                  </a>
                )}
              </article>
            ))}
          </div>
        )}

        <Link
          href="/eventos"
          className="mt-8 inline-block text-sm font-semibold text-[#A6192E] md:hidden"
        >
          Ver calendario →
        </Link>
      </div>
    </section>
  );
}