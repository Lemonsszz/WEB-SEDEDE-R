"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { familias, getAsociacionesPorFamilia } from "@/content/asociaciones";
import Kicker from "@/components/ui/Kicker";
import Chip from "@/components/ui/Chip";
import TarjetaAsociacion from "@/components/asociaciones/TarjetaAsociacion";

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
            <p className="text-body-md text-white/70">
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
