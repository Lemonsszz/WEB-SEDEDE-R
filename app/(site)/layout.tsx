import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevelarGlobal from "@/components/ui/RevelarGlobal";
import ScrollAlTope from "@/components/ui/ScrollAlTope";
import { institucion, sede } from "@/content/sedede";
import { redes, whatsapp } from "@/content/redes";
import { IMAGEN_SOCIAL, NOMBRE_SITIO, SITIO_URL } from "@/lib/seo";

/**
 * Datos estructurados de la institución (schema.org).
 *
 * Le dicen a Google qué es el sitio, quién lo publica y cuáles son sus redes,
 * para que el resultado de búsqueda muestre el nombre, el logo y los enlaces
 * oficiales (panel de conocimiento / "sitelinks").
 */
const datosInstitucion = {
  "@context": "https://schema.org",
  "@type": "GovernmentOrganization",
  "@id": `${SITIO_URL}/#organizacion`,
  name: institucion.nombreCompleto,
  legalName: `${institucion.nombreCompleto} — ${institucion.entidad}`,
  alternateName: [institucion.nombre, NOMBRE_SITIO],
  url: SITIO_URL,
  logo: `${SITIO_URL}${IMAGEN_SOCIAL}`,
  image: `${SITIO_URL}${IMAGEN_SOCIAL}`,
  description: institucion.descripcion,
  email: sede.email,
  telephone: `+591 ${whatsapp.numero}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: sede.direccion,
    addressLocality: "Oruro",
    addressRegion: "Oruro",
    addressCountry: "BO",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Departamento de Oruro",
  },
  sameAs: redes.map((red) => red.url),
};

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        // El contenido es constante y se genera en el servidor, no hay riesgo de
        // inyección (no incluye datos del usuario). Se escapa `<` igualmente.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(datosInstitucion).replace(/</g, "\\u003c"),
        }}
      />
      <RevelarGlobal />
      <ScrollAlTope />
      <Header />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </>
  );
}
