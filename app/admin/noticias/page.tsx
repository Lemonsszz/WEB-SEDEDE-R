
"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API = "http://127.0.0.1:8000/api";

type Noticia = {
  id: number;
  titulo: string;
  slug: string;
  resumen: string | null;
  contenido: string | null;
  imagen_url: string | null;
  categoria: string | null;
  fecha_publicacion: string | null;
  destacada: boolean;
  publicada: boolean;
};

const formularioInicial = {
  titulo: "",
  resumen: "",
  contenido: "",
  categoria: "Institucional",
  imagenUrl: "",
  destacada: false,
  publicada: false,
};

export default function GestionNoticiasPage() {
  const router = useRouter();

  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [form, setForm] = useState(formularioInicial);
  const [editando, setEditando] = useState<number | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);
  const [cargandoLista, setCargandoLista] = useState(true);
  const [imagenLocal, setImagenLocal] = useState<File | null>(null);
  const [vistaPrevia, setVistaPrevia] = useState("");

  const cargarNoticias = useCallback(async () => {
    const token = sessionStorage.getItem("sedede_token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const respuesta = await fetch(`${API}/admin/noticias`, {
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
        throw new Error(datos.message || "No se pudieron cargar las noticias.");
      }

      setNoticias(datos.data);
    } catch (error) {
      setMensaje(
        error instanceof Error
          ? error.message
          : "No se pudieron cargar las noticias."
      );
    } finally {
      setCargandoLista(false);
    }
  }, [router]);

  useEffect(() => {
    void cargarNoticias();
  }, [cargarNoticias]);

  function cambiar<K extends keyof typeof formularioInicial>(
    campo: K,
    valor: (typeof formularioInicial)[K]
  ) {
    setForm((actual) => ({ ...actual, [campo]: valor }));
  }

  function prepararEdicion(noticia: Noticia) {
    setEditando(noticia.id);
    setForm({
      titulo: noticia.titulo,
      resumen: noticia.resumen || "",
      contenido: noticia.contenido || "",
      categoria: noticia.categoria || "Institucional",
      imagenUrl: noticia.imagen_url || "",
      destacada: noticia.destacada,
      publicada: noticia.publicada,
    });
    setImagenLocal(null);
    setVistaPrevia("");
    setMensaje("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelarEdicion() {
    setEditando(null);
    setForm({ ...formularioInicial });
    setImagenLocal(null);
    setVistaPrevia("");
    setMensaje("");
  }

  async function guardarNoticia(e: React.FormEvent<HTMLFormElement>) {e.preventDefault();
    setMensaje("");

    const token = sessionStorage.getItem("sedede_token");

    if (!token) {
      router.push("/login");
      return;
    }

    setCargando(true);

    try {
      const formData = new FormData();
      formData.append("titulo", form.titulo);
      formData.append("resumen", form.resumen);
      formData.append("contenido", form.contenido);
      formData.append("categoria", form.categoria);
      formData.append("destacada", form.destacada ? "1" : "0");
      formData.append("publicada", form.publicada ? "1" : "0");

      if (imagenLocal) {
        formData.append("imagen", imagenLocal);
      } else {
        formData.append("imagen_url", form.imagenUrl);
      }

      const url = editando
        ? `${API}/admin/noticias/${editando}`
        : `${API}/admin/noticias`;

      const method = editando ? "POST" : "POST";
      if (editando) {
        formData.append("_method", "PUT");
      }
 if (imagenLocal) {
  const subida = await fetch(
    `${API}/admin/noticias/subir-imagen`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: (() => {
        const datos = new FormData();
        datos.append("imagen", imagenLocal);
        return datos;
      })(),
    }
  );

  const resultado = await subida.json();

  if (!subida.ok || !resultado.success) {
    throw new Error(resultado.message || "Error al subir la imagen");
  }

  formData.set("imagen_url", resultado.url);
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
          : datos.message || "No se pudo guardar la noticia.";

        setMensaje(String(errores));
        return;
      }

      setMensaje(
        editando
          ? "Noticia actualizada correctamente."
          : "Noticia creada correctamente."
      );

      setEditando(null);
      setForm({ ...formularioInicial });
      setImagenLocal(null);
      setVistaPrevia("");
      setImagenLocal(null);
      setVistaPrevia("");
      await cargarNoticias();
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

  async function eliminarNoticia(noticia: Noticia) {
    if (
      !window.confirm(
        `¿Seguro que deseas eliminar "${noticia.titulo}"? Esta acción no se puede deshacer.`
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
        `${API}/admin/noticias/${noticia.id}`,
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
        throw new Error(datos.message || "No se pudo eliminar la noticia.");
      }

      if (editando === noticia.id) cancelarEdicion();

setNoticias((actuales) =>
  actuales.filter((n) => n.id !== noticia.id)
);

setMensaje("Noticia eliminada correctamente.");
    } catch (error) {
      setMensaje(
        error instanceof Error
          ? error.message
          : "No se pudo eliminar la noticia."
      );
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 text-gray-900 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="mb-5 text-sm font-semibold text-red-800 hover:underline"
        >
          ← Volver al panel
        </button>

        <header className="mb-8 rounded-2xl bg-[#A6192E] p-6 text-white sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/80">
            Administración SEDEDE
          </p>
          <h1 className="mt-2 text-3xl font-bold">Gestión de noticias</h1>
          <p className="mt-2 text-sm text-white/90">
            Crea, edita y administra las noticias institucionales.
          </p>
        </header>

        <section className="mb-8 rounded-2xl bg-white p-5 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold">
            {editando ? "Editar noticia" : "Crear noticia"}
          </h2>

          <form onSubmit={guardarNoticia} className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold">Título</label>
              <input
                required
                maxLength={255}
                value={form.titulo}
                onChange={(e) => cambiar("titulo", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-700"
                placeholder="Título de la noticia"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">Resumen</label>
              <textarea
                required
                rows={3}
                value={form.resumen}
                onChange={(e) => cambiar("resumen", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-700"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Contenido completo
              </label>
              <textarea
                required
                rows={7}
                value={form.contenido}
                onChange={(e) => cambiar("contenido", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-700"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">Categoría</label>
              <select
                value={form.categoria}
                onChange={(e) => cambiar("categoria", e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3"
              >
                <option>Institucional</option>
                <option>Deportivo</option>
                <option>Campeonatos</option>
                <option>Apoyo a deportistas</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Fotografía de la noticia
              </label>

              <input
                type="url"
                value={form.imagenUrl}
                onChange={(e) => cambiar("imagenUrl", e.target.value)}
                placeholder="O pega una URL de imagen"
                className="mb-3 w-full rounded-lg border border-gray-300 px-4 py-3"
              />

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                capture="environment"
                onChange={(e) => {
                  const archivo = e.target.files?.[0] ?? null;
                  setImagenLocal(archivo);
                  setVistaPrevia(archivo ? URL.createObjectURL(archivo) : "");
                }}
                className="w-full rounded-lg border border-gray-300 p-3"
              />

              {(vistaPrevia || form.imagenUrl) && (
                <img
                  src={vistaPrevia || form.imagenUrl}
                  alt="Vista previa"
                  className="mt-3 h-48 w-full rounded-lg object-cover"
                />
              )}

              <p className="mt-1 text-xs text-gray-500">
                JPG, PNG o WebP. Máximo 10 MB. Si eliges una foto local,
                reemplazará la URL anterior.
              </p>
            </div>

            <div className="space-y-3 rounded-lg bg-gray-50 p-4">
              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={form.destacada}
                  onChange={(e) => cambiar("destacada", e.target.checked)}
                  className="h-4 w-4 accent-red-700"
                />
                Mostrar como noticia destacada
              </label>

              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={form.publicada}
                  onChange={(e) => cambiar("publicada", e.target.checked)}
                  className="h-4 w-4 accent-red-700"
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
                    : "Crear noticia"}
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
            <h2 className="text-xl font-bold">Noticias registradas</h2>
            <button
              type="button"
              onClick={() => void cargarNoticias()}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold hover:bg-gray-50"
            >
              Actualizar lista
            </button>
          </div>

          {cargandoLista ? (
            <p className="py-8 text-gray-500">Cargando noticias...</p>
          ) : noticias.length === 0 ? (
            <p className="py-8 text-gray-500">
              Todavía no hay noticias registradas.
            </p>
          ) : (
            <div className="mt-5 divide-y divide-gray-200">
              {noticias.map((noticia) => (
                <article
                  key={noticia.id}
                  className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center"
                >
                  {noticia.imagen_url ? (
                    <img
                      src={noticia.imagen_url}
                      alt=""
                      className="h-24 w-full rounded-lg object-cover sm:w-36"
                    />
                  ) : (
                    <div className="flex h-24 w-full items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400 sm:w-36">
                      Sin imagen
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold">{noticia.titulo}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {noticia.categoria || "Institucional"}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          noticia.publicada
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {noticia.publicada ? "Publicada" : "Borrador"}
                      </span>
                      {noticia.destacada && (
                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-800">
                          Destacada
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => prepararEdicion(noticia)}
                      className="rounded-lg bg-[#A6192E] px-4 py-2 text-sm font-semibold text-white hover:bg-[#7F1424]"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => void eliminarNoticia(noticia)}
                      className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-800 hover:bg-red-50"
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

