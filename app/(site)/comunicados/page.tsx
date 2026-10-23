import Comunicados from "@/components/Comunicados";
import Banner from "@/components/ui/Banner";

// Los comunicados se consultan en el servidor y se revalidan cada minuto.
export const revalidate = 60; // = REVALIDACION_DATOS (debe ser un literal)

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
