"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CalendarDays, LogOut, Megaphone, Newspaper } from "lucide-react";
import { API_URL, expirarSesion } from "@/lib/admin";

type Usuario = {
  name: string;
  email: string;
  rol: string;
};

const SECCIONES = [
  {
    titulo: "Noticias",
    descripcion: "Crear, editar y eliminar noticias.",
    href: "/admin/noticias",
    icono: Newspaper,
  },
  {
    titulo: "Comunicados",
    descripcion: "Crear, editar y eliminar comunicados institucionales.",
    href: "/admin/comunicados",
    icono: Megaphone,
  },
  {
    titulo: "Eventos",
    descripcion: "Crear, editar y eliminar los eventos de la agenda deportiva.",
    href: "/admin/eventos",
    icono: CalendarDays,
  },
];

export default function AdminPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let activo = true;

    async function verificarSesion() {
      const token = sessionStorage.getItem("sedede_token");

      if (!token) {
        router.replace("/login");
        return;
      }

      // El panel se muestra en cuanto hay token; la validación real ocurre
      // en segundo plano (el API protege igual cada endpoint de admin).
      if (activo) setCargando(false);

      try {
        const respuesta = await fetch(`${API_URL}/usuario`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!respuesta.ok) {
          expirarSesion(router);
          return;
        }

        const datos = await respuesta.json();

        if (datos.user?.rol !== "admin") {
          expirarSesion(router);
          return;
        }

        if (activo) setUsuario(datos.user);
      } catch {
        if (activo) {
          expirarSesion(router);
        }
      }
    }

    verificarSesion();

    return () => {
      activo = false;
    };
  }, [router]);

  function cerrarSesion() {
    const token = sessionStorage.getItem("sedede_token");

    sessionStorage.removeItem("sedede_token");

    if (token) {
      fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).catch(() => {});
    }

    router.replace("/login");
  }

  if (cargando) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-hueso-2">
        <p className="text-body-md text-tinta-2">Verificando acceso...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-hueso-2">
      <header className="bg-gradient-to-b from-primary to-primary-deep text-white">
        <div className="mx-auto flex max-w-contenido flex-col gap-space-md px-margin py-space-lg md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-display text-kicker uppercase tracking-[0.2em] text-gold-soft">
              Panel administrativo
            </span>
            <h1 className="mt-1 font-display text-headline-xl font-black tracking-tight text-white">
              Gestión SEDEDE
            </h1>
            <p className="mt-1 text-body-md text-white/80">
              {usuario
                ? `Bienvenido, ${usuario.name} · ${usuario.email}`
                : "Sesión verificada · cargando datos del usuario..."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-space-md py-space-xs font-display text-label-md text-white transition-colors hover:bg-white/20"
            >
              Ver sitio público
            </Link>
            <button
              type="button"
              onClick={cerrarSesion}
              className="inline-flex items-center gap-2 rounded-full bg-white px-space-md py-space-xs font-display text-label-md font-semibold text-primary transition-colors hover:bg-hueso-2"
            >
              <LogOut aria-hidden className="h-4 w-4" />
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-contenido gap-gutter px-margin py-space-xl md:grid-cols-3">
        {SECCIONES.map((seccion) => {
          const Icono = seccion.icono;

          return (
            <Link
              key={seccion.titulo}
              href={seccion.href}
              className="group flex flex-col gap-space-sm rounded-2xl bg-white p-space-md shadow-tarjeta transition-all duration-300 hover:-translate-y-1.5 hover:shadow-tarjeta-hover"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icono aria-hidden className="h-6 w-6" />
              </div>

              <h2 className="font-display text-headline-md font-extrabold text-tinta">
                {seccion.titulo}
              </h2>
              <p className="text-body-sm text-tinta-2">{seccion.descripcion}</p>

              <span className="mt-auto inline-flex items-center gap-1 font-display text-label-md font-semibold text-primary">
                Administrar {seccion.titulo.toLowerCase()}
                <ArrowRight
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
