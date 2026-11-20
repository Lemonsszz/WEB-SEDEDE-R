"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import Kicker from "@/components/ui/Kicker";

/** Video institucional definitivo (45 s, 1080p, H.264/AAC, ~20 MB). */
const VIDEO_SRC = "/elementos_nuevos/video-presentacion.mp4";
/** Foto ya existente en el repo: evita generar y subir una miniatura nueva. */
const POSTER = "/img/home-definitive.jpg";

export default function VideoInstitucional() {
  const [abierto, setAbierto] = useState(false);
  const disparadorRef = useRef<HTMLElement | null>(null);
  const cerrarRef = useRef<HTMLButtonElement>(null);

  function abrir(evento: MouseEvent<HTMLButtonElement>) {
    disparadorRef.current = evento.currentTarget;
    setAbierto(true);
  }

  const cerrar = useCallback(() => {
    setAbierto(false);
    disparadorRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!abierto) return;

    const alTeclear = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") cerrar();
    };
    const desbordamientoOriginal = document.body.style.overflow;
    document.addEventListener("keydown", alTeclear);
    document.body.style.overflow = "hidden";
    cerrarRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", alTeclear);
      document.body.style.overflow = desbordamientoOriginal;
    };
  }, [abierto, cerrar]);

  return (
    <section
      aria-labelledby="video-institucional-titulo"
      className="w-full bg-hueso-2 py-space-lg"
    >
      <div className="mx-auto max-w-contenido px-margin">
        <div className="flex flex-col gap-space-md rounded-3xl bg-white p-space-md shadow-tarjeta md:flex-row md:items-center md:gap-space-lg md:p-space-lg">
          <button
            type="button"
            onClick={abrir}
            aria-haspopup="dialog"
            aria-label="Reproducir video institucional del SEDEDE"
            className="group relative aspect-video w-full shrink-0 overflow-hidden rounded-2xl bg-noche focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:w-[46%]"
          >
            <Image
              src={POSTER}
              alt="Miniatura del video institucional del SEDEDE"
              fill
              sizes="(max-width: 768px) 100vw, 46vw"
              quality={70}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-noche/75 via-noche/10 to-transparent" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-boton-fuerte transition-transform duration-300 group-hover:scale-110 sm:h-16 sm:w-16">
                <Play
                  aria-hidden
                  className="ml-1 h-6 w-6 sm:h-7 sm:w-7"
                  fill="currentColor"
                />
              </span>
            </span>
            <span className="absolute bottom-space-sm right-space-sm rounded-full bg-black/60 px-space-sm py-1 font-display text-label-sm text-white backdrop-blur-sm">
              0:45
            </span>
          </button>

          <div className="flex flex-col gap-space-xs md:py-space-sm">
            <Kicker tono="primario" className="font-bold">
              Video institucional
            </Kicker>
            <h2
              id="video-institucional-titulo"
              className="font-display text-headline-lg font-black tracking-tight text-tinta"
            >
              El SEDEDE en 45 segundos
            </h2>
            <p className="max-w-xl text-body-md leading-relaxed text-tinta-2">
              Un recorrido breve por nuestra labor y el apoyo al deporte
              orureño. Dale play para conocer cómo trabajamos desde dentro.
            </p>
            <button
              type="button"
              onClick={abrir}
              aria-haspopup="dialog"
              className="mt-space-xs inline-flex w-fit items-center gap-2 font-display text-label-md font-semibold text-primary transition-colors hover:text-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Ver video
              <Play aria-hidden className="h-4 w-4" fill="currentColor" />
            </button>
          </div>
        </div>
      </div>

      {abierto ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-noche-4/90 p-margin backdrop-blur-sm"
          onClick={(evento) => {
            if (evento.target === evento.currentTarget) cerrar();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-modal-titulo"
            className="relative w-full max-w-5xl"
          >
            <h2 id="video-modal-titulo" className="sr-only">
              Video institucional del SEDEDE
            </h2>

            <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-flotante ring-1 ring-white/10">
              <video
                src={VIDEO_SRC}
                poster={POSTER}
                controls
                autoPlay
                playsInline
                preload="none"
                className="h-full w-full object-contain"
              >
                Tu navegador no soporta video HTML5.{" "}
                <a
                  href={VIDEO_SRC}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Ver el video
                </a>
              </video>
            </div>

            <button
              ref={cerrarRef}
              type="button"
              onClick={cerrar}
              aria-label="Cerrar video"
              className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-tinta shadow-flotante transition-colors hover:bg-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:-right-4 sm:-top-4"
            >
              <X aria-hidden className="h-5 w-5" />
            </button>

            <p className="mt-space-sm text-center text-foot-sm text-white/50">
              Presiona Esc para cerrar
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
