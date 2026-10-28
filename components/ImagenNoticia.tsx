"use client";

import { useState } from "react";

export const IMAGEN_NOTICIA_PREDETERMINADA =
  "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1800&q=85";

type Props = {
  src?: string | null;
  alt: string;
  className?: string;
  decorativa?: boolean;
  eager?: boolean;
  /** Ancho (px) que se le pide a Cloudinary/Unsplash para esta posición. */
  ancho?: number;
};

/**
 * Reescribe la URL para que el CDN entregue la imagen ya adaptada.
 *
 * Los archivos de noticias se guardan en Cloudinary con su resolución
 * original (una foto de celular ronda los 200 KB). Servir ese original para
 * una miniatura de 80 px es puro desperdicio: con `f_auto,q_auto,w_<ancho>`
 * Cloudinary devuelve WebP/AVIF del tamaño justo (≈10 veces menos peso).
 * Las URL de otros dominios se dejan intactas.
 */
export function urlImagenOptimizada(url: string, ancho: number): string {
  try {
    const destino = new URL(url);

    if (
      destino.hostname === "res.cloudinary.com" &&
      destino.pathname.includes("/image/upload/")
    ) {
      destino.pathname = destino.pathname.replace(
        "/image/upload/",
        `/image/upload/f_auto,q_auto:good,c_limit,w_${Math.round(ancho)},dpr_auto/`
      );
      return destino.toString();
    }

    if (destino.hostname === "images.unsplash.com") {
      destino.searchParams.set("auto", "format");
      destino.searchParams.set("fit", "crop");
      destino.searchParams.set("w", String(Math.round(ancho)));
      destino.searchParams.set("q", "70");
      return destino.toString();
    }
  } catch {
    // URL inválida o relativa: se usa tal cual.
  }

  return url;
}

export default function ImagenNoticia({
  src,
  alt,
  className,
  decorativa = false,
  eager = false,
  ancho = 1200,
}: Props) {
  const [actual, setActual] = useState(
    src || IMAGEN_NOTICIA_PREDETERMINADA
  );

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={urlImagenOptimizada(actual, ancho)}
      alt={decorativa ? "" : alt}
      aria-hidden={decorativa || undefined}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={eager ? "high" : undefined}
      className={className}
      onError={() => setActual(IMAGEN_NOTICIA_PREDETERMINADA)}
    />
  );
}
