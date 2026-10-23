import Noticias from "@/components/Noticias";
import Separador from "@/components/Separador";
import Hero from "@/components/Hero";
import Asociaciones from "@/components/Asociaciones";
import Deportistas from "@/components/Deportistas";
import { getNoticias, type Noticia } from "@/lib/api";

// La portada se genera en el servidor y se revalida cada minuto: las noticias
// llegan dentro del HTML (antes el navegador las pedía después de hidratar).
export const revalidate = 60; // = REVALIDACION_DATOS (debe ser un literal)

export default async function Home() {
  let noticias: Noticia[] = [];
  let errorInicial = false;

  try {
    noticias = await getNoticias();
  } catch (error) {
    console.error("Error al cargar las noticias de la portada:", error);
    errorInicial = true;
  }

  return (
    <>
      <Noticias noticiasIniciales={noticias} errorInicial={errorInicial} />

      <Separador />

      <div data-reveal="">
        <Hero />
      </div>

      <div data-reveal="">
        <Asociaciones />
      </div>

      <div data-reveal="">
        <Deportistas />
      </div>
    </>
  );
}
