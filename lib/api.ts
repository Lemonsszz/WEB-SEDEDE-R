// La URL base se normaliza quitando la barra final: la app concatena el
// recurso con "/", así que un valor como "https://api.example.com/api/"
// produciría "/api//noticias" y la API respondería 404.
const API_URL = (
  typeof window === "undefined"
    ? process.env.API_URL
    : process.env.NEXT_PUBLIC_API_URL
)?.replace(/\/+$/, "");

/**
 * Cada cuántos segundos se regeneran las páginas con datos del API.
 *
 * Es el mismo TTL que el caché del backend (`Cache::remember(..., 60)` en
 * `NoticiaController`, `ComunicadoController` y `EventoController`), que a su
 * vez se invalida con `Cache::forget` en cada alta/edición/baja del panel.
 * Con esto la página se arma una vez por minuto y el resto de las visitas las
 * sirve el CDN de Vercel, en vez de consultar Render + Supabase en cada carga.
 */
export const REVALIDACION_DATOS = 60;

type OpcionesFetch = RequestInit & { next?: { revalidate: number } };

/**
 * En el servidor se pide a Next que cachee la respuesta (`next.revalidate`);
 * en el navegador ese campo no existe y el fetch va directo al API, que ya
 * responde desde su propio caché de 60 s.
 */
function opcionesFetch(): OpcionesFetch {
  return typeof window === "undefined"
    ? { next: { revalidate: REVALIDACION_DATOS } }
    : {};
}

async function consultarAPI<T>(recurso: string): Promise<T[]> {
  if (!API_URL) {
    throw new Error("Falta configurar API_URL en .env.local");
  }

  const respuesta = await fetch(`${API_URL}/${recurso}`, opcionesFetch());

  if (!respuesta.ok) {
    throw new Error(`Error al consultar ${recurso}: ${respuesta.status}`);
  }

  const resultado: { success: boolean; data: T[] } =
    await respuesta.json();

  if (!resultado.success) {
    throw new Error(`No se pudieron obtener los datos de ${recurso}`);
  }

  return resultado.data;
}

export interface Noticia {
  id: number;
  titulo: string;
  slug: string;
  resumen: string | null;
  contenido: string | null;
  imagen_url: string | null;
  categoria: string | null;
  fecha_publicacion: string | null;
  destacada: boolean;
}

export interface Comunicado {
  id: number;
  titulo: string;
  resumen: string | null;
  contenido: string | null;
  archivo_url: string | null;
  fecha_publicacion: string | null;
}

export interface Evento {
  id: number;
  titulo: string;
  descripcion: string | null;
  fecha: string;
  hora: string | null;
  lugar: string | null;
  imagen_url: string | null;
}

export const getNoticias = () => consultarAPI<Noticia>("noticias");

export async function getNoticia(slug: string): Promise<Noticia> {
  if (!API_URL) {
    throw new Error("Falta configurar API_URL en .env.local");
  }

  const respuesta = await fetch(
    `${API_URL}/noticias/${encodeURIComponent(slug)}`,
    opcionesFetch()
  );

  if (!respuesta.ok) {
    throw new Error(`Error al consultar la noticia: ${respuesta.status}`);
  }

  const resultado: { success: boolean; noticia?: Noticia } =
    await respuesta.json();

  if (!resultado.success || !resultado.noticia) {
    throw new Error("No se pudo obtener la noticia");
  }

  return resultado.noticia;
}

export function formatearFecha(fecha: string | null): string {
  if (!fecha) return "Sin fecha";

  return new Date(fecha).toLocaleDateString("es-BO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/La_Paz",
  });
}

// Devuelve la fecha de hoy en Bolivia (UTC-4) con formato AAAA-MM-DD.
export function fechaHoyBolivia(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/La_Paz",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

// Formatea una fecha sin hora (AAAA-MM-DD) sin desplazarla de día.
export function formatearFechaSoloDia(fecha: string): string {
  const [anio, mes, dia] = fecha.slice(0, 10).split("-").map(Number);

  return new Date(Date.UTC(anio, mes - 1, dia)).toLocaleDateString("es-BO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export const getComunicados = () =>
  consultarAPI<Comunicado>("comunicados");

export async function getComunicado(
  id: number | string
): Promise<Comunicado> {
  if (!API_URL) {
    throw new Error("Falta configurar API_URL en .env.local");
  }

  const respuesta = await fetch(`${API_URL}/comunicados/${id}`, opcionesFetch());

  if (!respuesta.ok) {
    throw new Error(`Error al consultar el comunicado: ${respuesta.status}`);
  }

  const resultado: { success: boolean; comunicado: Comunicado } =
    await respuesta.json();

  if (!resultado.success) {
    throw new Error("No se pudo obtener el comunicado");
  }

  return resultado.comunicado;
}

export const getEventos = () => consultarAPI<Evento>("eventos");

