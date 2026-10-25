import { getAsociaciones } from "@/content/asociaciones";
import ListadoAsociaciones from "@/components/ListadoAsociaciones";
import Banner from "@/components/ui/Banner";
import { metadatos } from "@/lib/seo";

export const metadata = metadatos({
  titulo: "Asociaciones deportivas",
  descripcion:
    "Directorio de las asociaciones departamentales que agrupan y organizan cada disciplina deportiva en Oruro.",
  ruta: "/asociaciones",
});

export default function AsociacionesPage() {
  const asociaciones = getAsociaciones();

  return (
    <div className="min-h-screen bg-hueso">
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
