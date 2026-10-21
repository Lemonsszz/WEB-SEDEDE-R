import { Flag, Trophy, Mountain, Scale, BadgeCheck, ShieldCheck } from "lucide-react";
import { mision, vision, valores } from "@/content/sedede";
import Kicker from "@/components/ui/Kicker";

export default function Pilares() {
  return (
    <section className="w-full bg-surface py-space-xl">
      <div className="mx-auto flex max-w-contenido flex-col gap-space-lg px-margin">
        <div className="flex flex-col justify-between gap-space-md md:flex-row md:items-end">
          <div>
            <Kicker tono="primario" className="font-bold">
              Compromiso constitucional
            </Kicker>
            <h2 className="mt-1 font-display text-headline-xl font-extrabold tracking-tight text-tinta">
              Pilares de nuestra vocación
            </h2>
          </div>
          <p className="max-w-md font-body-md text-tinta-2">
            Líneas maestras orientadas al fomento de la actividad física comunitaria y
            la preparación olímpica departamental.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-gutter lg:grid-cols-3">
          <article className="flex flex-col justify-between gap-space-md rounded-2xl bg-white p-space-lg shadow-tarjeta transition-shadow duration-300 hover:shadow-tarjeta-hover">
            <div className="flex flex-col gap-space-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Flag aria-hidden className="h-6 w-6" />
              </div>
              <h3 className="font-display text-headline-md font-bold text-tinta">
                {mision.titulo}
              </h3>
              <p className="font-body-md leading-relaxed text-tinta-2">{mision.texto}</p>
            </div>
            <div className="flex items-center gap-space-xs rounded-xl bg-hueso-2 p-space-sm">
              <BadgeCheck aria-hidden className="h-[18px] w-[18px] text-primary" />
              <span className="font-display text-label-sm font-medium text-tinta-2">
                {mision.fundamento}
              </span>
            </div>
          </article>

          <article className="flex flex-col justify-between gap-space-md rounded-2xl bg-white p-space-lg shadow-tarjeta transition-shadow duration-300 hover:shadow-tarjeta-hover">
            <div className="flex flex-col gap-space-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/40 text-gold-deep">
                <Trophy aria-hidden className="h-6 w-6" />
              </div>
              <h3 className="font-display text-headline-md font-bold text-tinta">
                {vision.titulo}
              </h3>
              <p className="font-body-md leading-relaxed text-tinta-2">{vision.texto}</p>
            </div>
            <div className="flex items-center gap-space-xs rounded-xl bg-hueso-2 p-space-sm">
              <Mountain aria-hidden className="h-[18px] w-[18px] text-gold-deep" />
              <span className="font-display text-label-sm font-medium text-tinta-2">
                Altitud competitiva: 3.735 m.s.n.m.
              </span>
            </div>
          </article>

          <article className="flex flex-col justify-between gap-space-md rounded-2xl bg-white p-space-lg shadow-tarjeta transition-shadow duration-300 hover:shadow-tarjeta-hover">
            <div className="flex flex-col gap-space-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-hueso-4 text-tinta">
                <Scale aria-hidden className="h-6 w-6" />
              </div>
              <h3 className="font-display text-headline-md font-bold text-tinta">
                Valores rectores
              </h3>
              <ul className="flex flex-col gap-space-xs pt-space-xs">
                {valores.map((valor) => (
                  <li
                    key={valor.titulo}
                    className="flex items-start gap-2 font-body-sm text-tinta-2"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>
                      <strong className="text-tinta">{valor.titulo}:</strong>{" "}
                      {valor.descripcion}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-space-xs rounded-xl bg-hueso-2 p-space-sm">
              <ShieldCheck aria-hidden className="h-[18px] w-[18px] text-tinta-3" />
              <span className="font-display text-label-sm font-medium text-tinta-2">
                Código de ética y buena gobernanza
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
