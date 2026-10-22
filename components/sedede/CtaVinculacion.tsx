import { ArrowRight, List } from "lucide-react";
import Boton from "@/components/ui/Boton";
import Kicker from "@/components/ui/Kicker";

export default function CtaVinculacion() {
  return (
    <section className="w-full bg-primary py-space-xl text-white">
      <div className="mx-auto flex max-w-contenido flex-col items-center justify-between gap-space-lg lg:flex-row">
        <div className="flex max-w-2xl flex-col gap-space-xs text-center lg:text-left">
          <Kicker tono="dorado">
            Atención al deportista y asociaciones
          </Kicker>
          <h2 className="font-display text-headline-xl font-black tracking-tight text-white">
            ¿Representas a una disciplina o buscas afiliación?
          </h2>
          <p className="text-body-md leading-relaxed text-white/90">
            Accede a atención médica deportiva de manera gratuita.
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-center gap-space-sm sm:flex-row">
          <Boton href="/contacto" variante="claro">
            Iniciar trámite
            <ArrowRight aria-hidden className="h-5 w-5" />
          </Boton>
          <Boton href="/asociaciones" variante="velo">
            Ver directorio
            <List aria-hidden className="h-5 w-5" />
          </Boton>
        </div>
      </div>
    </section>
  );
}
