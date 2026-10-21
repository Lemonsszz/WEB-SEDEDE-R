"use client";

import { useState } from "react";
import { familias, getAsociacionesPorFamilia } from "@/content/asociaciones";
import Chip from "@/components/ui/Chip";
import TarjetaAsociacion from "@/components/asociaciones/TarjetaAsociacion";

export default function ListadoAsociaciones() {
  const [familia, setFamilia] = useState("todas");
  const listado = getAsociacionesPorFamilia(familia);

  return (
    <section className="w-full bg-noche-2 py-space-xl">
      <div className="mx-auto flex max-w-contenido flex-col gap-space-lg px-margin">
        <div className="flex flex-col gap-space-sm">
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

          <p className="font-display text-label-md text-white/70">
            {listado.length}{" "}
            {listado.length === 1 ? "asociación" : "asociaciones"} en esta categoría
          </p>
        </div>

        {listado.length === 0 ? (
          <p className="rounded-2xl bg-white/5 p-space-lg text-center text-body-md text-white/70">
            No hay asociaciones registradas en esta categoría.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-gutter-lg md:grid-cols-2 lg:grid-cols-3">
            {listado.map((asociacion) => (
              <TarjetaAsociacion key={asociacion.slug} asociacion={asociacion} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
