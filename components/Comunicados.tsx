const comunicados = [
  {
    numero: "COMUNICADO N.º 015/2026",
    titulo: "Convocatoria a las asociaciones deportivas",
    fecha: "18 de septiembre de 2026",
  },
  {
    numero: "COMUNICADO N.º 014/2026",
    titulo: "Información sobre actividades deportivas",
    fecha: "15 de septiembre de 2026",
  },
  {
    numero: "COMUNICADO N.º 013/2026",
    titulo: "Cronograma de actividades departamentales",
    fecha: "10 de septiembre de 2026",
  },
];

export default function Comunicados() {
  return (
    <section className="bg-[#F7F3EA] py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Encabezado */}
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

          <button className="hidden text-sm font-semibold text-[#A6192E] hover:text-[#7F1424] md:block">
            Ver todos →
          </button>
        </div>

        {/* Tarjetas */}
        <div className="grid gap-6 md:grid-cols-3">
          {comunicados.map((comunicado) => (
            <article
              key={comunicado.numero}
              className="group rounded-2xl border border-[#E5DED2] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-[#A6192E]">
                {comunicado.numero}
              </p>

              <h3 className="mt-4 text-xl font-bold leading-snug text-gray-900">
                {comunicado.titulo}
              </h3>

              <p className="mt-5 text-sm text-gray-500">
                {comunicado.fecha}
              </p>

              <button className="mt-6 text-sm font-semibold text-gray-900 transition group-hover:text-[#A6192E]">
                Leer comunicado →
              </button>
            </article>
          ))}
        </div>

        {/* Botón móvil */}
        <button className="mt-8 text-sm font-semibold text-[#A6192E] md:hidden">
          Ver todos →
        </button>

      </div>
    </section>
  );
}