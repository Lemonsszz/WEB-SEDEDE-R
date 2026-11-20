"use client";

import { useRef, useState } from "react";
import { Headphones, Pause, Play, Volume2, VolumeX } from "lucide-react";
import Kicker from "@/components/ui/Kicker";

/**
 * CONTENIDO TEMPORAL (2026-11-20): audio institucional entregado por la
 * institución. Para retirarlo en el futuro hay que borrar este archivo y las
 * dos líneas (import + render) que lo usan en
 * `app/(site)/sedede/page.tsx`. El archivo de audio vive en
 * `public/elementos_nuevos/`.
 *
 * El reproductor es propio en vez del `<audio controls>` del navegador para
 * usar los tokens de la web (carmesí, dorado, sombras y tipografía). El audio
 * NO se descarga al entrar a la página: `preload="metadata"` solo pide los
 * datos necesarios para mostrar la duración (~24 min, 17 MB el archivo).
 */
const AUDIO_SRC = "/elementos_nuevos/como-funciona-el-sedede-en-oruro.m4a";

/** Segundos → "24:12" (o "1:02:03" si alguna vez supera la hora). */
function formatearTiempo(segundos: number): string {
  if (!Number.isFinite(segundos) || segundos < 0) return "--:--";
  const total = Math.floor(segundos);
  const horas = Math.floor(total / 3600);
  const minutos = Math.floor((total % 3600) / 60);
  const segundosRestantes = total % 60;
  const mm = horas > 0 ? String(minutos).padStart(2, "0") : String(minutos);
  return `${horas > 0 ? `${horas}:` : ""}${mm}:${String(segundosRestantes).padStart(2, "0")}`;
}

export default function AudioInstitucional() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [sonando, setSonando] = useState(false);
  const [actual, setActual] = useState(0);
  const [duracion, setDuracion] = useState(0);
  const [silenciado, setSilenciado] = useState(false);
  const [error, setError] = useState(false);

  async function alternarReproducir() {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    try {
      setError(false);
      await audio.play();
    } catch {
      // Algunos navegadores bloquean la reproducción o no soportan AAC/M4A.
      setError(true);
    }
  }

  function buscar(valor: number) {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration)) return;
    audio.currentTime = valor;
    setActual(valor);
  }

  function alternarSilencio() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setSilenciado(audio.muted);
  }

  return (
    <section
      aria-labelledby="audio-institucional-titulo"
      className="w-full bg-hueso py-space-lg"
    >
      <div className="mx-auto max-w-contenido px-margin">
        <div className="flex flex-col gap-space-md rounded-3xl border border-hueso-5 bg-white p-space-md shadow-tarjeta md:flex-row md:items-center md:gap-space-lg md:p-space-lg">
          <div className="flex min-w-0 items-start gap-space-sm md:w-80 md:shrink-0">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Headphones aria-hidden className="h-5 w-5" />
            </span>
            <div className="flex flex-col gap-1">
              <Kicker tono="primario" className="font-bold">
                Escucha la institución
              </Kicker>
              <h2
                id="audio-institucional-titulo"
                className="font-display text-headline-md font-extrabold leading-tight text-tinta"
              >
                Cómo funciona el SEDEDE en Oruro
              </h2>
              <p className="text-body-sm leading-snug text-tinta-2">
                Cómo trabajamos y cómo apoyamos al deporte orureño.
              </p>
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-space-xs">
            <audio
              ref={audioRef}
              src={AUDIO_SRC}
              preload="metadata"
              onLoadedMetadata={(evento) => setDuracion(evento.currentTarget.duration)}
              onTimeUpdate={(evento) => setActual(evento.currentTarget.currentTime)}
              onPlay={() => setSonando(true)}
              onPause={() => setSonando(false)}
              onEnded={(evento) => {
                evento.currentTarget.currentTime = 0;
                setSonando(false);
                setActual(0);
              }}
              onError={() => {
                setError(true);
                setSonando(false);
              }}
            />

            <div className="flex items-center gap-space-sm">
              <button
                type="button"
                onClick={alternarReproducir}
                aria-label={sonando ? "Pausar audio" : "Reproducir audio"}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-boton transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-boton-fuerte focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {sonando ? (
                  <Pause aria-hidden className="h-5 w-5" fill="currentColor" />
                ) : (
                  <Play aria-hidden className="ml-0.5 h-5 w-5" fill="currentColor" />
                )}
              </button>

              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <input
                  type="range"
                  min={0}
                  max={Number.isFinite(duracion) ? duracion : 0}
                  step={0.1}
                  value={Math.min(actual, duracion || 0)}
                  onChange={(evento) => buscar(Number(evento.target.value))}
                  disabled={!duracion || error}
                  aria-label="Progreso del audio"
                  className="h-1.5 w-full cursor-pointer accent-primary disabled:cursor-not-allowed disabled:opacity-50"
                />
                <div className="flex justify-between font-display text-label-sm tabular-nums text-tinta-3">
                  <span>{formatearTiempo(actual)}</span>
                  <span>{formatearTiempo(duracion)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={alternarSilencio}
                aria-label={silenciado ? "Activar sonido" : "Silenciar audio"}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-hueso-2 text-tinta-2 transition-colors duration-300 hover:bg-hueso-3 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {silenciado ? (
                  <VolumeX aria-hidden className="h-4 w-4" />
                ) : (
                  <Volume2 aria-hidden className="h-4 w-4" />
                )}
              </button>
            </div>

            {error ? (
              <p className="text-body-sm text-primary">
                No se pudo reproducir el audio en este navegador.{" "}
                <a
                  href={AUDIO_SRC}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline underline-offset-2"
                >
                  Abrir el audio
                </a>
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
