import type { Metadata } from "next";
import { getDeportistas } from "@/content/deportistas";
import TarjetaDeportista from "@/components/deportistas/TarjetaDeportista";
import Banner from "@/components/ui/Banner";

export const metadata: Metadata = {
  title: "Deportistas de élite — SEDEDE",
  description:
    "Deportistas que representan y destacan en el deporte departamental de Oruro.",
};

export default function DeportistasPage() {
  const deportistas = getDeportistas();

  return (
    <div className="min-h-screen bg-hueso">
      <Banner
        kicker="Orgullo deportivo"
        titulo="Deportistas de élite"
        descripcion="Conoce a los deportistas que representan y destacan en el deporte departamental de Oruro."
      />

      <section className="w-full py-space-xl">
        <div className="mx-auto flex max-w-contenido flex-col gap-space-lg px-margin">
          <p className="font-display text-label-md text-tinta-3">
            {deportistas.length} atletas en el registro departamental
          </p>

          <div className="grid grid-cols-1 gap-gutter-lg sm:grid-cols-2 lg:grid-cols-3">
            {deportistas.map((deportista) => (
              <TarjetaDeportista key={deportista.slug} deportista={deportista} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
