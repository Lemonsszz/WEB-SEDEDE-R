"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  API_URL as API,
  expirarSesion,
  mensajeDeError,
  obtenerToken,
} from "@/lib/admin";
import { fechaHoyBolivia, formatearFechaSoloDia } from "@/lib/api";

type Evento = {
  id: number;
  titulo: string;
  descripcion: string | null;
  fecha: string;
  hora: string | null;
  lugar: string | null;
  imagen_url: string | null;
  publicado: boolean;
};

const formularioInicial = {
  titulo: "",
  descripcion: "",
  fecha: "",
  hora: "",
  lugar: "",
  imagenUrl: "",
  publicado: false,
};

export default function GestionEventosPage() {
  const router = useRouter();

  const [eventos, setEventos] = useState<Evento[]>([]);
  const [form, setForm] = useState(formularioInicial);
  const [editando, setEditando] = useState<number | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);
  const [cargandoLista, setCargandoLista] = useState(true);

  const cargarEventos = useCallback(() => {
    const token = obtenerToken();

    if (!token) {
      router.replace("/login");
      return Promise.resolve();
    }

    return fetch(`${API}/admin/eventos`, {
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
            datos.message || "No se pudieron cargar los eventos."
          );
        }

        setEventos(datos.data);
      })
      .catch((error: unknown) => {
        setMensaje(
          error instanceof Error
            ? error.message
            : "No se pudieron cargar los eventos."
        );
      })
      .finally(() => {
        setCargandoLista(false);
      });
  }, [router]);

  useEffect(() => {
    void cargarEventos();
  }, [cargarEventos]);

  function refrescarLista() {
    setCargandoLista(true);
    return cargarEventos();
  }

  function cambiar<K extends keyof typeof formularioInicial>(
    campo: K,
    valor: (typeof formularioInicial)[K]
  ) {
    setForm((actual) => ({ ...actual, [campo]: valor }));
  }

  function prepararEdicion(evento: Evento) {
    setEditando(evento.id);
    setForm({
      titulo: evento.titulo,
      descripcion: evento.descripcion || "",
      fecha: evento.fecha.slice(0, 10),
      hora: evento.hora ? evento.hora.slice(0, 5) : "",
      lugar: evento.lugar || "",
      imagenUrl: evento.imagen_url || "",
      publicado: evento.publicado,
    });
    setMensaje("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelarEdicion() {
    setEditando(null);
    setForm({ ...formularioInicial });
    setMensaje("");
  }

  async function guardarEvento(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMensaje("");

    const token = obtenerToken();

    if (!token) {
      router.replace("/login");
      return;
    }

    setCargando(true);

    try {
      const formData = new FormData();
      formData.append("titulo", form.titulo);
      formData.append("descripcion", form.descripcion);
      formData.append("fecha", form.fecha);
      formData.append("hora", form.hora);
      formData.append("lugar", form.lugar);
      formData.append("imagen_url", form.imagenUrl);
      formData.append("publicado", form.publicado ? "1" : "0");

      const url = editando
        ? `${API}/admin/eventos/${editando}`
        : `${API}/admin/eventos`;

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
        setMensaje(mensajeDeError(datos, "No se pudo guardar el evento."));
        return;
      }

      setMensaje(
        editando
          ? "Evento actualizado correctamente."
          : "Evento creado correctamente."
      );

      setEditando(null);
      setForm({ ...formularioInicial });
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

  async function eliminarEvento(evento: Evento) {
    if (
      !window.confirm(
        `¿Seguro que deseas eliminar "${evento.titulo}"? Esta acción no se puede deshacer.`
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
      const respuesta = await fetch(`${API}/admin/eventos/${evento.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (respuesta.status === 401 || respuesta.status === 403) {
        expirarSesion(router);
        return;
      }

      const datos = await respuesta.json();

      if (!respuesta.ok || !datos.success) {
        throw new Error(
          mensajeDeError(datos, "No se pudo eliminar el evento.")
        );
      }

      if (editando === evento.id) cancelarEdicion();

      setEventos((actuales) =>
        actuales.filter((e) => e.id !== evento.id)
      );

      setMensaje("Evento eliminado correctamente.");
    } catch (error) {
      setMensaje(
        error instanceof Error
          ? error.message
          : "No se pudo eliminar el evento."
      );
    }
  }

  const hoy = fechaHoyBolivia();

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
          <h1 className="mt-2 font-display text-headline-md font-extrabold">Gestión de eventos</h1>
          <p className="mt-2 text-sm text-white/90">
            Crea, edita y administra la agenda deportiva.
          </p>
        </header>

        <section className="mb-8 rounded-2xl bg-white p-5 shadow-tarjeta sm:p-8">
          <h2 className="font-display text-headline-sm font-bold">
            {editando ? "Editar evento" : "Crear evento"}
          </h2>

          <form onSubmit={guardarEvento} className="mt-6 space-y-5">
            <div>
              <label
                htmlFor="evento-titulo"
                className="mb-2 block font-display text-label-sm font-semibold uppercase tracking-wider text-tinta-2"
              >
                Título
              </label>
              <input
                id="evento-titulo"
                required
                maxLength={255}
                value={form.titulo}
                onChange={(e) => cambiar("titulo", e.target.value)}
                className="w-full rounded-lg border border-hueso-4 px-4 py-3 outline-none focus:border-primary"
                placeholder="Título del evento"
              />
            </div>

            <div>
              <label
                htmlFor="evento-descripcion"
                className="mb-2 block font-display text-label-sm font-semibold uppercase tracking-wider text-tinta-2"
              >
                Descripción
              </label>
              <textarea
                id="evento-descripcion"
                rows={4}
                value={form.descripcion}
                onChange={(e) => cambiar("descripcion", e.target.value)}
                className="w-full rounded-lg border border-hueso-4 px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="evento-fecha"
                  className="mb-2 block font-display text-label-sm font-semibold uppercase tracking-wider text-tinta-2"
                >
                  Fecha
                </label>
                <input
                  id="evento-fecha"
                  type="date"
                  required
                  value={form.fecha}
                  onChange={(e) => cambiar("fecha", e.target.value)}
                  className="w-full rounded-lg border border-hueso-4 px-4 py-3 outline-none focus:border-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="evento-hora"
                  className="mb-2 block font-display text-label-sm font-semibold uppercase tracking-wider text-tinta-2"
                >
                  Hora (opcional)
                </label>
                <input
                  id="evento-hora"
                  type="time"
                  value={form.hora}
                  onChange={(e) => cambiar("hora", e.target.value)}
                  className="w-full rounded-lg border border-hueso-4 px-4 py-3 outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="evento-lugar"
                className="mb-2 block font-display text-label-sm font-semibold uppercase tracking-wider text-tinta-2"
              >
                Lugar (opcional)
              </label>
              <input
                id="evento-lugar"
                type="text"
                maxLength={255}
                value={form.lugar}
                onChange={(e) => cambiar("lugar", e.target.value)}
                className="w-full rounded-lg border border-hueso-4 px-4 py-3 outline-none focus:border-primary"
                placeholder="Estadio, coliseo o dirección"
              />
            </div>

            <div>
              <label
                htmlFor="evento-imagen-url"
                className="mb-2 block font-display text-label-sm font-semibold uppercase tracking-wider text-tinta-2"
              >
                Imagen (opcional)
              </label>
              <input
                id="evento-imagen-url"
                type="url"
                value={form.imagenUrl}
                onChange={(e) => cambiar("imagenUrl", e.target.value)}
                placeholder="Pega una URL de imagen"
                className="w-full rounded-lg border border-hueso-4 px-4 py-3"
              />
              <p className="mt-1 text-xs text-tinta-3">
                Por ahora solo se admite una URL. La subida de archivos se
                añadirá más adelante.
              </p>
            </div>

            <div className="rounded-lg bg-hueso-2 p-4">
              <label
                htmlFor="evento-publicado"
                className="flex items-center gap-3 text-sm"
              >
                <input
                  id="evento-publicado"
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
                    : "Crear evento"}
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
            <h2 className="font-display text-headline-sm font-bold">Eventos registrados</h2>
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
            <p className="py-8 text-tinta-3">Cargando eventos...</p>
          ) : eventos.length === 0 ? (
            <p className="py-8 text-tinta-3">
              Todavía no hay eventos registrados.
            </p>
          ) : (
            <div className="mt-5 divide-y divide-hueso-5">
              {eventos.map((evento) => (
                <article
                  key={evento.id}
                  className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center"
                >
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold">{evento.titulo}</h3>
                    <p className="mt-1 text-sm text-tinta-3">
                      {formatearFechaSoloDia(evento.fecha)}
                      {evento.hora && ` · ${evento.hora.slice(0, 5)}`}
                      {evento.lugar && ` · ${evento.lugar}`}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          evento.publicado
                            ? "bg-exito-suave text-exito"
                            : "bg-hueso-2 text-tinta-2"
                        }`}
                      >
                        {evento.publicado ? "Publicado" : "Borrador"}
                      </span>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {evento.fecha.slice(0, 10) >= hoy
                          ? "Próximo"
                          : "Realizado"}
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => prepararEdicion(evento)}
                      className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => void eliminarEvento(evento)}
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
