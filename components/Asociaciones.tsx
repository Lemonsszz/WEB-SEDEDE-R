const asociaciones = [
  {
    nombre: "Fútbol",
    disciplina: "Fútbol",
    imagen:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80",
  },
  {
    nombre: "Básquetbol",
    disciplina: "Básquetbol",
    imagen:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80",
  },
  {
    nombre: "Voleibol",
    disciplina: "Voleibol",
    imagen:
      "https://images.unsplash.com/photo-1592656670411-92c94f6f3b47?auto=format&fit=crop&w=800&q=80",
  },
  {
    nombre: "Boxeo",
    disciplina: "Boxeo",
    imagen:
      "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=800&q=80",
  },
  {
    nombre: "Taekwondo",
    disciplina: "Artes marciales",
    imagen:
      "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=800&q=80",
  },
  {
    nombre: "Natación",
    disciplina: "Natación",
    imagen:
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Asociaciones() {
  return (
    <section className="bg-[#171717] py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">

        {/* Encabezado */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#DFA3AD]">
              Deporte departamental
            </p>

            <h2 className="text-4xl font-bold md:text-5xl">
              Asociaciones deportivas
            </h2>

            <p className="mt-4 max-w-2xl text-gray-400">
              Conoce las asociaciones deportivas reconocidas por SEDEDE
              y las disciplinas que representan.
            </p>
          </div>

          <button className="hidden rounded-lg border border-[#7F1424] px-5 py-3 text-sm font-semibold transition hover:bg-white hover:text-gray-950 md:block">
            Ver las 18 asociaciones →
          </button>
        </div>

        {/* Tarjetas */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {asociaciones.map((asociacion) => (
            <article
              key={asociacion.nombre}
              className="group relative h-72 overflow-hidden rounded-2xl ring-1 ring-white/10"
            >
              {/* Imagen */}
              <img
                src={asociacion.imagen}
                alt={asociacion.nombre}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              {/* Gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* Información */}
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-sm font-medium text-[#DFA3AD]">
                  {asociacion.disciplina}
                </p>

                <h3 className="mt-1 text-2xl font-bold">
                  Asociación de {asociacion.nombre}
                </h3>

                <button className="mt-4 text-sm font-semibold text-white opacity-0 transition group-hover:opacity-100">
                  Ver asociación →
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Botón móvil */}
        <button className="mt-8 w-full rounded-lg border border-[#7F1424] px-5 py-3 text-sm font-semibold md:hidden">
          Ver las 18 asociaciones →
        </button>

      </div>
    </section>
  );
}