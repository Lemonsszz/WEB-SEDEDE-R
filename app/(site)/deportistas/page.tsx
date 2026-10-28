import { ArrowRight, UsersRound } from "lucide-react";
import { getDeportistas } from "@/content/deportistas";
import HectorGaribay from "@/components/deportistas/HectorGaribay";
import TarjetaDeportista from "@/components/deportistas/TarjetaDeportista";
import Banner from "@/components/ui/Banner";
import Boton from "@/components/ui/Boton";
import Kicker from "@/components/ui/Kicker";
import { metadatos } from "@/lib/seo";

export const metadata = metadatos({
  titulo: "Deportistas de élite",
  descripcion:
    "Héctor Garibay y, próximamente, los deportistas más representativos de cada asociación deportiva de Oruro, con sus disciplinas y logros.",
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
          {otrosDeportistas.length > 0 ? (
            <>
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
                  {otrosDeportistas.length} perfiles
                </p>
              </div>

              <div className="grid grid-cols-1 gap-gutter-lg sm:grid-cols-2 lg:grid-cols-3">
                {otrosDeportistas.map((deportista) => (
                  <TarjetaDeportista key={deportista.slug} deportista={deportista} />
                ))}
              </div>
            </>
          ) : (
            <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-space-sm rounded-3xl border border-hueso-5 bg-white p-space-lg text-center shadow-tarjeta sm:p-space-xl">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <UsersRound aria-hidden className="h-7 w-7" />
              </span>

              <Kicker tono="primario" className="font-bold">
                Próximamente
              </Kicker>

              <h2 className="text-balance font-display text-headline-lg font-black tracking-tight text-tinta">
                Pronto sumaremos a los deportistas más representativos
              </h2>

              <p className="max-w-xl text-body-md leading-relaxed text-tinta-2">
                Estamos reuniendo la información oficial para publicar aquí a los
                deportistas más representativos de cada asociación departamental,
                con su disciplina, sus logros y su trayectoria. Los perfiles se irán
                habilitando a medida que las asociaciones nos envíen sus datos.
              </p>

              <div className="pt-space-xs">
                <Boton href="/asociaciones" tamano="sm">
                  Conocer las asociaciones
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </Boton>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
