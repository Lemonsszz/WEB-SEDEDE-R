import Link from "next/link";
import { Award, Trophy } from "lucide-react";
import { ruda } from "@/content/sedede";
import Kicker from "@/components/ui/Kicker";
import Boton from "@/components/ui/Boton";
import HectorGaribayDestacado from "@/components/deportistas/HectorGaribayDestacado";

export default function Deportistas() {
  return (
    <section className="w-full bg-hueso py-space-xl text-tinta">
      <div className="mx-auto flex max-w-contenido flex-col gap-space-xl px-margin">
        <div className="flex flex-col justify-between gap-space-md md:flex-row md:items-end">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              <Kicker tono="primario" className="font-extrabold">
                Orgullo deportivo
              </Kicker>
            </div>
            <h2 className="font-display text-headline-xl font-black tracking-tight text-tinta">
              Deportistas de élite
            </h2>
            <p className="max-w-xl text-body-md text-tinta-2">
              El máximo referente del fondismo boliviano nació en Oruro. Conoce su
              récord nacional, sus marcas homologadas y su historia.
            </p>
          </div>

          <Link
            href="/deportistas"
            className="inline-flex items-center gap-space-xs self-start rounded-full bg-hueso-4 px-space-md py-space-xs font-display text-label-md text-tinta transition-colors hover:bg-hueso-5 md:self-auto"
          >
            <span>Ver todos los deportistas</span>
            <Trophy aria-hidden className="h-4 w-4" />
          </Link>
        </div>

        <HectorGaribayDestacado />

        <div className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-r from-primary-dark to-primary p-space-lg text-white shadow-[0_16px_36px_rgba(116,0,21,0.25)] lg:p-space-xl">
          <div className="pointer-events-none absolute -right-16 -top-16 h-80 w-80 rounded-full bg-gold-soft/15 blur-3xl" />
          <Award
            aria-hidden
            className="pointer-events-none absolute bottom-0 right-0 h-60 w-60 text-white/10"
          />

          <div className="relative z-10 flex max-w-2xl flex-col gap-space-md">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-space-sm py-1 font-display text-label-sm font-bold uppercase backdrop-blur-md">
              <Award aria-hidden className="h-4 w-4 text-gold-soft" />
              {ruda.etiqueta}
            </div>

            <h3 className="font-display text-headline-lg font-black tracking-tight text-white lg:text-[34px] lg:leading-[40px]">
              {ruda.titulo} <br />
              {ruda.destacado}
            </h3>

            <p className="text-body-md leading-relaxed text-primary-soft">
              {ruda.descripcion}
            </p>

            <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
              <Boton href={ruda.ctaPrimario.href} variante="claro">
                {ruda.ctaPrimario.texto}
              </Boton>
              <Boton href={ruda.ctaSecundario.href} variante="velo">
                {ruda.ctaSecundario.texto}
              </Boton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
