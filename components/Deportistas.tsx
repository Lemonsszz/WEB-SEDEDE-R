import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, Trophy } from "lucide-react";
import { getDeportistas, type Deportista } from "@/content/deportistas";
import { ruda } from "@/content/sedede";
import Kicker from "@/components/ui/Kicker";
import Badge from "@/components/ui/Badge";
import Boton from "@/components/ui/Boton";

function TarjetaDeportista({ deportista }: { deportista: Deportista }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-tarjeta transition-all duration-300 hover:-translate-y-1.5 hover:shadow-tarjeta-hover">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-hueso-3">
        <Image
          src={deportista.imagen}
          alt={deportista.nombre}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-space-sm top-space-sm">
          <Badge tono="dorado" icono={Trophy}>
            {deportista.logro}
          </Badge>
        </div>
        <div className="absolute bottom-space-sm right-space-sm">
          <span className="rounded-md bg-black/70 px-space-xs py-0.5 font-display text-label-sm font-semibold text-white backdrop-blur-sm">
            {deportista.disciplina}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-space-md p-space-md">
        <div>
          <span className="font-display text-label-sm font-bold uppercase tracking-wider text-primary">
            {deportista.disciplina}
          </span>
          <h3 className="mt-1 font-display text-headline-md font-black tracking-tight text-tinta transition-colors group-hover:text-primary">
            {deportista.nombre}
          </h3>
          <p className="mt-2 font-body-sm text-tinta-2">{deportista.bio}</p>
        </div>

        <div className="flex items-center justify-between border-t border-hueso-5 pt-space-sm">
          <div className="flex flex-col">
            <span className="font-display text-label-sm text-tinta-2">Logro</span>
            <span className="font-display text-headline-sm font-extrabold text-tinta">
              {deportista.logro}
            </span>
          </div>
          <Link
            href={`/deportistas/${deportista.slug}`}
            aria-label={`Ver perfil de ${deportista.nombre}`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-hueso-2 transition-colors hover:bg-primary hover:text-white"
          >
            <ArrowRight aria-hidden className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Deportistas() {
  const destacados = getDeportistas().slice(0, 3);

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
            <p className="max-w-xl font-body-md text-tinta-2">
              Conoce a los atletas orureños de alto rendimiento que representan
              y destacan en escenarios nacionales e internacionales.
            </p>
          </div>

          <Link
            href="/deportistas"
            className="inline-flex items-center gap-space-xs self-start rounded-full bg-hueso-4 px-space-md py-space-xs font-display text-label-md text-tinta transition-colors hover:bg-hueso-5 md:self-auto"
          >
            <span>Ver ranking completo</span>
            <Trophy aria-hidden className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-gutter-lg md:grid-cols-3">
          {destacados.map((deportista) => (
            <TarjetaDeportista key={deportista.slug} deportista={deportista} />
          ))}
        </div>

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

            <p className="font-body-md leading-relaxed text-primary-soft">
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
