const eventos = [
  {
    dia: "24",
    mes: "SEP",
    titulo: "Campeonato Departamental de Atletismo",
    lugar: "Estadio Departamental",
    categoria: "Atletismo",
  },
  {
    dia: "28",
    mes: "SEP",
    titulo: "Torneo Departamental de Básquetbol",
    lugar: "Coliseo Cerrado",
    categoria: "Básquetbol",
  },
  {
    dia: "05",
    mes: "OCT",
    titulo: "Festival Deportivo Departamental",
    lugar: "Complejo Deportivo",
    categoria: "Multideportivo",
  },
];

export default function Eventos() {
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

          <button className="hidden text-sm font-semibold text-[#A6192E] md:block">
            Ver calendario →
          </button>
        </div>

        <div className="divide-y divide-gray-200 border-y border-gray-200">
          {eventos.map((evento) => (
            <article
              key={evento.titulo}
              className="group flex flex-col gap-6 rounded-xl px-4 py-7 transition hover:bg-[#F7F3EA] md:flex-row md:items-center"
            >
              {/* Fecha */}
              <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-xl bg-[#A6192E] text-white">
                <span className="text-3xl font-bold leading-none">
                  {evento.dia}
                </span>
                <span className="mt-1 text-xs font-semibold">
                  {evento.mes}
                </span>
              </div>

              {/* Información */}
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#A6192E]">
                  {evento.categoria}
                </p>

                <h3 className="mt-1 text-xl font-bold text-gray-900">
                  {evento.titulo}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  📍 {evento.lugar}
                </p>
              </div>

              <button className="text-sm font-semibold text-gray-900 transition group-hover:text-[#A6192E]">
                Ver evento →
              </button>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}