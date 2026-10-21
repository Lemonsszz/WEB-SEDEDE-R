import ListadoNoticias from "@/components/ListadoNoticias";
import Banner from "@/components/ui/Banner";

export default function NoticiasPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Banner
        kicker="Actualidad"
        titulo="Noticias"
        descripcion="Información y novedades del deporte departamental: competencias, atletas, asociaciones y disposiciones de SEDEDE."
      />

      <div data-reveal="">
        <ListadoNoticias />
      </div>
    </div>
  );
}
