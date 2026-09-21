const noticias = [
  {
    categoria: "Actividad deportiva",
    titulo: "SEDEDE impulsa nuevas actividades deportivas departamentales",
    fecha: "18 de septiembre de 2026",
    imagen:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80",
  },
  {
    categoria: "Institucional",
    titulo: "SEDEDE fortalece el trabajo con las asociaciones deportivas",
    fecha: "16 de septiembre de 2026",
    imagen:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    categoria: "Eventos",
    titulo: "Todo listo para las próximas actividades deportivas",
    fecha: "14 de septiembre de 2026",
    imagen:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function Noticias() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Encabezado */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#A6192E]">
              Actualidad
            </p>

            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Noticias
            </h2>

            <p className="mt-3 max-w-2xl text-gray-600">
              Mantente informado sobre las actividades y novedades de SEDEDE.
            </p>
          </div>

          <button className="hidden text-sm font-semibold text-[#A6192E] hover:text-[#7F1424] md:block">
            Ver todas →
          </button>
        </div>

        {/* Noticias */}
        <div className="grid gap-8 md:grid-cols-3">
          {noticias.map((noticia) => (
            <article
              key={noticia.titulo}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Imagen */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={noticia.imagen}
                  alt={noticia.titulo}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* Contenido */}
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-[#A6192E]">
                  {noticia.categoria}
                </p>

                <h3 className="mt-3 text-xl font-bold leading-snug text-gray-900">
                  {noticia.titulo}
                </h3>

                <p className="mt-4 text-sm text-gray-500">
                  {noticia.fecha}
                </p>

                <button className="mt-5 text-sm font-semibold text-gray-900 transition group-hover:text-[#A6192E]">
                  Leer noticia →
                </button>
              </div>
            </article>
          ))}
        </div>

        <button className="mt-8 text-sm font-semibold text-[#A6192E] md:hidden">
          Ver todas →
        </button>

      </div>
    </section>
  );
}