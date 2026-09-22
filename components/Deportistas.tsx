const deportistas = [
  {
    nombre: "María López",
    disciplina: "Atletismo",
    logro: "Campeona departamental 2026",
    imagen: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=80",
  },
  {
    nombre: "Carlos Mendoza",
    disciplina: "Natación",
    logro: "Medallista nacional",
    imagen: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80",
  },
  {
    nombre: "Diego Fernández",
    disciplina: "Boxeo",
    logro: "Campeón departamental",
    imagen: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=800&q=80",
  },
  {
      nombre: "Jeremy Carlos",
    disciplina: "Natación",
    logro: "Medallista nacional",
    imagen: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Deportistas() {
  return (
    <section className="bg-[#F7F3EA] py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A6192E]">
            Orgullo deportivo
          </p>

          <h2 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">
            Deportistas de Élite
          </h2>

          <p className="mt-4 max-w-2xl text-gray-600">
            Conoce a los deportistas que representan y destacan
            en el deporte departamental.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {deportistas.map((deportista) => (
            <article
              key={deportista.nombre}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[#E5DED2] transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={deportista.imagen}
                  alt={deportista.nombre}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#A6192E]/0 transition duration-500 group-hover:bg-[#A6192E]/10" />
              </div>

              <div className="p-6">
                <p className="text-sm font-semibold text-[#A6192E]">
                  {deportista.disciplina}
                </p>

                <h3 className="mt-2 text-2xl font-bold text-gray-900">
                  {deportista.nombre}
                </h3>

                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-gray-600">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#A6192E] text-white">
                    ★
                </span>

                <span>{deportista.logro}</span>
                </div>

                <button className="mt-5 text-sm font-semibold text-gray-900 hover:text-[#A6192E]">
                  Ver perfil →
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}