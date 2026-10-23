import ListadoNoticias from "@/components/ListadoNoticias";
import Banner from "@/components/ui/Banner";
import { getNoticias, type Noticia } from "@/lib/api";

// El listado se arma en el servidor y se revalida cada minuto (ver lib/api.ts).
export const revalidate = 60; // = REVALIDACION_DATOS (debe ser un literal)

export default async function NoticiasPage() {
  let noticias: Noticia[] = [];
  let errorInicial = false;

  try {
    noticias = await getNoticias();
  } catch (error) {
    console.error("Error al cargar el listado de noticias:", error);
    errorInicial = true;
  }

  return (
    <div className="min-h-screen bg-surface">
      <Banner
        kicker="Actualidad"
        titulo="Noticias"
        descripcion="Información y novedades del deporte departamental: competencias, atletas, asociaciones y disposiciones de SEDEDE."
      />

      <div data-reveal="">
        <ListadoNoticias
          noticiasIniciales={noticias}
          errorInicial={errorInicial}
        />
      </div>
    </div>
  );
}
