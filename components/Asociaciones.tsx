"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  familias,
  getAsociacionesPorFamilia,
  type Asociacion,
} from "@/content/asociaciones";
import Kicker from "@/components/ui/Kicker";
import Chip from "@/components/ui/Chip";

function TarjetaAsociacion({ asociacion }: { asociacion: Asociacion }) {
  return (
    <Link
      href={`/asociaciones/${asociacion.slug}`}
      className="group relative h-80 overflow-hidden rounded-2xl bg-noche-3 shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:-translate-y-1.5"
    >
      <Image
        src={asociacion.imagen}
        alt={asociacion.nombre}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-noche via-noche/50 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-between p-space-md">
        <div className="self-start">
          <span className="rounded-full bg-black/60 px-space-sm py-1 font-display text-label-sm font-bold uppercase text-rosa backdrop-blur-md">
            {asociacion.disciplina}
          </span>
        </div>

        <div>
          <h3 className="font-display text-headline-md font-extrabold tracking-tight text-white transition-colors group-hover:text-primary-soft-dim">
            {asociacion.nombre}
          </h3>
          <p className="mt-space-xs inline-flex items-center gap-1 font-display text-label-sm text-gold-soft transition-transform duration-300 group-hover:translate-x-1">
            Ver asociación
            <ArrowRight aria-hidden className="h-4 w-4" />
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function Asociaciones() {
  const [familia, setFamilia] = useState("todas");
  const listado = getAsociacionesPorFamilia(familia).slice(0, 6);

  return (
    <section className="w-full bg-noche-2 py-space-xl text-white">
      <div className="mx-auto flex max-w-contenido flex-col gap-space-lg px-margin">
        <div className="flex flex-col justify-between gap-space-md md:flex-row md:items-end">
          <div className="flex flex-col gap-space-xs">
            <Kicker tono="rosa">Deporte departamental</Kicker>
            <h2 className="font-display text-headline-xl font-extrabold tracking-tight text-white">
              Asociaciones deportivas
            </h2>
            <p className="font-body-md text-tinta-3">
              Conoce las asociaciones departamentales legalmente constituidas y
              federadas.
            </p>
          </div>

          <Link
            href="/asociaciones"
            className="inline-flex items-center gap-space-xs self-start rounded-full bg-white/5 px-space-md py-space-xs font-display text-label-md text-white transition-all hover:bg-white/10 hover:text-gold-soft md:self-auto"
          >
            <span>Ver las 18 asociaciones</span>
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-space-xs">
          {familias.map((item) => (
            <Chip
              key={item.slug}
              activo={familia === item.slug}
              onClick={() => setFamilia(item.slug)}
            >
              {item.nombre}
            </Chip>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-gutter-lg md:grid-cols-2 lg:grid-cols-3">
          {listado.map((asociacion) => (
            <TarjetaAsociacion key={asociacion.slug} asociacion={asociacion} />
          ))}
        </div>
      </div>
    </section>
  );
}
