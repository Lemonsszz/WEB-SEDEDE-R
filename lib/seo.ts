import type { Metadata } from "next";

/**
 * Utilidades de SEO compartidas por todas las páginas.
 *
 * El dominio sale de `NEXT_PUBLIC_SITIO_URL` (se incrusta en el build, así que
 * al activar el `.gob.bo` hay que cambiar la variable **y redesplegar**). Si la
 * variable falta se usa la URL de producción actual, para que el sitemap, las
 * canónicas y las imágenes de Open Graph nunca queden en `localhost`.
 */
export const SITIO_URL = (
  process.env.NEXT_PUBLIC_SITIO_URL ?? "https://www.sededeoruro.com"
).replace(/\/+$/, "");

/** Nombre corto que se usa en el título de las pestañas. */
export const NOMBRE_SITIO = "SEDEDE Oruro";

/** Imagen por defecto para Open Graph y Twitter (el escudo institucional). */
export const IMAGEN_SOCIAL = "/img/logo-sedede-2.png";

type Entrada = {
  /** Título de la página. El sufijo " | SEDEDE Oruro" lo agrega el layout. */
  titulo: string;
  descripcion: string;
  /** Ruta interna, con barra inicial: `/noticias`. */
  ruta: string;
  /** Imagen absoluta (Cloudinary) o ruta local. */
  imagen?: string | null;
  tipo?: "website" | "article";
  /** ISO 8601. Solo para artículos. */
  publicadoEn?: string | null;
  modificadoEn?: string | null;
  /** `true` para vistas que no deben indexarse (panel, login). */
  noIndexar?: boolean;
  /** `true` cuando el título ya es completo y no debe llevar el sufijo del sitio. */
  sinSufijo?: boolean;
};

/**
 * Normaliza una fecha de la base (`2026-10-22 16:05:55+00`) al formato ISO
 * 8601 que esperan Open Graph y schema.org (`2026-10-22T16:05:55.000Z`).
 */
export function fechaIso(valor: string | null | undefined): string | undefined {
  if (!valor) return undefined;
  const fecha = new Date(valor);
  return Number.isNaN(fecha.getTime()) ? undefined : fecha.toISOString();
}

/**
 * Arma el `Metadata` completo de una página: título, descripción, canónica,
 * Open Graph (WhatsApp/Facebook) y Twitter Card.
 */
export function metadatos({
  titulo,
  descripcion,
  ruta,
  imagen,
  tipo = "website",
  publicadoEn,
  modificadoEn,
  noIndexar = false,
  sinSufijo = false,
}: Entrada): Metadata {
  const url = `${SITIO_URL}${ruta}`;
  const imagenFinal = !imagen
    ? `${SITIO_URL}${IMAGEN_SOCIAL}`
    : imagen.startsWith("http")
      ? imagen
      : `${SITIO_URL}${imagen}`;

  const tituloSocial = sinSufijo ? titulo : `${titulo} | ${NOMBRE_SITIO}`;
  const publicadoIso = fechaIso(publicadoEn);
  const modificadoIso = fechaIso(modificadoEn);

  return {
    title: sinSufijo ? { absolute: titulo } : titulo,
    description: descripcion,
    alternates: { canonical: ruta },
    robots: noIndexar
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: tipo,
      locale: "es_BO",
      siteName: NOMBRE_SITIO,
      url,
      title: tituloSocial,
      description: descripcion,
      images: [{ url: imagenFinal, alt: titulo }],
      ...(publicadoIso ? { publishedTime: publicadoIso } : {}),
      ...(modificadoIso ? { modifiedTime: modificadoIso } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: tituloSocial,
      description: descripcion,
      images: [imagenFinal],
    },
  };
}

/**
 * Convierte el contenido de una noticia (HTML) en un texto plano apto para
 * `description`. Corta en palabras completas para no dejar una palabra a medias.
 */
export function resumenTexto(
  texto: string | null | undefined,
  maximo = 158
): string | undefined {
  if (!texto) return undefined;

  const limpio = texto
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&aacute;/gi, "á")
    .replace(/&eacute;/gi, "é")
    .replace(/&iacute;/gi, "í")
    .replace(/&oacute;/gi, "ó")
    .replace(/&uacute;/gi, "ú")
    .replace(/&ntilde;/gi, "ñ")
    .replace(/\s+/g, " ")
    .trim();

  if (!limpio) return undefined;
  if (limpio.length <= maximo) return limpio;

  const corte = limpio.slice(0, maximo);
  const ultimoEspacio = corte.lastIndexOf(" ");
  return `${(ultimoEspacio > 60 ? corte.slice(0, ultimoEspacio) : corte).trimEnd()}…`;
}
