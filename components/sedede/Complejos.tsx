import Image from "next/image";
import { complejos } from "@/content/sedede";
import Kicker from "@/components/ui/Kicker";

export default function Complejos() {
  return (
    <section id="infraestructura" className="w-full bg-surface py-space-xl">
      <div className="mx-auto flex max-w-contenido flex-col gap-space-lg px-margin">
        <div className="flex flex-col justify-between gap-space-md md:flex-row md:items-end">
          <div>
            <Kicker tono="primario" className="font-bold">
              Patrimonio público
            </Kicker>
            <h2 className="mt-1 font-display text-headline-xl font-extrabold tracking-tight text-tinta">
              Escenarios departamentales
            </h2>
          </div>
          <span className="font-display text-label-sm font-medium text-tinta-2">
            Homologaciones CONMEBOL, World Athletics y World Aquatics
          </span>
        </div>

        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-4">
          {complejos.map((complejo) => (
            <article
              key={complejo.slug}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-tarjeta transition-shadow duration-300 hover:shadow-tarjeta-hover"
            >
              <div className="relative h-48 w-full overflow-hidden bg-hueso-3">
                <Image
                  src={complejo.imagen}
                  alt={complejo.nombre}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-primary px-space-sm py-0.5 font-display text-label-sm font-bold uppercase text-white">
                  {complejo.etiqueta}
                </span>
              </div>

              <div className="flex flex-grow flex-col justify-between gap-space-sm p-space-md">
                <div>
                  <h3 className="font-display text-headline-sm font-bold text-tinta">
                    {complejo.nombre}
                  </h3>
                  <p className="mt-1 font-body-sm leading-relaxed text-tinta-2">
                    {complejo.descripcion}
                  </p>
                </div>

                <dl className="flex flex-col gap-1 pt-space-xs font-display text-label-sm text-tinta-2">
                  <div className="flex items-center justify-between gap-3">
                    <dt>{complejo.datoLabel}:</dt>
                    <dd className="text-right font-semibold text-tinta">
                      {complejo.dato}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt>Disciplinas:</dt>
                    <dd className="text-right font-semibold text-tinta">
                      {complejo.disciplinas}
                    </dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
