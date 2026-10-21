import { Map, FileText, Sparkles, Users, Trophy, Zap, Award } from "lucide-react";
import { direccion, metricas } from "@/content/sedede";
import Boton from "@/components/ui/Boton";

const ICONOS = {
  diversity: Users,
  stadium: Trophy,
  sprint: Zap,
  medalla: Award,
} as const;

export default function HeroInstitucional() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-primary to-primary-deep text-white">
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-10 mix-blend-overlay"
      >
        <defs>
          <pattern
            id="hero-grid-sedede"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid-sedede)" />
      </svg>

      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-gold-soft/20 blur-3xl" />

      <div className="relative mx-auto flex max-w-contenido flex-col gap-space-lg px-margin py-space-xl lg:py-24">
        <div className="flex flex-wrap items-center gap-space-xs text-gold-soft">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/30 px-3 py-1 font-display text-kicker uppercase tracking-wider backdrop-blur-sm">
            <Sparkles aria-hidden className="h-3.5 w-3.5" />
            {direccion.entidad}
          </span>
          <span className="text-white/40">•</span>
          <span className="font-display text-label-sm uppercase tracking-wider text-white/80">
            Entidad rectora del deporte
          </span>
        </div>

        <div className="flex flex-col justify-between gap-space-lg lg:flex-row lg:items-end">
          <div className="flex max-w-3xl flex-col gap-space-xs">
            <div className="mb-space-xs h-1 w-12 rounded-full bg-gold-soft" />
            <h1 className="text-balance font-display text-headline-xl font-black uppercase leading-[1.08] tracking-tight text-white lg:text-display-hero lg:leading-none">
              Sobre el SEDEDE
            </h1>
            <p className="max-w-2xl pt-space-xs text-body-lg leading-relaxed text-white/90">
              {direccion.descripcion}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-space-sm">
            <Boton href="#infraestructura" variante="claro">
              Explorar escenarios
              <Map aria-hidden className="h-4 w-4" />
            </Boton>
            <Boton href="#normativa" variante="velo">
              Resoluciones
              <FileText aria-hidden className="h-4 w-4" />
            </Boton>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-gutter pt-space-md md:grid-cols-4">
          {metricas.map((metrica) => {
            const Icono = ICONOS[metrica.icono];
            return (
              <div
                key={metrica.label}
                className="flex flex-col justify-between rounded-xl bg-primary/40 p-space-md shadow-sm backdrop-blur-md"
              >
                <div className="flex items-center justify-between">
                  <dt className="font-display text-label-sm uppercase tracking-wider text-white/70">
                    {metrica.label}
                  </dt>
                  <Icono aria-hidden className="h-5 w-5 text-gold-soft" />
                </div>
                <dd className="pt-space-sm">
                  <span className="block font-display text-stat-display font-black text-white">
                    {metrica.valor}
                  </span>
                  <span className="text-body-sm text-white/80">{metrica.detalle}</span>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
