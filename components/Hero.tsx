export default function Hero() {
  return (
    <section className="relative min-h-[620px] overflow-hidden">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=2000&q=80')",
        }}
      />

      {/* Capa oscura */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Contenido */}
      <div className="relative mx-auto flex min-h-[620px] max-w-7xl items-center px-6">
        <div className="max-w-3xl text-white">

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#F7F3EA]">
            Servicio Departamental de Deportes
          </p>
          <div className="mb-5 h-1 w-16 rounded-full bg-[#A6192E]" />

          <h2 className="text-5xl font-bold leading-tight md:text-7xl">
            Impulsando el deporte,
            <span className="block text-[#F7F3EA]">
              construyendo futuro.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-200">
            Conoce las actividades, asociaciones deportivas,
            eventos y noticias del deporte departamental.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-lg bg-[#A6192E] px-6 py-3 font-semibold text-white transition hover:bg-[#7F1424]">
              Conoce SEDEDE
            </button>

            <button className="rounded-lg border border-white/50 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:bg-white/20">
              Ver asociaciones
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}