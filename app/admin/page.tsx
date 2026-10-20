
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Usuario = {
  name: string;
  email: string;
  rol: string;
};

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

      try {
        const respuesta = await fetch(
          "http://127.0.0.1:8000/api/usuario",
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!respuesta.ok) {
          sessionStorage.removeItem("sedede_token");
          router.replace("/login");
          return;
        }

        const datos = await respuesta.json();

        if (datos.user?.rol !== "admin") {
          sessionStorage.removeItem("sedede_token");
          router.replace("/login");
          return;
        }

        if (activo) setUsuario(datos.user);
      } catch {
        if (activo) {
          sessionStorage.removeItem("sedede_token");
          router.replace("/login");
        }
      } finally {
        if (activo) setCargando(false);
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
      fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).catch(() => {});
    }

    router.replace("/login");
  }

  if (cargando || !usuario) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-gray-600">Verificando acceso...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6 md:p-10">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#A6192E]">
            Panel administrativo SEDEDE
          </h1>
          <p className="mt-2 text-gray-600">
            Bienvenido, {usuario.name}
          </p>
        </div>

        <button
          onClick={cerrarSesion}
          className="rounded-lg bg-[#A6192E] px-4 py-2 font-semibold text-white hover:bg-[#7F1424]"
        >
          Cerrar sesión
        </button>
      </header>

      <section className="mt-10 grid gap-5 md:grid-cols-2">
        <article
          onClick={() => router.push("/admin/noticias")}
          className="cursor-pointer rounded-xl border border-transparent bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#A6192E]/40 hover:shadow-lg active:scale-[0.98]"
        >
          <h2 className="text-xl font-semibold">Noticias</h2>
          <p className="mt-2 text-gray-600">
            Crear, editar y eliminar noticias.
          </p>
          <p className="mt-4 text-sm font-semibold text-[#A6192E]">
            Administrar noticias →
          </p>
        </article>

        <article
          onClick={() => router.push("/admin/comunicados")}
          className="cursor-pointer rounded-xl border border-transparent bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#A6192E]/40 hover:shadow-lg active:scale-[0.98]"
        >
          <h2 className="text-xl font-semibold">Comunicados</h2>
          <p className="mt-2 text-gray-600">
            Crear, editar y eliminar comunicados institucionales.
          </p>
          <p className="mt-4 text-sm font-semibold text-[#A6192E]">
            Administrar comunicados →
          </p>
        </article>

        <article className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Eventos</h2>
          <p className="mt-2 text-gray-600">
            Espacio para administrar los eventos.
          </p>
        </article>
      </section>
    </main>
  );
}