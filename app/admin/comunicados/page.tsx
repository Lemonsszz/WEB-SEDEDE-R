"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  API_URL as API,
  expirarSesion,
  mensajeDeError,
  obtenerToken,
} from "@/lib/admin";

type Comunicado = {
  id: number;
  titulo: string;
  resumen: string | null;
  contenido: string | null;
  archivo_url: string | null;
  fecha_publicacion: string | null;
  publicado: boolean;
};

const formularioInicial = {
  titulo: "",
  resumen: "",
  contenido: "",
  archivoUrl: "",
  publicado: false,
};

export default function GestionComunicadosPage() {
  const router = useRouter();

  const [comunicados, setComunicados] = useState<Comunicado[]>([]);
  const [form, setForm] = useState(formularioInicial);
  const [editando, setEditando] = useState<number | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);
  const [cargandoLista, setCargandoLista] = useState(true);
  const [archivoLocal, setArchivoLocal] = useState<File | null>(null);

  const cargarComunicados = useCallback(() => {
    const token = obtenerToken();

    if (!token) {
      router.replace("/login");
      return Promise.resolve();
    }

    return fetch(`${API}/admin/comunicados`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    })
      .then((respuesta) =>
        respuesta.json().then((datos) => ({ respuesta, datos }))
      )
      .then(({ respuesta, datos }) => {
        if (respuesta.status === 401 || respuesta.status === 403) {
          expirarSesion(router);
          return;
        }

        if (!respuesta.ok || !datos.success) {
          throw new Error(
            datos.message || "No se pudieron cargar los comunicados."
          );
        }

        setComunicados(datos.data);
      })
      .catch((error: unknown) => {
        setMensaje(
          error instanceof Error
            ? error.message
            : "No se pudieron cargar los comunicados."
        );
      })
      .finally(() => {
        setCargandoLista(false);
      });
  }, [router]);

  useEffect(() => {
    void cargarComunicados();
  }, [cargarComunicados]);

  function refrescarLista() {
    setCargandoLista(true);
    return cargarComunicados();
  }

  function cambiar<K extends keyof typeof formularioInicial>(
    campo: K,
    valor: (typeof formularioInicial)[K]
  ) {
    setForm((actual) => ({ ...actual, [campo]: valor }));
  }

  function prepararEdicion(comunicado: Comunicado) {
    setEditando(comunicado.id);
    setForm({
      titulo: comunicado.titulo,
      resumen: comunicado.resumen || "",
      contenido: comunicado.contenido || "",
      archivoUrl: comunicado.archivo_url || "",
      publicado: comunicado.publicado,
    });
    setArchivoLocal(null);
    setMensaje("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelarEdicion() {
    setEditando(null);
    setForm({ ...formularioInicial });
    setArchivoLocal(null);
    setMensaje("");
  }

  async function guardarComunicado(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMensaje("");

    const token = obtenerToken();

    if (!token) {
      router.replace("/login");
      return;
    }

    setCargando(true);

    try {
      let archivoUrl = form.archivoUrl;

      if (archivoLocal) {
        const subida = await fetch(`${API}/admin/comunicados/subir-archivo`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: (() => {
            const datos = new FormData();
            datos.append("archivo", archivoLocal);
            return datos;
          })(),
        });

        if (subida.status === 401 || subida.status === 403) {
          expirarSesion(router);
          return;
        }

        const resultado = await subida.json();

        if (!subida.ok || !resultado.success) {
          throw new Error(resultado.message || "Error al subir el archivo");
        }

        archivoUrl = resultado.url;
      }

      const formData = new FormData();
      formData.append("titulo", form.titulo);
      formData.append("resumen", form.resumen);
      formData.append("contenido", form.contenido);
      formData.append("archivo_url", archivoUrl);
      formData.append("publicado", form.publicado ? "1" : "0");

      const url = editando
        ? `${API}/admin/comunicados/${editando}`
        : `${API}/admin/comunicados`;

      if (editando) {
        formData.append("_method", "PUT");
      }

      const respuesta = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (respuesta.status === 401 || respuesta.status === 403) {
        expirarSesion(router);
        return;
      }

      const datos = await respuesta.json();

      if (!respuesta.ok || !datos.success) {
        setMensaje(mensajeDeError(datos, "No se pudo guardar el comunicado."));
        return;
      }

      setMensaje(
        editando
          ? "Comunicado actualizado correctamente."
          : "Comunicado creado correctamente."
      );

      setEditando(null);
      setForm({ ...formularioInicial });
      setArchivoLocal(null);
      await refrescarLista();
    } catch (error) {
      setMensaje(
        error instanceof Error
          ? error.message
          : "No se pudo conectar con Laravel."
      );
    } finally {
      setCargando(false);
    }
  }

  async function eliminarComunicado(comunicado: Comunicado) {
    if (
      !window.confirm(
        `¿Seguro que deseas eliminar "${comunicado.titulo}"? Esta acción no se puede deshacer.`
      )
    ) {
      return;
    }

    const token = obtenerToken();

    if (!token) {
      router.replace("/login");
      return;
    }

    setMensaje("");

    try {
      const respuesta = await fetch(
        `${API}/admin/comunicados/${comunicado.id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (respuesta.status === 401 || respuesta.status === 403) {
        expirarSesion(router);
        return;
      }

      const datos = await respuesta.json();

      if (!respuesta.ok || !datos.success) {
        throw new Error(
          mensajeDeError(datos, "No se pudo eliminar el comunicado.")
        );
      }

      if (editando === comunicado.id) cancelarEdicion();

      setComunicados((actuales) =>
        actuales.filter((c) => c.id !== comunicado.id)
      );

      setMensaje("Comunicado eliminado correctamente.");
    } catch (error) {
      setMensaje(
        error instanceof Error
          ? error.message
          : "No se pudo eliminar el comunicado."
      );
    }
  }

  return (
    <main className="min-h-screen bg-hueso-2 px-4 py-8 text-tinta sm:px-6">
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="mb-5 inline-flex items-center gap-2 font-display text-label-md font-semibold text-primary transition-colors hover:text-primary-dark"
        >
          ← Volver al panel
        </button>

        <header className="mb-8 rounded-3xl bg-gradient-to-b from-primary to-primary-deep p-6 text-white shadow-tarjeta sm:p-8">
          <p className="font-display text-kicker uppercase tracking-[0.2em] text-gold-soft">
            Administración SEDEDE
          </p>
          <h1 className="mt-2 font-display text-headline-md font-extrabold">Gestión de comunicados</h1>
          <p className="mt-2 text-sm text-white/90">
            Crea, edita y administra los comunicados oficiales.
          </p>
        </header>

        <section className="mb-8 rounded-2xl bg-white p-5 shadow-tarjeta sm:p-8">
          <h2 className="font-display text-headline-sm font-bold">
            {editando ? "Editar comunicado" : "Crear comunicado"}
          </h2>

          <form onSubmit={guardarComunicado} className="mt-6 space-y-5">
            <div>
              <label
                htmlFor="comunicado-titulo"
                className="mb-2 block font-display text-label-sm font-semibold uppercase tracking-wider text-tinta-2"
              >
                Título
              </label>
              <input
                id="comunicado-titulo"
                required
                maxLength={255}
                value={form.titulo}
                onChange={(e) => cambiar("titulo", e.target.value)}
                className="w-full rounded-lg border border-hueso-4 px-4 py-3 outline-none focus:border-primary"
                placeholder="Título del comunicado"
              />
            </div>

            <div>
              <label
                htmlFor="comunicado-resumen"
                className="mb-2 block font-display text-label-sm font-semibold uppercase tracking-wider text-tinta-2"
              >
                Resumen
              </label>
              <textarea
                id="comunicado-resumen"
                required
                rows={3}
                value={form.resumen}
                onChange={(e) => cambiar("resumen", e.target.value)}
                className="w-full rounded-lg border border-hueso-4 px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label
                htmlFor="comunicado-contenido"
                className="mb-2 block font-display text-label-sm font-semibold uppercase tracking-wider text-tinta-2"
              >
                Contenido completo
              </label>
              <textarea
                id="comunicado-contenido"
                rows={7}
                value={form.contenido}
                onChange={(e) => cambiar("contenido", e.target.value)}
                className="w-full rounded-lg border border-hueso-4 px-4 py-3 outline-none focus:border-primary"
              />
              <p className="mt-1 text-xs text-tinta-3">
                Opcional. Se mostrará en la página del comunicado, junto con el
                documento adjunto (si lo hay).
              </p>
            </div>

            <div>
              <label
                htmlFor="comunicado-archivo-url"
                className="mb-2 block font-display text-label-sm font-semibold uppercase tracking-wider text-tinta-2"
              >
                Documento adjunto
              </label>

              <input
                id="comunicado-archivo-url"
                type="url"
                value={form.archivoUrl}
                onChange={(e) => cambiar("archivoUrl", e.target.value)}
                placeholder="O pega una URL de documento"
                className="mb-3 w-full rounded-lg border border-hueso-4 px-4 py-3"
              />

              <input
                id="comunicado-archivo"
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                aria-label="Subir documento desde el dispositivo"
                onChange={(e) => {
                  const archivo = e.target.files?.[0] ?? null;
                  setArchivoLocal(archivo);
                }}
                className="w-full rounded-lg border border-hueso-4 p-3"
              />

              {archivoLocal && (
                <p className="mt-2 rounded-lg bg-hueso-2 p-3 text-sm text-tinta-2">
                  Archivo seleccionado: {archivoLocal.name}
                </p>
              )}

              <p className="mt-1 text-xs text-tinta-3">
                PDF, Word o Excel. Máximo 15 MB. Si eliges un archivo local,
                reemplazará la URL anterior.
              </p>
            </div>

            <div className="rounded-lg bg-hueso-2 p-4">
              <label
                htmlFor="comunicado-publicado"
                className="flex items-center gap-3 text-sm"
              >
                <input
                  id="comunicado-publicado"
                  type="checkbox"
                  checked={form.publicado}
                  onChange={(e) => cambiar("publicado", e.target.checked)}
                  className="h-4 w-4 accent-primary"
                />
                Publicar inmediatamente en la web
              </label>
            </div>

            {mensaje && (
              <p
                role="status"
                aria-live="polite"
                className="rounded-lg bg-hueso-2 p-3 text-sm"
              >
                {mensaje}
              </p>
            )}

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={cargando}
                className="rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-dark disabled:opacity-50"
              >
                {cargando
                  ? "Guardando..."
                  : editando
                    ? "Guardar cambios"
                    : "Crear comunicado"}
              </button>

              {editando !== null && (
                <button
                  type="button"
                  onClick={cancelarEdicion}
                  className="rounded-lg border border-hueso-4 px-6 py-3 font-semibold hover:bg-hueso-2"
                >
                  Cancelar edición
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="rounded-2xl bg-white p-5 shadow-tarjeta sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-headline-sm font-bold">Comunicados registrados</h2>
            <button
              type="button"
              onClick={() => void refrescarLista()}
              disabled={cargandoLista}
              className="rounded-lg border border-hueso-4 px-4 py-2 text-sm font-semibold hover:bg-hueso-2 disabled:opacity-50"
            >
              {cargandoLista ? "Actualizando..." : "Actualizar lista"}
            </button>
          </div>

          {cargandoLista ? (
            <p className="py-8 text-tinta-3">Cargando comunicados...</p>
          ) : comunicados.length === 0 ? (
            <p className="py-8 text-tinta-3">
              Todavía no hay comunicados registrados.
            </p>
          ) : (
            <div className="mt-5 divide-y divide-hueso-5">
              {comunicados.map((comunicado) => (
                <article
                  key={comunicado.id}
                  className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center"
                >
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold">{comunicado.titulo}</h3>
                    <p className="mt-1 text-sm text-tinta-3 line-clamp-2">
                      {comunicado.resumen}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          comunicado.publicado
                            ? "bg-exito-suave text-exito"
                            : "bg-hueso-2 text-tinta-2"
                        }`}
                      >
                        {comunicado.publicado ? "Publicado" : "Borrador"}
                      </span>
                      {comunicado.archivo_url && (
                        <span className="rounded-full bg-info-suave px-3 py-1 text-xs font-semibold text-info">
                          Con documento
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => prepararEdicion(comunicado)}
                      className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => void eliminarComunicado(comunicado)}
                      className="rounded-lg border border-primary/30 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/5"
                    >
                      Eliminar
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
