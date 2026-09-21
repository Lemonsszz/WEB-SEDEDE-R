import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DocumentosPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="bg-[#A6192E] py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F7F3EA]">
            Información institucional
          </p>

          <h1 className="mt-3 text-5xl font-bold">
            Documentos
          </h1>

          <p className="mt-4 max-w-2xl text-white/80">
            Documentación oficial del Servicio Departamental de Deportes.
          </p>
        </div>
      </section>

      <section className="bg-[#F7F3EA] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900">
              Documentos oficiales
            </h2>

            <p className="mt-3 text-gray-600">
              Próximamente encontrarás aquí resoluciones, reglamentos,
              convocatorias y otros documentos institucionales.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}