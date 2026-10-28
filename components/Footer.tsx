import Link from "next/link";
import Image from "next/image";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { institucion, sede } from "@/content/sedede";
import RedesSociales from "@/components/RedesSociales";

const navegacion = [
  { href: "/sedede", texto: "Misión y organización" },
  { href: "/asociaciones", texto: "Directorio de asociaciones" },
  { href: "/deportistas", texto: "Atletas de élite" },
  { href: "/eventos", texto: "Calendario de Eventos y Competencias" },
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
              <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-hueso ring-1 ring-white/20">
                <Image
                  src="/img/logo-oficial.png"
                  alt="Escudo del Servicio Departamental de Deportes Oruro"
                  width={40}
                  height={40}
                  className="h-full w-full object-contain"
                />
              </span>
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

            <div className="mt-space-xs flex flex-col gap-2 border-t border-white/10 pt-space-sm">
              <span className="font-display text-foot-xs font-bold uppercase tracking-wider text-white/70">
                Redes oficiales
              </span>
              <RedesSociales />
            </div>
          </div>
        </div>

        <div className="mt-space-md flex flex-col items-center justify-between gap-space-xs border-t border-white/10 pt-space-sm md:flex-row">
          <div className="flex flex-col items-center gap-1 md:items-start">
            <p className="text-center text-foot-sm text-white/45 md:text-left">
              © {new Date().getFullYear()} {institucion.nombre} —{" "}
              {institucion.nombreCompleto}. Todos los derechos reservados.
            </p>
            <p className="text-foot-sm text-white/45">
              Desarrollado por{" "}
              <span className="font-display font-semibold text-white/70">
                IT Services
              </span>
            </p>
          </div>
          <nav className="flex flex-wrap items-center gap-space-xs text-foot-sm text-white/45 md:gap-space-sm">
            {/* <Link href="/terminos-de-uso" className="transition-colors hover:text-white">
              Términos de uso
            </Link> */}
            <span className="hidden text-white/25 md:inline"></span>
            {/* <Link href="/transparencia-institucional" className="transition-colors hover:text-white">
              Transparencia institucional
            </Link>
            <span className="hidden text-white/25 md:inline">|</span> */}
            <Link href="/contacto" className="transition-colors hover:text-white">
              Contacto directo
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
