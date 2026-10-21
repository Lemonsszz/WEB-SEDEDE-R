import Eventos from "@/components/Eventos";

export default function EventosPage() {
  return (
    <div className="min-h-screen bg-white">

      <section className="bg-[#A6192E] py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F7F3EA]">
            Agenda deportiva
          </p>

          <h1 className="mt-3 text-5xl font-bold">Eventos</h1>

          <p className="mt-4 max-w-2xl text-white/80">
            Calendario de actividades y competencias del Servicio Departamental
            de Deportes.
          </p>
        </div>
      </section>

      <Eventos />

    </div>
  );
}
