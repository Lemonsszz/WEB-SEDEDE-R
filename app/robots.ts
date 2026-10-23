import type { MetadataRoute } from "next";
import { SITIO_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // El panel y el login no aportan nada a los buscadores y no deben
        // aparecer en resultados.
        disallow: ["/admin", "/admin/", "/login"],
      },
    ],
    sitemap: `${SITIO_URL}/sitemap.xml`,
    host: SITIO_URL,
  };
}
