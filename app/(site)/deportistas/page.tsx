import { getDeportistas } from "@/content/deportistas";
import HectorGaribay from "@/components/deportistas/HectorGaribay";
import TarjetaDeportista from "@/components/deportistas/TarjetaDeportista";
import Banner from "@/components/ui/Banner";
import { metadatos } from "@/lib/seo";

export const metadata = metadatos({
  titulo: "Deportistas de élite",
  descripcion:
    "Héctor Garibay y los atletas que representan y destacan en el deporte departamental de Oruro, con sus disciplinas y logros.",
  ruta: "/deportistas",
});

export default function DeportistasPage() {
  const otrosDeportistas = getDeportistas().slice(0, 3);

  return (
    <div className="min-h-screen bg-hueso">
      <Banner
        kicker="Orgullo deportivo"
        titulo="Deportistas de élite"
        descripcion="Conoce a los deportistas que representan y destacan en el deporte departamental de Oruro."
      />

      <HectorGaribay />

      <section data-reveal="" className="w-full pb-space-xl pt-space-md">
        <div className="mx-auto flex max-w-contenido flex-col gap-space-lg px-margin">
          <div className="flex flex-col justify-between gap-space-md md:flex-row md:items-end">
            <div className="flex flex-col gap-space-xs">
              <h2 className="font-display text-headline-lg font-black tracking-tight text-tinta">
                Otros deportistas destacados
              </h2>
              <p className="max-w-xl text-body-md text-tinta-2">
                Atletas que integran el registro deportivo departamental en
                distintas disciplinas.
              </p>
            </div>

            <p className="font-display text-label-md text-tinta-3">
              {otrosDeportistas.length} perfiles de muestra
            </p>
          </div>

          <div className="grid grid-cols-1 gap-gutter-lg sm:grid-cols-2 lg:grid-cols-3">
            {otrosDeportistas.map((deportista) => (
              <TarjetaDeportista key={deportista.slug} deportista={deportista} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
