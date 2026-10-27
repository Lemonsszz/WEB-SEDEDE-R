import Noticias from "@/components/Noticias";
import Promocion from "@/components/Promocion";
import Separador from "@/components/Separador";
import Hero from "@/components/Hero";
import Asociaciones from "@/components/Asociaciones";
import Deportistas from "@/components/Deportistas";
import { getNoticias, type Noticia } from "@/lib/api";
import { metadatos } from "@/lib/seo";

// La portada se genera en el servidor y se revalida cada minuto: las noticias
// llegan dentro del HTML (antes el navegador las pedía después de hidratar).
export const revalidate = 60; // = REVALIDACION_DATOS (debe ser un literal)

export const metadata = metadatos({
  titulo: "SEDEDE Oruro — Servicio Departamental de Deportes",
  descripcion:
    "Sitio oficial de SEDEDE Oruro: noticias, comunicados, agenda de eventos, asociaciones deportivas y deportistas de élite del departamento.",
  ruta: "/",
  sinSufijo: true,
});

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

      <Promocion />

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
