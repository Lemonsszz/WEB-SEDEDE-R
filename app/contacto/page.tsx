import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="bg-[#A6192E] py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F7F3EA]">
            Atención
          </p>

          <h1 className="mt-3 text-5xl font-bold">
            Contacto
          </h1>

          <p className="mt-4 text-white/80">
            Encuentra los medios oficiales de contacto de SEDEDE.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-3">

          <div className="rounded-2xl border border-gray-200 p-7">
            <h2 className="font-bold">Dirección</h2>
            <p className="mt-3 text-gray-600">
              Oruro, Bolivia
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-7">
            <h2 className="font-bold">Teléfono</h2>
            <p className="mt-3 text-gray-600">
              +591 2 XXX XXXX
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-7">
            <h2 className="font-bold">Correo</h2>
            <p className="mt-3 text-gray-600">
              contacto@sedede.gob.bo
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}