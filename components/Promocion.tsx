import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  fechaFinLegible,
  getPromocionActiva,
} from "@/content/promociones";

/**
 * Franja de promoción de la portada: deliberadamente chica (una sola línea de
 * texto, miniatura del flyer y un enlace) para no competir con las noticias.
 * Se renderiza en el servidor; como la portada se revalida cada minuto, la
 * promoción desaparece sola al vencer.
 */
export default function Promocion() {
  const promocion = getPromocionActiva();

  if (!promocion) {
    return null;
  }

  return (
    <section className="w-full bg-hueso pb-space-sm pt-space-md">
      <div className="mx-auto w-full max-w-contenido px-margin">
        <a
          href={promocion.enlace}
          target={promocion.externo ? "_blank" : undefined}
          rel={promocion.externo ? "noopener noreferrer" : undefined}
          className="group flex items-center gap-3 rounded-2xl border-l-[3px] border-primary bg-white p-2.5 pr-3 shadow-sm ring-1 ring-black/[0.04] transition-shadow duration-300 hover:shadow-tarjeta sm:gap-4 sm:p-3 sm:pr-4"
        >
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-hueso-2 sm:h-20 sm:w-20">
            <Image
              src={promocion.imagen}
              alt={promocion.alt}
              fill
              sizes="(max-width: 640px) 64px, 80px"
              quality={60}
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
              Promoción
            </p>
            <p className="truncate font-display text-body-md font-bold leading-snug text-tinta sm:text-headline-sm">
              {promocion.titulo}
            </p>
            <p className="mt-0.5 text-body-sm text-tinta-3">
              Sé parte y compite el {fechaFinLegible(promocion)}
            </p>
          </div>

          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1.5 font-display text-label-sm font-bold text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white sm:px-3">
            <span className="hidden sm:inline">Ver afiche</span>
            <ArrowUpRight aria-hidden className="h-4 w-4" />
          </span>
        </a>
      </div>
    </section>
  );
}
