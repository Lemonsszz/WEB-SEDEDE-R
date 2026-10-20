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
};

export default function ImagenNoticia({
  src,
  alt,
  className,
  decorativa = false,
  eager = false,
}: Props) {
  const [actual, setActual] = useState(
    src || IMAGEN_NOTICIA_PREDETERMINADA
  );

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={actual}
      alt={decorativa ? "" : alt}
      aria-hidden={decorativa || undefined}
      loading={eager ? "eager" : "lazy"}
      className={className}
      onError={() => setActual(IMAGEN_NOTICIA_PREDETERMINADA)}
    />
  );
}
