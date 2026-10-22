/**
 * Utilidades de imagen para el panel administrativo (se ejecutan en el
 * navegador: necesitan `document`, por eso viven fuera de `lib/api.ts`).
 */

/** Lado mayor al que se reduce la foto antes de subirla. */
const LADO_MAXIMO = 1920;

/** A partir de este peso (bytes) se recomprime aunque no haga falta reducir. */
const PESO_OBJETIVO = 1_500_000;

/** Formatos que el canvas puede decodificar y recomprimir sin perder sentido. */
const FORMATOS_RECOMPRIMIBLES = /^image\/(jpeg|png|webp)$/;

export type ImagenPreparada = {
  archivo: File;
  /** `true` si se redimensionó o recomprimió antes de subir. */
  optimizada: boolean;
  pesoOriginal: number;
  pesoFinal: number;
};

/**
 * Reduce el peso de una foto en el navegador antes de mandarla al servidor.
 *
 * Las fotos de celular pesan 3–12 MB y para una tarjeta de noticia no hace
 * falta esa resolución. Comprimir acá evita tres problemas a la vez:
 *   - el límite de subida de PHP en el servidor,
 *   - el límite de 10 MB de Cloudinary,
 *   - el tiempo de carga de la portada.
 *
 * Si el navegador no puede decodificar el archivo (por ejemplo HEIC en un
 * navegador de escritorio) se devuelve el original sin tocar y decide el
 * servidor.
 */
export async function prepararImagen(
  archivo: File,
  ladoMaximo = LADO_MAXIMO
): Promise<ImagenPreparada> {
  const pesoOriginal = archivo.size;
  const sinCambios: ImagenPreparada = {
    archivo,
    optimizada: false,
    pesoOriginal,
    pesoFinal: pesoOriginal,
  };

  if (!FORMATOS_RECOMPRIMIBLES.test(archivo.type)) return sinCambios;

  try {
    const imagen = await cargarImagen(archivo);

    const escala = Math.min(
      1,
      ladoMaximo / Math.max(imagen.naturalWidth, imagen.naturalHeight)
    );
    const ancho = Math.max(1, Math.round(imagen.naturalWidth * escala));
    const alto = Math.max(1, Math.round(imagen.naturalHeight * escala));

    const lienzo = document.createElement("canvas");
    lienzo.width = ancho;
    lienzo.height = alto;

    const contexto = lienzo.getContext("2d");
    if (!contexto) return sinCambios;

    // Fondo blanco: al pasar a JPEG los PNG transparentes quedarían en negro.
    contexto.fillStyle = "#ffffff";
    contexto.fillRect(0, 0, ancho, alto);
    contexto.drawImage(imagen, 0, 0, ancho, alto);

    const calidad = escala < 1 || pesoOriginal > PESO_OBJETIVO ? 0.82 : 0.9;
    const recomprimido = await new Promise<Blob | null>((resolver) => {
      lienzo.toBlob(resolver, "image/jpeg", calidad);
    });

    // Si no se redujo y el resultado pesa igual o más, se sube el original.
    if (!recomprimido) return sinCambios;
    if (escala === 1 && recomprimido.size >= pesoOriginal) return sinCambios;

    const nombre = archivo.name.replace(/\.[^.]+$/, "") || "foto";

    return {
      archivo: new File([recomprimido], `${nombre}.jpg`, {
        type: "image/jpeg",
      }),
      optimizada: true,
      pesoOriginal,
      pesoFinal: recomprimido.size,
    };
  } catch {
    // Formato que el navegador no sabe leer: se manda el original.
    return sinCambios;
  }
}

/** Peso legible para los mensajes del panel. */
export function formatearPeso(bytes: number): string {
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`;
  return `${Math.round(bytes / 1000)} KB`;
}

/**
 * Carga el archivo en un `<img>` (no en `createImageBitmap`) porque el
 * elemento aplica la orientación EXIF: las fotos verticales de celular no
 * salen acostadas.
 */
function cargarImagen(archivo: File): Promise<HTMLImageElement> {
  return new Promise((resolver, rechazar) => {
    const url = URL.createObjectURL(archivo);
    const imagen = new Image();

    imagen.onload = () => {
      URL.revokeObjectURL(url);
      resolver(imagen);
    };

    imagen.onerror = () => {
      URL.revokeObjectURL(url);
      rechazar(new Error("El navegador no pudo leer la imagen"));
    };

    imagen.src = url;
  });
}
