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

/**
 * Slugs de deportistas ficticios que se retiraron de la web el 2026-10-28
 * (ver `content/deportistas.ts`). Se publicaron en el sitemap, así que se
 * redirigen al listado en vez de devolver 404. `/deportistas/hector-garibay`
 * no está en esta lista: su ficha es real y sigue activa.
 */
const deportistasRetirados = [
  "maria-lopez",
  "carlos-mendoza",
  "diego-fernandez",
  "jeremy-carlos",
  "ana-quispe",
  "luis-choque",
  "valeria-ramirez",
  "pedro-condori",
  "gabriela-mamani",
  "rodrigo-vargas",
  "camila-rojas",
  "sebastian-flores",
  "axel-colque",
];

const nextConfig: NextConfig = {
  // Genera `.next/standalone` con el servidor de producción y solo las
  // dependencias necesarias. Se usa para desplegar en un VPS/Docker; en Vercel
  // o Netlify es inofensivo (cada plataforma gestiona su propio build).
  output: "standalone",
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  async redirects() {
    const asociaciones = asociacionesRetiradas.map((slug) => ({
      source: `/asociaciones/${slug}`,
      destination: "/asociaciones",
      permanent: true,
    }));

    const deportistas = deportistasRetirados.map((slug) => ({
      source: `/deportistas/${slug}`,
      destination: "/deportistas",
      permanent: true,
    }));

    return [...asociaciones, ...deportistas];
  },
};

export default nextConfig;
