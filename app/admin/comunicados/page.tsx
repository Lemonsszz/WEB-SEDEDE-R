"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API = "http://127.0.0.1:8000/api";

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

  const cargarComunicados = useCallback(async () => {
    const token = sessionStorage.getItem("sedede_token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const respuesta = await fetch(`${API}/admin/comunicados`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      const datos = await respuesta.json();

      if (respuesta.status === 401 || respuesta.status === 403) {
        setMensaje("Tu sesión no está autorizada. Inicia sesión nuevamente.");
        return;
      }

      if (!respuesta.ok || !datos.success) {
        throw new Error(datos.message || "No se pudieron cargar los comunicados.");
      }

      setComunicados(datos.data);
    } catch (error) {
      setMensaje(
        error instanceof Error
          ? error.message
          : "No se pudieron cargar los comunicados."
      );
    } finally {
      setCargandoLista(false);
    }
  }, [router]);

  useEffect(() => {
    async function cargarInicial() {
      await cargarComunicados();
    }

    void cargarInicial();
  }, [cargarComunicados]);

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

    const token = sessionStorage.getItem("sedede_token");

    if (!token) {
      router.push("/login");
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

      const method = editando ? "POST" : "POST";
      if (editando) {
        formData.append("_method", "PUT");
      }

      const respuesta = await fetch(url, {
        method,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        const errores = datos.errors
          ? Object.values(datos.errors).flat().join(" ")
          : datos.message || "No se pudo guardar el comunicado.";

        setMensaje(String(errores));
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
      await cargarComunicados();
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

    const token = sessionStorage.getItem("sedede_token");

    if (!token) {
      router.push("/login");
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

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.message || "No se pudo eliminar el comunicado.");
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
    <main className="min-h-screen bg-gray-100 px-4 py-8 text-gray-900 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="mb-5 text-sm font-semibold text-[#A6192E] hover:underline"
        >
          ← Volver al panel
        </button>

        <header className="mb-8 rounded-2xl bg-[#A6192E] p-6 text-white sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/80">
            Administración SEDEDE
          </p>
          <h1 className="mt-2 text-3xl font-bold">Gestión de comunicados</h1>
          <p className="mt-2 text-sm text-white/90">
            Crea, edita y administra los comunicados oficiales.
          </p>
        </header>

        <section className="mb-8 rounded-2xl bg-white p-5 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold">
            {editando ? "Editar comunicado" : "Crear comunicado"}
          </h2>

          <form onSubmit={guardarComunicado} className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold">Título</label>
              <input
                required
                maxLength={255}
                value={form.titulo}
                onChange={(e) => cambiar("titulo", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#A6192E]"
                placeholder="Título del comunicado"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">Resumen</label>
              <textarea
                required
                rows={3}
                value={form.resumen}
                onChange={(e) => cambiar("resumen", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#A6192E]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Contenido completo
              </label>
              <textarea
                rows={7}
                value={form.contenido}
                onChange={(e) => cambiar("contenido", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#A6192E]"
              />
              <p className="mt-1 text-xs text-gray-500">
                Opcional. Se mostrará en la página del comunicado, junto con el
                documento adjunto (si lo hay).
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Documento adjunto
              </label>

              <input
                type="url"
                value={form.archivoUrl}
                onChange={(e) => cambiar("archivoUrl", e.target.value)}
                placeholder="O pega una URL de documento"
                className="mb-3 w-full rounded-lg border border-gray-300 px-4 py-3"
              />

              <input
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                onChange={(e) => {
                  const archivo = e.target.files?.[0] ?? null;
                  setArchivoLocal(archivo);
                }}
                className="w-full rounded-lg border border-gray-300 p-3"
              />

              {archivoLocal && (
                <p className="mt-2 rounded-lg bg-gray-50 p-3 text-sm text-gray-700">
                  Archivo seleccionado: {archivoLocal.name}
                </p>
              )}

              <p className="mt-1 text-xs text-gray-500">
                PDF, Word o Excel. Máximo 15 MB. Si eliges un archivo local,
                reemplazará la URL anterior.
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={form.publicado}
                  onChange={(e) => cambiar("publicado", e.target.checked)}
                  className="h-4 w-4 accent-[#A6192E]"
                />
                Publicar inmediatamente en la web
              </label>
            </div>

            {mensaje && (
              <p
                role="status"
                className="rounded-lg bg-gray-100 p-3 text-sm"
              >
                {mensaje}
              </p>
            )}

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={cargando}
                className="rounded-lg bg-[#A6192E] px-6 py-3 font-semibold text-white hover:bg-[#7F1424] disabled:opacity-50"
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
                  className="rounded-lg border border-gray-300 px-6 py-3 font-semibold hover:bg-gray-50"
                >
                  Cancelar edición
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold">Comunicados registrados</h2>
            <button
              type="button"
              onClick={() => void cargarComunicados()}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold hover:bg-gray-50"
            >
              Actualizar lista
            </button>
          </div>

          {cargandoLista ? (
            <p className="py-8 text-gray-500">Cargando comunicados...</p>
          ) : comunicados.length === 0 ? (
            <p className="py-8 text-gray-500">
              Todavía no hay comunicados registrados.
            </p>
          ) : (
            <div className="mt-5 divide-y divide-gray-200">
              {comunicados.map((comunicado) => (
                <article
                  key={comunicado.id}
                  className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center"
                >
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold">{comunicado.titulo}</h3>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                      {comunicado.resumen}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          comunicado.publicado
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {comunicado.publicado ? "Publicado" : "Borrador"}
                      </span>
                      {comunicado.archivo_url && (
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                          Con documento
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => prepararEdicion(comunicado)}
                      className="rounded-lg bg-[#A6192E] px-4 py-2 text-sm font-semibold text-white hover:bg-[#7F1424]"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => void eliminarComunicado(comunicado)}
                      className="rounded-lg border border-[#A6192E]/30 px-4 py-2 text-sm font-semibold text-[#A6192E] hover:bg-[#A6192E]/5"
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
