import type { NextConfig } from "next";

/**
 * Slugs de asociaciones que existieron hasta la fase 15 y se reemplazaron por
 * la lista real que entregó la institución el 2026-10-26 (ver
 * `content/asociaciones.ts`). Esas URLs se publicaron en el sitemap, así que se
 * redirigen al directorio en vez de devolver 404.
 */
const asociacionesRetiradas = [
  "futbol",
  "basquetbol",
  "voleibol",
  "boxeo",
  "natacion",
  "atletismo",
  "lucha",
  "judo",
  "halterofilia",
  "ajedrez",
  "bolos",
  "microfutbol",
  "gimnasia",
];

const nextConfig: NextConfig = {
  // Genera `.next/standalone` con el servidor de producción y solo las
  // dependencias necesarias. Se usa para desplegar en un VPS/Docker; en Vercel
  // o Netlify es inofensivo (cada plataforma gestiona su propio build).
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  async redirects() {
    return asociacionesRetiradas.map((slug) => ({
      source: `/asociaciones/${slug}`,
      destination: "/asociaciones",
      permanent: true,
    }));
  },
};

export default nextConfig;
