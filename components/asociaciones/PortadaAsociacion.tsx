import Image from "next/image";
import type { Asociacion } from "@/content/asociaciones";

/**
 * Portada de una asociación: la foto si ya existe, o el emblema institucional
 * sobre un degradado carmesí mientras la institución no entregue las imágenes
 * reales. Se usa igual en la tarjeta del listado y en el detalle, siempre
 * dentro de un contenedor `relative` (el relleno es absoluto).
 */
export default function PortadaAsociacion({
  asociacion,
  sizes,
  prioridad = false,
}: {
  asociacion: Asociacion;
  sizes: string;
  prioridad?: boolean;
}) {
  if (asociacion.imagen) {
    return (
      <Image
        src={asociacion.imagen}
        alt={asociacion.nombre}
        fill
        priority={prioridad}
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
    );
  }

  return (
    <div
      aria-hidden
      className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary via-primary to-primary-dark"
    >
      <Image
        src="/img/logo-oficial.png"
        alt=""
        fill
        sizes={sizes}
        className="object-contain p-[18%] opacity-25"
      />
    </div>
  );
}
