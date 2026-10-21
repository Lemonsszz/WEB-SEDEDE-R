import type { Metadata } from "next";
import { getAsociaciones } from "@/content/asociaciones";
import ListadoAsociaciones from "@/components/ListadoAsociaciones";
import Banner from "@/components/ui/Banner";

export const metadata: Metadata = {
  title: "Asociaciones deportivas — SEDEDE",
  description:
    "Asociaciones departamentales que agrupan y organizan cada disciplina deportiva en Oruro.",
};

export default function AsociacionesPage() {
  const asociaciones = getAsociaciones();

  return (
    <div className="min-h-screen bg-noche-2">
      <Banner
        kicker="Deporte departamental"
        titulo="Asociaciones deportivas"
        descripcion={`Las ${asociaciones.length} asociaciones departamentales que organizan y promueven cada disciplina en Oruro.`}
      />

      <div data-reveal="">
        <ListadoAsociaciones />
      </div>
    </div>
  );
}
