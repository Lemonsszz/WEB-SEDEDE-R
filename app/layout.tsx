import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import { IMAGEN_SOCIAL, NOMBRE_SITIO, SITIO_URL } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const DESCRIPCION_SITIO =
  "Sitio oficial del Servicio Departamental de Deportes de Oruro: noticias, comunicados, agenda de eventos, asociaciones deportivas y deportistas de élite del departamento.";

/**
 * Verificación de los buscadores. Los códigos se cargan por variable de
 * entorno para no hardcodearlos: el día que se valide Search Console / Bing se
 * agregan en Vercel y se redespliega (las variables se incrustan en el build).
 */
const verificacion: Metadata["verification"] = {
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : {}),
  ...(process.env.BING_SITE_VERIFICATION
    ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } }
    : {}),
};

export const metadata: Metadata = {
  metadataBase: new URL(SITIO_URL),
  title: {
    default: "SEDEDE Oruro — Servicio Departamental de Deportes",
    template: `%s | ${NOMBRE_SITIO}`,
  },
  description: DESCRIPCION_SITIO,
  applicationName: NOMBRE_SITIO,
  keywords: [
    "SEDEDE",
    "SEDEDE Oruro",
    "deportes Oruro",
    "Servicio Departamental de Deportes",
    "Gobierno Autónomo Departamental de Oruro",
    "asociaciones deportivas Oruro",
    "noticias deportivas Oruro",
    "eventos deportivos Oruro",
    "deportistas de élite Oruro",
  ],
  authors: [
    { name: "Servicio Departamental de Deportes Oruro", url: SITIO_URL },
  ],
  creator: "Servicio Departamental de Deportes Oruro",
  publisher: "Servicio Departamental de Deportes Oruro",
  category: "deportes",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_BO",
    siteName: NOMBRE_SITIO,
    url: SITIO_URL,
    title: "SEDEDE Oruro — Servicio Departamental de Deportes",
    description: DESCRIPCION_SITIO,
    images: [
      {
        url: `${SITIO_URL}${IMAGEN_SOCIAL}`,
        width: 512,
        height: 512,
        alt: "Escudo del Servicio Departamental de Deportes de Oruro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEDEDE Oruro — Servicio Departamental de Deportes",
    description: DESCRIPCION_SITIO,
    images: [`${SITIO_URL}${IMAGEN_SOCIAL}`],
  },
  ...(verificacion ? { verification: verificacion } : {}),
  formatDetection: { telephone: true, address: true, email: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
