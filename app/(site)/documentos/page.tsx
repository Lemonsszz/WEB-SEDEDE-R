import { FileText, Info } from "lucide-react";
import { normativa, type Norma } from "@/content/sedede";
import Banner from "@/components/ui/Banner";
import Kicker from "@/components/ui/Kicker";
import { metadatos } from "@/lib/seo";

export const metadata = metadatos({
  titulo: "Documentos oficiales",
  descripcion:
    "Resoluciones, reglamentos, convocatorias y memorias de gestión del Servicio Departamental de Deportes de Oruro.",
  ruta: "/documentos",
});

const TONOS: Record<Norma["tono"], string> = {
  primario: "bg-primary-soft text-primary",
  neutro: "bg-hueso-4 text-tinta",
  dorado: "bg-gold text-gold-deep",
};

export default function DocumentosPage() {
  return (
    <div className="min-h-screen bg-hueso">
      <Banner
        kicker="Información institucional"
        titulo="Documentos"
        descripcion="Documentación oficial del Servicio Departamental de Deportes: resoluciones, reglamentos, convocatorias y memorias de gestión."
      />

      <section className="w-full py-space-xl">
        <div className="mx-auto flex max-w-contenido flex-col gap-space-lg px-margin">
          <div className="flex flex-col gap-space-xs">
            <Kicker tono="primario" className="font-bold">
              Centro de documentos
            </Kicker>
            <h2 className="font-display text-headline-xl font-extrabold tracking-tight text-tinta">
              Documentos oficiales
            </h2>
            <p className="max-w-2xl text-body-md text-tinta-2">
              Próximamente encontrarás aquí resoluciones, reglamentos, convocatorias y
              otros documentos institucionales.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
            {normativa.map((norma) => (
              <article
                key={norma.titulo}
                className="flex flex-col justify-between gap-space-md rounded-2xl bg-white p-space-lg shadow-tarjeta"
              >
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <span
                      className={`rounded px-2 py-0.5 font-display text-label-sm font-bold uppercase ${TONOS[norma.tono]}`}
                    >
                      {norma.etiqueta}
                    </span>
                    <FileText aria-hidden className="h-5 w-5 text-tinta-3" />
                  </div>
                  <h3 className="pt-space-xs font-display text-headline-sm font-bold text-tinta">
                    {norma.titulo}
                  </h3>
                  <p className="text-body-sm text-tinta-2">{norma.descripcion}</p>
                </div>

                <p className="rounded-full bg-hueso-2 px-space-sm py-1 text-center font-display text-label-sm font-semibold uppercase text-tinta-3">
              Próximamente
                </p>
              </article>
            ))}
          </div>

          <div className="flex flex-col gap-2 rounded-2xl border border-hueso-5 bg-white p-space-md">
            <span className="inline-flex items-center gap-2 font-display text-label-md font-semibold text-tinta">
              <Info aria-hidden className="h-4 w-4 text-primary" />
              ¿Solicitas un documento que no aparece aquí?
            </span>
            <p className="text-body-sm text-tinta-2">
              Escribe a SEDEDE indicando la unidad
              responsable y el tipo de información requerida.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
