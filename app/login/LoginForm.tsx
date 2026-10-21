"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Lock, Mail, ShieldCheck } from "lucide-react";
import { API_URL } from "@/lib/admin";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const motivo = searchParams.get("motivo");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(
    motivo === "sesion"
      ? "Tu sesión expiró o no es válida. Inicia sesión nuevamente."
      : ""
  );
  const [cargando, setCargando] = useState(false);

  async function iniciarSesion(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      const respuesta = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          datos.message || "No se pudo iniciar sesión."
        );
      }

      if (datos.user?.rol !== "admin") {
        setError("Tu cuenta no tiene permisos de administrador.");
        return;
      }

      sessionStorage.setItem("sedede_token", datos.token);
      router.push("/admin");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo conectar con el servidor."
      );
    } finally {
      setCargando(false);
    }
  }

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <section className="relative hidden overflow-hidden bg-gradient-to-b from-primary to-primary-deep px-margin py-space-xl text-white lg:flex lg:flex-col lg:justify-between">
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full opacity-10 mix-blend-overlay"
        >
          <defs>
            <pattern
              id="login-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#login-grid)" />
        </svg>

        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold-soft/20 blur-3xl" />

        <div className="relative flex items-center gap-space-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 font-display text-headline-md font-black text-white">
            S
          </div>
          <div className="flex flex-col">
            <span className="font-display text-headline-sm font-extrabold uppercase text-white">
              SEDEDE
            </span>
            <span className="font-display text-label-sm uppercase text-white/60">
              Gobierno Departamental
            </span>
          </div>
        </div>

        <div className="relative flex flex-col gap-space-md">
          <h1 className="font-display text-display-hero font-black uppercase leading-none tracking-tight text-white">
            Gestión de contenido
          </h1>
          <p className="max-w-md font-body-lg leading-relaxed text-white/85">
            Publica noticias, comunicados y eventos del Servicio Departamental de
            Deportes desde un único panel.
          </p>

          <ul className="flex flex-col gap-space-xs pt-space-sm">
            {[
              "Noticias con imagen y resumen",
              "Comunicados con archivo adjunto",
              "Agenda de eventos por fecha",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 font-body-sm text-white/80"
              >
                <ShieldCheck aria-hidden className="h-4 w-4 text-gold-soft" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative font-display text-label-sm uppercase tracking-wider text-white/50">
          Servicio Departamental de Deportes · Oruro
        </p>
      </section>

      <section className="flex items-center justify-center bg-hueso-2 px-4 py-10">
        <form
          onSubmit={iniciarSesion}
          className="w-full max-w-md rounded-3xl bg-white p-space-lg shadow-tarjeta"
        >
          <div className="flex flex-col gap-1">
            <span className="font-display text-kicker uppercase tracking-[0.2em] text-primary">
              Acceso restringido
            </span>
            <h2 className="font-display text-headline-lg font-black tracking-tight text-tinta">
              Inicia sesión
            </h2>
            <p className="font-body-sm text-tinta-2">
              Panel administrativo del Servicio Departamental de Deportes.
            </p>
          </div>

          <div className="mt-space-md flex flex-col gap-space-md">
            <div>
              <label
                htmlFor="email"
                className="mb-1 block font-display text-label-sm font-semibold uppercase tracking-wider text-tinta-2"
              >
                Correo electrónico
              </label>
              <div className="relative">
                <Mail
                  aria-hidden
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tinta-3"
                />
                <input
                  id="email"
                  type="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-hueso-4 bg-white py-3 pl-10 pr-4 font-body-sm text-tinta outline-none transition-colors focus:border-primary"
                  placeholder="admin@sedede.bo"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1 block font-display text-label-sm font-semibold uppercase tracking-wider text-tinta-2"
              >
                Contraseña
              </label>
              <div className="relative">
                <Lock
                  aria-hidden
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tinta-3"
                />
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-hueso-4 bg-white py-3 pl-10 pr-4 font-body-sm text-tinta outline-none transition-colors focus:border-primary"
                  placeholder="Ingresa tu contraseña"
                />
              </div>
            </div>

            {error ? (
              <p
                role="alert"
                className="rounded-xl bg-primary/10 p-3 font-body-sm text-primary"
              >
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={cargando}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 font-display font-semibold text-white shadow-boton transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark disabled:pointer-events-none disabled:opacity-60"
            >
              {cargando ? "Verificando..." : "Iniciar sesión"}
              {cargando ? null : (
                <ArrowRight aria-hidden className="h-4 w-4" />
              )}
            </button>
          </div>

          <p className="mt-space-md text-center font-body-sm text-tinta-3">
            Acceso exclusivo para personal autorizado.
          </p>
        </form>
      </section>
    </main>
  );
}
