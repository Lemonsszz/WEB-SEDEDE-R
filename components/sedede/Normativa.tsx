import Link from "next/link";
import { Download, FileText } from "lucide-react";
import { normativa, type Norma } from "@/content/sedede";
import Kicker from "@/components/ui/Kicker";

const TONOS: Record<Norma["tono"], string> = {
  primario: "bg-primary-soft text-primary",
  neutro: "bg-hueso-4 text-tinta",
  dorado: "bg-gold text-gold-deep",
};

export default function Normativa() {
  return (
    <section id="normativa" className="w-full bg-hueso-2 py-space-xl">
      <div className="mx-auto flex max-w-contenido flex-col gap-space-lg px-margin">
        <div className="flex flex-col gap-space-xs">
          <Kicker tono="primario" className="font-bold">
            Gobernanza y ley
          </Kicker>
          <h2 className="font-display text-headline-xl font-extrabold tracking-tight text-tinta">
            Marco jurídico e institucional
          </h2>
          <p className="max-w-2xl text-body-md text-tinta-2">
            Acceso público e inmediato a reglamentos, resoluciones departamentales y
            memorias de gestión que garantizan el ejercicio transparente de las funciones
            deportivas.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
          {normativa.map((norma) => (
            <article
              key={norma.titulo}
              className="flex flex-col justify-between rounded-2xl bg-white p-space-lg shadow-tarjeta"
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

              <div className="pt-space-md">
                {norma.archivo ? (
                  <a
                    href={norma.archivo}
                    download
                    className="inline-flex items-center gap-1.5 font-display text-label-sm font-bold text-primary transition-colors hover:text-primary-dark"
                  >
                    <span>Descargar documento</span>
                    <Download aria-hidden className="h-4 w-4" />
                  </a>
                ) : (
                  <Link
                    href={norma.href}
                    className="inline-flex items-center gap-1.5 font-display text-label-sm font-bold text-primary transition-colors hover:text-primary-dark"
                  >
                    <span>Ver en el centro de documentos</span>
                    <Download aria-hidden className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
