import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { sede, direccion } from "@/content/sedede";
import Banner from "@/components/ui/Banner";
import Kicker from "@/components/ui/Kicker";
import Boton from "@/components/ui/Boton";

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
