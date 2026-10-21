import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { institucion, sede } from "@/content/sedede";

const navegacion = [
  { href: "/sedede", texto: "Misión y organización" },
  { href: "/asociaciones", texto: "Directorio de asociaciones" },
  { href: "/deportistas", texto: "Programa atletas de élite" },
  { href: "/eventos", texto: "Calendario de competencias" },
  { href: "/documentos", texto: "Normativas y reglamentos" },
  { href: "/contacto", texto: "Contacto institucional" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-noche-4 pt-space-lg pb-space-md text-white/60">
      <div className="mx-auto max-w-contenido px-margin">
        <div className="grid grid-cols-1 gap-gutter-lg md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-space-sm">
            <div className="flex items-center gap-space-sm">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
                <span className="font-display text-headline-sm font-black text-white">
                  S
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-label-md font-extrabold uppercase text-white">
                  {institucion.nombre}
                </span>
                <span className="font-display text-foot-xs uppercase text-white/50">
                  {institucion.entidad}
                </span>
              </div>
            </div>

            <p className="max-w-sm text-body-sm leading-relaxed text-white/55">
              {institucion.descripcion}
            </p>
          </div>

          <div className="flex flex-col gap-space-sm">
            <span className="font-display text-foot-xs font-bold uppercase text-white">
              Navegación institucional
            </span>
            <nav className="flex flex-col gap-1.5">
              {navegacion.map((enlace) => (
                <Link
                  key={enlace.href}
                  href={enlace.href}
                  className="text-body-sm text-white/55 transition-colors hover:text-white"
                >
                  {enlace.texto}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-space-sm">
            <span className="font-display text-foot-xs font-bold uppercase text-white">
              Sede central
            </span>
            <div className="flex flex-col gap-1.5 text-body-sm text-white/55">
              <div className="flex items-start gap-space-xs">
                <MapPin
                  aria-hidden
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/50"
                />
                <span>{sede.direccion}</span>
              </div>
              <div className="flex items-center gap-space-xs">
                <Phone aria-hidden className="h-3.5 w-3.5 shrink-0 text-white/50" />
                <a href={`tel:${sede.telefono.replace(/\s/g, "")}`} className="transition-colors hover:text-white">
                  {sede.telefono}
                </a>
              </div>
              <div className="flex items-center gap-space-xs">
                <Clock aria-hidden className="h-3.5 w-3.5 shrink-0 text-white/50" />
                <span>{sede.horario}</span>
              </div>
              <div className="flex items-center gap-space-xs">
                <Mail aria-hidden className="h-3.5 w-3.5 shrink-0 text-white/50" />
                <a href={`mailto:${sede.email}`} className="transition-colors hover:text-white">
                  {sede.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-space-md border-t border-white/10 pt-space-sm">
          <p className="text-foot-sm text-white/45">
            © {new Date().getFullYear()} {institucion.nombre} —{" "}
            {institucion.nombreCompleto}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
