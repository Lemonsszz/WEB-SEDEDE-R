import Eventos from "@/components/Eventos";
import Banner from "@/components/ui/Banner";

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
