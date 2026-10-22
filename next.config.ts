import type { NextConfig } from "next";

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
};

export default nextConfig;
