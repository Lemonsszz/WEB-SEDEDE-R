/**
 * Promociones temporales de la portada.
 *
 * Se muestran en una franja angosta debajo de las noticias, con el flyer como
 * miniatura: la imagen grande solo se abre al hacer clic, así la portada no
 * carga un afiche de varios cientos de KB.
 *
 * Cada promoción tiene una ventana de vigencia en hora de Bolivia (UTC-4) y
 * desaparece sola al terminar; no hace falta borrar nada a mano. Para activar
 * otra, agregar un objeto nuevo (o cambiar estos datos) y hacer commit.
 */
export type Promocion = {
  id: string;
  /** Texto de una línea que se ve en la franja. */
  titulo: string;
  /** Flyer cuadrado o apaisado. Debe vivir en `public/`. */
  imagen: string;
  /** Descripción de la imagen para lectores de pantalla. */
  alt: string;
  /** Ruta interna (ej. `/noticias/...`) o URL externa del afiche. */
  enlace: string;
  /** `true` si `enlace` sale del sitio (abre en otra pestaña). */
  externo?: boolean;
  /** Inicio de la vigencia, con offset de Bolivia. */
  inicio: string;
  /** Fin de la vigencia; después de esta hora la franja deja de mostrarse. */
  fin: string;
};

export const promociones: Promocion[] = [
  {
    id: "carrera-2026-11-07",
    titulo: "Media Maratón Internacional Oruro - 21k",
    imagen: "/img/flyer.jpeg",
    alt: "Afiche de la carrera deportiva organizada en Oruro",
    enlace: "/img/flyer.jpeg",
    externo: true,
    inicio: "2026-10-26T00:00:00-04:00",
    fin: "2026-11-07T23:59:59-04:00",
  },
];

/** Primera promoción vigente, o `null` si no hay ninguna. */
export function getPromocionActiva(ahora: number = Date.now()): Promocion | null {
  return (
    promociones.find((promocion) => {
      const desde = new Date(promocion.inicio).getTime();
      const hasta = new Date(promocion.fin).getTime();
      return ahora >= desde && ahora <= hasta;
    }) ?? null
  );
}

/** Fecha de cierre en texto: "7 de noviembre". */
export function fechaFinLegible(promocion: Promocion): string {
  return new Intl.DateTimeFormat("es-BO", {
    day: "numeric",
    month: "long",
    timeZone: "America/La_Paz",
  }).format(new Date(promocion.fin));
}
