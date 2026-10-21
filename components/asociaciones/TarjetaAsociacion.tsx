import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Asociacion } from "@/content/asociaciones";

export default function TarjetaAsociacion({
  asociacion,
  compacta = false,
}: {
  asociacion: Asociacion;
  compacta?: boolean;
}) {
  return (
    <Link
      href={`/asociaciones/${asociacion.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-noche-3 shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:-translate-y-1.5"
    >
      <div className={`relative w-full ${compacta ? "h-48" : "h-56"}`}>
        <Image
          src={asociacion.imagen}
          alt={asociacion.nombre}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noche via-noche/40 to-transparent" />

        <span className="absolute left-space-sm top-space-sm rounded-full bg-black/60 px-space-sm py-1 font-display text-label-sm font-bold uppercase text-rosa backdrop-blur-md">
          {asociacion.disciplina}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-2 p-space-md">
        <h3 className="font-display text-headline-sm font-extrabold leading-snug tracking-tight text-white transition-colors group-hover:text-primary-soft-dim">
          {asociacion.nombre}
        </h3>

        {compacta ? null : (
          <p className="line-clamp-2 font-body-sm leading-relaxed text-tinta-3">
            {asociacion.descripcion}
          </p>
        )}

        <span className="inline-flex items-center gap-1 font-display text-label-sm text-gold-soft transition-transform duration-300 group-hover:translate-x-1">
          Ver asociación
          <ArrowRight aria-hidden className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
