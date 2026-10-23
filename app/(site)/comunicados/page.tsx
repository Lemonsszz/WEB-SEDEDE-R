import Comunicados from "@/components/Comunicados";
import Banner from "@/components/ui/Banner";
import { metadatos } from "@/lib/seo";

// Los comunicados se consultan en el servidor y se revalidan cada minuto.
export const revalidate = 60; // = REVALIDACION_DATOS (debe ser un literal)

export const metadata = metadatos({
  titulo: "Comunicados oficiales",
  descripcion:
    "Comunicados oficiales del Servicio Departamental de Deportes de Oruro: convocatorias, resoluciones, resultados y documentos institucionales.",
  ruta: "/comunicados",
});

export default function ComunicadosPage() {
  return (
    <>
      <Banner
        kicker="Información oficial"
        titulo="Comunicados"
        descripcion="Comunicaciones oficiales del Servicio Departamental de Deportes: convocatorias, licitaciones, resultados y disposiciones del ecosistema deportivo orureño."
      />

      <div data-reveal="">
        <Comunicados esListado />
      </div>
    </>
  );
}
