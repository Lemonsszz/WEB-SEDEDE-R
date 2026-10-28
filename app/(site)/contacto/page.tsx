import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { sede, direccion } from "@/content/sedede";
import Banner from "@/components/ui/Banner";
import Kicker from "@/components/ui/Kicker";
import Boton from "@/components/ui/Boton";
import RedesSociales from "@/components/RedesSociales";
import { metadatos } from "@/lib/seo";

export const metadata = metadatos({
  titulo: "Contacto",
  descripcion:
    "Dirección, teléfono, WhatsApp, correo y horario de atención de SEDEDE Oruro, y sus redes sociales oficiales.",
  ruta: "/contacto",
});

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-hueso">
      <Banner
        kicker="Atención"
        titulo="Contacto"
        descripcion="Encuentra los medios oficiales de contacto de SEDEDE."
      />

      <section className="w-full py-space-xl">
        <div className="mx-auto flex max-w-contenido flex-col gap-space-lg px-margin">
          <div className="flex flex-col gap-space-xs">
            <Kicker tono="primario" className="font-bold">
              Ventanilla de atención
            </Kicker>
            <h2 className="font-display text-headline-xl font-extrabold tracking-tight text-tinta">
              ¿En qué podemos ayudarte?
            </h2>
            <p className="max-w-2xl text-body-md text-tinta-2">
              Atendemos consultas de atletas, asociaciones y ciudadanos sobre
              trámites, escenarios, programas de alto rendimiento y transparencia
              institucional.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-4">
            <article className="flex flex-col gap-space-sm rounded-2xl bg-white p-space-md shadow-tarjeta">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPin aria-hidden className="h-5 w-5" />
              </div>
              <h3 className="font-display text-headline-sm font-bold text-tinta">
                Dirección
              </h3>
              <p className="text-body-sm leading-relaxed text-tinta-2">
                {sede.direccion}
                <br />
                {sede.ciudad}
              </p>
            </article>

            <article className="flex flex-col gap-space-sm rounded-2xl bg-white p-space-md shadow-tarjeta">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Phone aria-hidden className="h-5 w-5" />
              </div>
              <h3 className="font-display text-headline-sm font-bold text-tinta">
                Teléfono
              </h3>
              <p className="text-body-sm leading-relaxed text-tinta-2">
                {sede.telefono}
              </p>
            </article>

            <article className="flex flex-col gap-space-sm rounded-2xl bg-white p-space-md shadow-tarjeta">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Mail aria-hidden className="h-5 w-5" />
              </div>
              <h3 className="font-display text-headline-sm font-bold text-tinta">
                Correo
              </h3>
              <p className="text-body-sm leading-relaxed text-tinta-2">
                {sede.email}
              </p>
            </article>

            <article className="flex flex-col gap-space-sm rounded-2xl bg-white p-space-md shadow-tarjeta">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Clock aria-hidden className="h-5 w-5" />
              </div>
              <h3 className="font-display text-headline-sm font-bold text-tinta">
                Horario
              </h3>
              <p className="text-body-sm leading-relaxed text-tinta-2">
                {sede.horario}
              </p>
            </article>
          </div>

          <div className="flex flex-col gap-space-sm rounded-2xl bg-white p-space-md shadow-tarjeta sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="font-display text-headline-sm font-bold text-tinta">
                Redes oficiales
              </h3>
              <p className="text-body-sm leading-relaxed text-tinta-2">
                Seguinos para enterarte de convocatorias, resultados y
                actividades del deporte orureño.
              </p>
            </div>
            <RedesSociales className="shrink-0" />
          </div>

          <article className="flex flex-col gap-space-md overflow-hidden rounded-2xl bg-white shadow-tarjeta">
            <div className="flex flex-col gap-space-xs p-space-md pb-0">
              <div className="flex items-center gap-space-xs">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin aria-hidden className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-display text-headline-sm font-bold text-tinta">
                    Ubicación
                  </h3>
                  <p className="text-body-sm text-tinta-2">
                    {sede.direccion}, {sede.ciudad}
                  </p>
                </div>
              </div>
              <p className="text-body-sm text-tinta-3">
                Coordenadas: -17.943964, -67.112306
              </p>
            </div>
            <div className="relative h-[280px] w-full sm:h-[380px] lg:h-[450px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1300.3768471819956!2d-67.11238473522911!3d-17.94392920586413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sbo!4v1793151274084!5m2!1ses-419!2sbo"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Ubicación de las oficinas del SEDEDE Oruro"
              />
            </div>
          </article>

          <div className="flex flex-col items-start justify-between gap-space-md rounded-3xl bg-primary p-space-lg text-white lg:flex-row lg:items-center">
            <div className="flex max-w-xl flex-col gap-2">
              <Kicker tono="dorado">Registro único del deportista</Kicker>
              <h3 className="font-display text-headline-lg font-black tracking-tight text-white">
                ¿Eres deportista federado de Oruro?
              </h3>
              <p className="text-body-md text-white/90">
                El programa RUDA coordina cobertura biomédica, nutrición y pasajes
                competitivos para atletas del departamento.
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-space-sm">
              <Boton href="/deportistas" variante="claro">
                Ver deportistas
              </Boton>
              <Boton href="/sedede" variante="velo">
                Conocer SEDEDE
              </Boton>
            </div>
          </div>

          <p className="text-body-sm text-tinta-3">
            {direccion.entidad} · Los datos de contacto son provisorios y se
            actualizarán con la información oficial.
          </p>
        </div>
      </section>
    </div>
  );
}
