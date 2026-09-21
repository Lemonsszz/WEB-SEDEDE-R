import Header from "@/components/Header";
import Comunicados from "@/components/Comunicados";
import Footer from "@/components/Footer";

export default function ComunicadosPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="bg-[#A6192E] py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F7F3EA]">
            Información oficial
          </p>

          <h1 className="mt-3 text-5xl font-bold">
            Comunicados
          </h1>

          <p className="mt-4 max-w-2xl text-white/80">
            Comunicaciones oficiales del Servicio Departamental de Deportes.
          </p>
        </div>
      </section>

      <Comunicados />

      <Footer />
    </main>
  );
}