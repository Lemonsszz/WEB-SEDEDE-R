import { CalendarDays, Clock, MapPin, ImageIcon } from "lucide-react";
import {
  fechaHoyBolivia,
  getEventos,
  type Evento,
} from "@/lib/api";
import Kicker from "@/components/ui/Kicker";

function obtenerFecha(fecha: string) {
  const [anio, mes, dia] = fecha.slice(0, 10).split("-").map(Number);

  return new Date(Date.UTC(anio, mes - 1, dia));
}

function formatearDia(fecha: string) {
  return String(obtenerFecha(fecha).getUTCDate()).padStart(2, "0");
}

function formatearMes(fecha: string) {
  return obtenerFecha(fecha)
    .toLocaleDateString("es-BO", {
      month: "short",
      timeZone: "UTC",
    })
    .replace(".", "")
    .toUpperCase();
}

function formatearFechaCompleta(fecha: string) {
  return obtenerFecha(fecha).toLocaleDateString("es-BO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function TarjetaEvento({
  evento,
  realizado,
}: {
  evento: Evento;
  realizado?: boolean;
}) {
  return (
    <article className="group flex flex-col gap-space-md rounded-2xl bg-white p-space-md shadow-tarjeta transition-all duration-300 hover:shadow-tarjeta-hover md:flex-row md:items-center">
      <div
        className={`flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl text-white ${
          realizado ? "bg-tinta-3" : "bg-primary"
        }`}
      >
        <span className="font-display text-headline-md font-black leading-none">
          {formatearDia(evento.fecha)}
        </span>
        <span className="mt-1 font-display text-label-sm font-bold">
          {formatearMes(evento.fecha)}
        </span>
      </div>

      <div className="flex-1">
        <p
          className={`font-display text-label-sm font-bold uppercase tracking-wider ${
            realizado ? "text-tinta-3" : "text-primary"
          }`}
        >
          {realizado ? "Evento realizado" : "Evento deportivo"}
        </p>

        <h3 className="mt-1 font-display text-headline-md font-extrabold leading-snug tracking-tight text-tinta">
          {evento.titulo}
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 font-body-sm text-tinta-2">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays aria-hidden className="h-4 w-4 text-tinta-3" />
            {formatearFechaCompleta(evento.fecha)}
          </span>

          {evento.hora ? (
            <span className="inline-flex items-center gap-1.5">
              <Clock aria-hidden className="h-4 w-4 text-tinta-3" />
              {evento.hora.slice(0, 5)}
            </span>
          ) : null}

          {evento.lugar ? (
            <span className="inline-flex items-center gap-1.5">
              <MapPin aria-hidden className="h-4 w-4 text-tinta-3" />
              {evento.lugar}
            </span>
          ) : null}
        </div>

        {evento.descripcion ? (
          <p className="mt-3 font-body-sm leading-relaxed text-tinta-2">
            {evento.descripcion}
          </p>
        ) : null}
      </div>

      {evento.imagen_url ? (
        <a
          href={evento.imagen_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 font-display text-label-sm font-semibold text-tinta transition-colors hover:text-primary"
        >
          <ImageIcon aria-hidden className="h-4 w-4" />
          Ver imagen
        </a>
      ) : null}
    </article>
  );
}

export default async function Eventos() {
  let eventos: Evento[] = [];

  try {
    eventos = await getEventos();
  } catch (error) {
    console.error("Error al cargar eventos:", error);
  }

  const hoy = fechaHoyBolivia();

  const proximos = eventos
    .filter((evento) => evento.fecha.slice(0, 10) >= hoy)
    .sort((a, b) => a.fecha.localeCompare(b.fecha));

  const realizados = eventos
    .filter((evento) => evento.fecha.slice(0, 10) < hoy)
    .sort((a, b) => b.fecha.localeCompare(a.fecha));

  return (
    <section className="w-full bg-surface py-space-xl">
      <div className="mx-auto flex max-w-contenido flex-col gap-space-xl px-margin">
        <div className="flex flex-col gap-space-xs">
          <Kicker tono="primario" className="font-bold">
            Agenda deportiva
          </Kicker>
          <h2 className="font-display text-headline-xl font-extrabold tracking-tight text-tinta">
            Próximos eventos
          </h2>
        </div>

        {proximos.length === 0 ? (
          <p className="rounded-2xl border border-hueso-5 bg-white p-space-lg text-center font-body-md text-tinta-2">
            No hay próximos eventos publicados por el momento.
          </p>
        ) : (
          <div className="flex flex-col gap-gutter">
            {proximos.map((evento) => (
              <TarjetaEvento key={evento.id} evento={evento} />
            ))}
          </div>
        )}

        <div className="flex flex-col gap-space-xs pt-space-sm">
          <Kicker tono="tinta">Nuestra historia</Kicker>
          <h2 className="font-display text-headline-xl font-extrabold tracking-tight text-tinta">
            Eventos realizados
          </h2>
        </div>

        {realizados.length === 0 ? (
          <p className="rounded-2xl border border-hueso-5 bg-white p-space-lg text-center font-body-md text-tinta-2">
            Todavía no hay eventos realizados registrados.
          </p>
        ) : (
          <div className="flex flex-col gap-gutter">
            {realizados.map((evento) => (
              <TarjetaEvento key={evento.id} evento={evento} realizado />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
