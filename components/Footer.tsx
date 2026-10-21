import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { institucion, sede } from "@/content/sedede";

const navegacion = [
  { href: "/sedede", texto: "Misión y organización" },
  { href: "/asociaciones", texto: "Directorio de asociaciones" },
  { href: "/deportistas", texto: "Programa atletas de élite" },
  { href: "/eventos", texto: "Calendario de competencias" },
  { href: "/documentos", texto: "Normativas y reglamentos" },
];

const prensa = [
  { href: "/noticias", texto: "Actualidad deportiva" },
  { href: "/comunicados", texto: "Resoluciones oficiales" },
  { href: "/documentos", texto: "Convocatorias y becas" },
  { href: "/contacto", texto: "Acreditaciones de prensa" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-noche-4 pt-space-xl pb-space-lg text-white/60">
      <div className="mx-auto max-w-contenido px-margin">
        <div className="grid grid-cols-1 gap-gutter-lg md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-space-md">
            <div className="flex items-center gap-space-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <span className="font-display text-headline-md font-black text-white">
                  S
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-headline-sm font-extrabold uppercase text-white">
                  {institucion.nombre}
                </span>
                <span className="font-display text-label-sm uppercase text-white/60">
                  {institucion.entidad}
                </span>
              </div>
            </div>

            <p className="font-body-sm leading-relaxed text-white/60">
              {institucion.descripcion}
            </p>
          </div>

          <div className="flex flex-col gap-space-sm">
            <span className="font-display text-label-md font-bold uppercase tracking-wider text-white">
              Navegación institucional
            </span>
            <nav className="flex flex-col gap-space-xs">
              {navegacion.map((enlace) => (
                <Link
                  key={enlace.href}
                  href={enlace.href}
                  className="font-body-sm text-white/60 transition-colors hover:text-white"
                >
                  {enlace.texto}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-space-sm">
            <span className="font-display text-label-md font-bold uppercase tracking-wider text-white">
              Prensa y comunicación
            </span>
            <nav className="flex flex-col gap-space-xs">
              {prensa.map((enlace) => (
                <Link
                  key={enlace.href}
                  href={enlace.href}
                  className="font-body-sm text-white/60 transition-colors hover:text-white"
                >
                  {enlace.texto}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-space-sm">
            <span className="font-display text-label-md font-bold uppercase tracking-wider text-white">
              Sede central
            </span>
            <div className="flex flex-col gap-space-xs font-body-sm text-white/60">
              <div className="flex items-start gap-space-xs">
                <MapPin
                  aria-hidden
                  className="mt-0.5 h-4 w-4 shrink-0 text-white/60"
                />
                <span>{sede.direccion}</span>
              </div>
              <div className="flex items-center gap-space-xs">
                <Phone aria-hidden className="h-4 w-4 shrink-0 text-white/60" />
                <a href={`tel:${sede.telefono.replace(/\s/g, "")}`} className="transition-colors hover:text-white">
                  {sede.telefono}
                </a>
              </div>
              <div className="flex items-center gap-space-xs">
                <Clock aria-hidden className="h-4 w-4 shrink-0 text-white/60" />
                <span>{sede.horario}</span>
              </div>
              <div className="flex items-center gap-space-xs">
                <Mail aria-hidden className="h-4 w-4 shrink-0 text-white/60" />
                <a href={`mailto:${sede.email}`} className="transition-colors hover:text-white">
                  {sede.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-space-sm border-t border-white/10 pt-space-md font-body-sm text-white/60 md:flex-row">
          <p>
            © {new Date().getFullYear()} {institucion.nombre} —{" "}
            {institucion.nombreCompleto}. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-space-md">
            <Link href="/documentos" className="transition-colors hover:text-white">
              Términos de uso
            </Link>
            <Link href="/documentos" className="transition-colors hover:text-white">
              Transparencia institucional
            </Link>
            <Link href="/contacto" className="transition-colors hover:text-white">
              Contacto directo
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
