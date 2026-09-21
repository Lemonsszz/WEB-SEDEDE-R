import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SededePage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="bg-[#A6192E] py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F7F3EA]">
            Institución
          </p>

          <h1 className="mt-3 text-5xl font-bold">
            SEDEDE
          </h1>

          <p className="mt-4 max-w-2xl text-white/80">
            Servicio Departamental de Deportes.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-gray-900">
            Sobre SEDEDE
          </h2>

          <p className="mt-4 max-w-3xl leading-7 text-gray-600">
            Información institucional, misión, visión y datos generales
            del Servicio Departamental de Deportes.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}