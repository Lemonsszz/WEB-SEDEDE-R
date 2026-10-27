import {
  Briefcase,
  Building,
  Dumbbell,
  HeartPulse,
  Scale,
  WavesLadder,
} from "lucide-react";
import { direccion, unidades, type Unidad } from "@/content/sedede";
import Kicker from "@/components/ui/Kicker";

const ICONOS: Record<Unidad["icono"], typeof Dumbbell> = {
  administrativa: Briefcase,
  infraestructura: Building,
  deportiva: Dumbbell,
  legal: Scale,
  salud: HeartPulse,
  piscina: WavesLadder,
};

export default function Organigrama() {
  return (
    <section className="w-full bg-hueso-2 py-space-xl">
      <div className="mx-auto flex max-w-contenido flex-col gap-space-lg px-margin">
        <div className="flex flex-col gap-space-xs">
          <Kicker tono="primario" className="font-bold">
            Organización administrativa
          </Kicker>
          <h2 className="font-display text-headline-xl font-extrabold tracking-tight text-tinta">
            Dirección y unidades operativas
          </h2>
          <p className="max-w-2xl text-body-md text-tinta-2">
            Estructura descentralizada bajo tuición del Gobierno Departamental,
            organizada por especialidades técnicas para brindar atención inmediata al
            atleta y a las asociaciones.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-gutter lg:grid-cols-12">
          <div className="flex flex-col gap-space-md rounded-2xl bg-white p-space-lg shadow-tarjeta lg:col-span-5">
            <div className="flex aspect-[4/3] w-full flex-col justify-end overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primary-dark p-space-md text-white">
              <span className="font-display text-kicker uppercase tracking-wider text-gold-soft">
                Dirección departamental
              </span>
              <h3 className="font-display text-headline-md font-bold leading-tight text-white">
                {direccion.cargo}
              </h3>
              <p className="text-body-sm text-white/80">{direccion.entidad}</p>
            </div>

            <p className="text-body-sm leading-relaxed text-tinta-2">
              Nuestra premisa es democratizar los campos de juego y convertir la altura
              de Oruro en una ventaja científica y táctica para nuestros representantes
              departamentales.
            </p>

            <div className="flex flex-wrap gap-space-xs">
              {direccion.etiquetas.map((etiqueta) => (
                <span
                  key={etiqueta}
                  className="rounded-full bg-hueso-3 px-space-sm py-1 font-display text-label-sm text-tinta"
                >
                  {etiqueta}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:col-span-7">
            {unidades.map((unidad) => {
              const Icono = ICONOS[unidad.icono];
              return (
                <article
                  key={unidad.titulo}
                  className="flex flex-col gap-space-xs rounded-xl bg-white p-space-md shadow-tarjeta transition-colors duration-300 hover:bg-hueso"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
                    <Icono aria-hidden className="h-5 w-5" />
                  </div>
                  <h3 className="pt-1 font-display text-headline-sm font-bold text-tinta">
                    {unidad.titulo}
                  </h3>
                  <p className="text-body-sm leading-relaxed text-tinta-2">
                    {unidad.descripcion}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
