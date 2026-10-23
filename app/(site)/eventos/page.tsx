import Eventos from "@/components/Eventos";
import Banner from "@/components/ui/Banner";

// La agenda se consulta en el servidor y se revalida cada minuto.
export const revalidate = 60; // = REVALIDACION_DATOS (debe ser un literal)

export default function EventosPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Banner
        kicker="Agenda deportiva"
        titulo="Eventos"
        descripcion="Calendario de actividades y competencias del Servicio Departamental de Deportes."
      />

      <div data-reveal="">
        <Eventos />
      </div>
    </div>
  );
}
