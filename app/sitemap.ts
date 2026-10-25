import type { MetadataRoute } from "next";
import { SITIO_URL } from "@/lib/seo";
import { getAsociaciones } from "@/content/asociaciones";
import { getDeportistas } from "@/content/deportistas";
import { getComunicados, getNoticias } from "@/lib/api";

/**
 * El sitemap se arma con las rutas fijas + el contenido publicado.
 *
 * Se regenera cada hora (el contenido nuevo entra igual por la revalidación de
 * las páginas; esto solo actualiza la lista que leen los buscadores).
 */
export const revalidate = 3600;

type Frecuencia = MetadataRoute.Sitemap[number]["changeFrequency"];

const ESTATICAS: Array<{
  ruta: string;
  prioridad: number;
  frecuencia: Frecuencia;
}> = [
  { ruta: "/", prioridad: 1, frecuencia: "daily" },
  { ruta: "/noticias", prioridad: 0.9, frecuencia: "daily" },
  { ruta: "/eventos", prioridad: 0.8, frecuencia: "weekly" },
  { ruta: "/comunicados", prioridad: 0.8, frecuencia: "weekly" },
  { ruta: "/sedede", prioridad: 0.7, frecuencia: "monthly" },
  { ruta: "/asociaciones", prioridad: 0.7, frecuencia: "monthly" },
  { ruta: "/deportistas", prioridad: 0.7, frecuencia: "monthly" },
  { ruta: "/deportistas/hector-garibay", prioridad: 0.8, frecuencia: "monthly" },
  { ruta: "/documentos", prioridad: 0.6, frecuencia: "monthly" },
  { ruta: "/contacto", prioridad: 0.5, frecuencia: "yearly" },
];

/** `2026-10-23T00:00:00.000000Z` → `Date`, o `undefined` si no es válida. */
function aFecha(valor: string | null | undefined): Date | undefined {
  if (!valor) return undefined;
  const fecha = new Date(valor);
  return Number.isNaN(fecha.getTime()) ? undefined : fecha;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const ahora = new Date();

  const fijas: MetadataRoute.Sitemap = ESTATICAS.map((entrada) => ({
    url: `${SITIO_URL}${entrada.ruta}`,
    lastModified: ahora,
    changeFrequency: entrada.frecuencia,
    priority: entrada.prioridad,
  }));

  // El API puede estar caído al generar el sitemap: en ese caso se publican
  // igual las rutas fijas y el contenido entra en la siguiente regeneración.
  const [noticias, comunicados] = await Promise.all([
    getNoticias().catch(() => []),
    getComunicados().catch(() => []),
  ]);

  const detalleNoticias: MetadataRoute.Sitemap = noticias.map((noticia) => ({
    url: `${SITIO_URL}/noticias/${noticia.slug}`,
    lastModified: aFecha(noticia.fecha_publicacion) ?? ahora,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const detalleComunicados: MetadataRoute.Sitemap = comunicados.map(
    (comunicado) => ({
      url: `${SITIO_URL}/comunicados/${comunicado.id}`,
      lastModified: aFecha(comunicado.fecha_publicacion) ?? ahora,
      changeFrequency: "yearly",
      priority: 0.5,
    })
  );

  const asociaciones: MetadataRoute.Sitemap = getAsociaciones().map(
    (asociacion) => ({
      url: `${SITIO_URL}/asociaciones/${asociacion.slug}`,
      lastModified: ahora,
      changeFrequency: "yearly",
      priority: 0.5,
    })
  );

  const deportistas: MetadataRoute.Sitemap = getDeportistas().map(
    (deportista) => ({
      url: `${SITIO_URL}/deportistas/${deportista.slug}`,
      lastModified: ahora,
      changeFrequency: "yearly",
      priority: 0.5,
    })
  );

  return [
    ...fijas,
    ...detalleNoticias,
    ...detalleComunicados,
    ...asociaciones,
    ...deportistas,
  ];
}
