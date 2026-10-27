import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Asociacion } from "@/content/asociaciones";
import PortadaAsociacion from "@/components/asociaciones/PortadaAsociacion";

type Tono = "oscuro" | "claro";

const ESTILOS: Record<
  Tono,
  {
    tarjeta: string;
    degradado: string;
    disciplina: string;
    titulo: string;
    descripcion: string;
    enlace: string;
  }
> = {
  oscuro: {
    tarjeta:
      "bg-noche-3 shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:-translate-y-1.5",
    degradado: "bg-gradient-to-t from-noche via-noche/40 to-transparent",
    disciplina:
      "bg-black/60 text-rosa backdrop-blur-md group-hover:bg-primary group-hover:text-white",
    titulo: "text-white group-hover:text-primary-soft-dim",
    descripcion: "text-white/70",
    enlace: "text-gold-soft",
  },
  claro: {
    tarjeta:
      "bg-white ring-1 ring-black/[0.04] shadow-tarjeta hover:-translate-y-1.5 hover:shadow-tarjeta-hover",
    degradado: "bg-gradient-to-t from-black/10 to-transparent",
    disciplina:
      "bg-white/95 text-primary shadow-sm ring-1 ring-black/5 backdrop-blur-md",
    titulo: "text-tinta group-hover:text-primary",
    descripcion: "text-tinta-2",
    enlace: "text-primary",
  },
};

export default function TarjetaAsociacion({
  asociacion,
  compacta = false,
  tono = "oscuro",
}: {
  asociacion: Asociacion;
  compacta?: boolean;
  tono?: Tono;
}) {
  const estilos = ESTILOS[tono];

  return (
    <Link
      href={`/asociaciones/${asociacion.slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300 ${estilos.tarjeta}`}
    >
      <div className={`relative w-full ${compacta ? "h-48" : "h-56"}`}>
        <PortadaAsociacion
          asociacion={asociacion}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className={`absolute inset-0 ${estilos.degradado}`} />

        <span
          className={`absolute left-space-sm top-space-sm rounded-full px-space-sm py-1 font-display text-label-sm font-bold uppercase transition-colors ${estilos.disciplina}`}
        >
          {asociacion.disciplina}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-2 p-space-md">
        <h3
          className={`font-display text-headline-sm font-extrabold leading-snug tracking-tight transition-colors ${estilos.titulo}`}
        >
          {asociacion.nombre}
        </h3>

        {compacta ? null : (
          <p
            className={`line-clamp-2 text-body-sm leading-relaxed ${estilos.descripcion}`}
          >
            {asociacion.descripcion}
          </p>
        )}

        <span
          className={`inline-flex items-center gap-1 font-display text-label-sm transition-transform duration-300 group-hover:translate-x-1 ${estilos.enlace}`}
        >
          Ver asociación
          <ArrowRight aria-hidden className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
