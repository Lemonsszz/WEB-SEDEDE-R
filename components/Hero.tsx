import { ArrowRight } from "lucide-react";
import Boton from "@/components/ui/Boton";
import Kicker from "@/components/ui/Kicker";
import { metricas } from "@/content/sedede";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-noche">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/img/hero-deportes.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-noche via-noche/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-noche via-transparent to-noche/60" />

      <div className="relative mx-auto flex min-h-[560px] max-w-contenido flex-col justify-center px-margin py-24 lg:py-32">
        <div className="z-10 flex max-w-3xl flex-col gap-space-md">
          <div className="flex items-center gap-space-xs">
            <div className="h-1 w-8 rounded-full bg-primary" />
            <Kicker tono="rosa">Servicio Departamental de Deportes</Kicker>
          </div>

          <h2 className="font-display text-display-hero uppercase leading-none tracking-tight text-white">
            Impulsando el deporte, <br />
            <span className="text-gold-soft">construyendo futuro.</span>
          </h2>

          <p className="max-w-xl font-body-lg leading-relaxed text-hueso-3">
            Conoce las actividades, asociaciones deportivas federadas, eventos
            oficiales y el ecosistema integral de apoyo al atleta orureño.
          </p>

          <div className="flex flex-wrap items-center gap-space-md pt-space-sm">
            <Boton href="/sedede">
              Conoce SEDEDE
              <ArrowRight aria-hidden className="h-5 w-5" />
            </Boton>
            <Boton href="/asociaciones" variante="fantasma">
              Ver asociaciones
            </Boton>
          </div>

          <dl className="grid max-w-xl grid-cols-2 gap-gutter-sm pt-space-lg sm:grid-cols-3">
            {metricas.slice(0, 3).map((metrica) => (
              <div
                key={metrica.label}
                className="rounded-xl bg-black/40 p-space-sm backdrop-blur-md"
              >
                <dt className="sr-only">{metrica.label}</dt>
                <dd className="font-display text-stat-display font-black leading-none text-gold-soft">
                  {metrica.valor}
                </dd>
                <dd className="mt-1 block font-display text-label-sm uppercase tracking-wider text-white/70">
                  {metrica.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
