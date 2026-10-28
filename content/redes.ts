/**
 * Redes sociales oficiales de SEDEDE.
 *
 * Van en un archivo aparte (y no en `content/sedede.ts`) porque ese archivo lo
 * edita el usuario: así los enlaces se cambian en un solo lugar sin tocar el
 * contenido institucional.
 *
 * Nota: las URL se guardan limpias, sin los parámetros de seguimiento que
 * agregan las apps móviles al compartir (`mibextid`, `_r`, `_t`, etc.).
 */
export type RedSocial = {
  nombre: string;
  url: string;
  icono: "facebook" | "tiktok" | "whatsapp";
};

/** Número de WhatsApp en formato local (Bolivia: 591 + 8 dígitos). */
export const whatsapp = {
  numero: "70413403",
  /** Solo dígitos, con código de país, para el enlace `wa.me`. */
  url: "https://wa.me/59170413403",
} as const;

export const redes: RedSocial[] = [
  {
    nombre: "Facebook",
    url: "https://www.facebook.com/profile.php?id=61590489140627",
    icono: "facebook",
  },
  {
    nombre: "TikTok",
    url: "https://www.tiktok.com/@sededeoruro2026",
    icono: "tiktok",
  },
  {
    nombre: "WhatsApp",
    url: whatsapp.url,
    icono: "whatsapp",
  },
];
