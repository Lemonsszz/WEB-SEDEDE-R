const API_URL =
  typeof window === "undefined"
    ? process.env.API_URL
    : process.env.NEXT_PUBLIC_API_URL;

async function consultarAPI<T>(recurso: string): Promise<T[]> {
  if (!API_URL) {
    throw new Error("Falta configurar API_URL en .env.local");
  }

  const respuesta = await fetch(`${API_URL}/${recurso}`, {
    cache: "no-store",
  });

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

export const getComunicados = () =>
  consultarAPI<Comunicado>("comunicados");

export async function getComunicado(
  id: number | string
): Promise<Comunicado> {
  if (!API_URL) {
    throw new Error("Falta configurar API_URL en .env.local");
  }

  const respuesta = await fetch(`${API_URL}/comunicados/${id}`, {
    cache: "no-store",
  });

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

