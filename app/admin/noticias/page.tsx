
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  API_URL as API,
  expirarSesion,
  mensajeDeError,
  obtenerToken,
} from "@/lib/admin";
import { formatearPeso, prepararImagen } from "@/lib/imagenes";

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

/**
 * Borrador del formulario en `sessionStorage`.
 *
 * En el celular el navegador puede descartar la pestaña al abrir la cámara (o
 * al cambiar de aplicación) y, al volver, recarga la página: sin esto se
 * pierde todo lo escrito. `sessionStorage` sobrevive a esa recarga y se borra
 * solo al cerrar la pestaña o al guardar la noticia.
 */
const CLAVE_BORRADOR = "sedede_borrador_noticia";

function leerBorrador(): Partial<typeof formularioInicial> | null {
  try {
    const guardado = window.sessionStorage.getItem(CLAVE_BORRADOR);
    return guardado ? JSON.parse(guardado) : null;
  } catch {
    return null;
  }
}

function borrarBorrador() {
  try {
    window.sessionStorage.removeItem(CLAVE_BORRADOR);
  } catch {
    // Sin sessionStorage (modo privado estricto): no es un error.
  }
}

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
  const [procesandoImagen, setProcesandoImagen] = useState(false);
  const [avisoImagen, setAvisoImagen] = useState("");
  const primerRender = useRef(true);

  const cargarNoticias = useCallback(() => {
    const token = obtenerToken();

    if (!token) {
      router.replace("/login");
      return Promise.resolve();
    }

    return fetch(`${API}/admin/noticias`, {
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
            datos.message || "No se pudieron cargar las noticias."
          );
        }

        setNoticias(datos.data);
      })
      .catch((error: unknown) => {
        setMensaje(
          error instanceof Error
            ? error.message
            : "No se pudieron cargar las noticias."
        );
      })
      .finally(() => {
        setCargandoLista(false);
      });
  }, [router]);

  useEffect(() => {
    void cargarNoticias();
  }, [cargarNoticias]);

  // Restaura el borrador tras una recarga del navegador (en el celular pasa al
  // abrir la cámara o al cambiar de aplicación). Se hace en un efecto y no en
  // el `useState` inicial para no romper la hidratación de React: el servidor
  // no tiene `sessionStorage` y renderizaría un formulario distinto al cliente.
  // Es la excepción que la regla `set-state-in-effect` contempla: un único
  // setState de arranque, no un bucle de renders.
  useEffect(() => {
    const borrador = leerBorrador();
    if (borrador) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm((actual) => ({ ...actual, ...borrador }));
    }
  }, []);

  // Guarda el borrador en cada cambio, salvo al editar una noticia existente
  // (ese texto ya está en la base de datos).
  useEffect(() => {
    if (primerRender.current) {
      primerRender.current = false;
      return;
    }

    if (editando !== null) return;

    const sinCambios =
      JSON.stringify(form) === JSON.stringify(formularioInicial);

    if (sinCambios) {
      borrarBorrador();
      return;
    }

    try {
      window.sessionStorage.setItem(CLAVE_BORRADOR, JSON.stringify(form));
    } catch {
      // Cuota llena o modo privado estricto: se ignora.
    }
  }, [form, editando]);

  function refrescarLista() {
    setCargandoLista(true);
    return cargarNoticias();
  }

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
    if (vistaPrevia) URL.revokeObjectURL(vistaPrevia);
    setVistaPrevia("");
    setAvisoImagen("");
    setMensaje("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelarEdicion() {
    setEditando(null);
    setForm({ ...formularioInicial });
    setImagenLocal(null);
    if (vistaPrevia) URL.revokeObjectURL(vistaPrevia);
    setVistaPrevia("");
    setAvisoImagen("");
    setMensaje("");
    borrarBorrador();
  }

  async function elegirImagen(evento: React.ChangeEvent<HTMLInputElement>) {
    const archivo = evento.target.files?.[0] ?? null;

    if (vistaPrevia) URL.revokeObjectURL(vistaPrevia);
    setVistaPrevia("");
    setImagenLocal(null);
    setAvisoImagen("");

    if (!archivo) return;

    setProcesandoImagen(true);

    try {
      const preparada = await prepararImagen(archivo);

      setImagenLocal(preparada.archivo);
      setVistaPrevia(URL.createObjectURL(preparada.archivo));

      // El servidor solo acepta JPG, PNG y WebP. Un HEIC de iPhone suele
      // llegar ya convertido a JPG; si no, conviene avisar acá y no después
      // de esperar la subida.
      if (!/^image\/(jpeg|png|webp)$/.test(preparada.archivo.type)) {
        setAvisoImagen(
          "Ese formato no se puede subir. Usa una foto JPG, PNG o WebP."
        );
        return;
      }

      setAvisoImagen(
        preparada.optimizada
          ? `Foto optimizada de ${formatearPeso(
              preparada.pesoOriginal
            )} a ${formatearPeso(preparada.pesoFinal)}.`
          : `${formatearPeso(preparada.pesoFinal)}: se sube tal cual.`
      );
    } catch {
      setAvisoImagen("No se pudo preparar la imagen. Prueba con otra foto.");
    } finally {
      setProcesandoImagen(false);
    }
  }

  async function guardarNoticia(e: React.FormEvent<HTMLFormElement>) {
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
      formData.append("resumen", form.resumen);
      formData.append("contenido", form.contenido);
      formData.append("categoria", form.categoria);
      formData.append("destacada", form.destacada ? "1" : "0");
      formData.append("publicada", form.publicada ? "1" : "0");

      if (imagenLocal) {
        const subida = await fetch(`${API}/admin/noticias/subir-imagen`, {
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
        });

        if (subida.status === 401 || subida.status === 403) {
          expirarSesion(router);
          return;
        }

        // Un 413 (cuerpo demasiado grande) llega como HTML, no como JSON: sin
        // esto el panel mostraría "Unexpected token '<'".
        const resultado = await subida.json().catch(() => null);

        if (subida.status === 413) {
          throw new Error(
            "La foto es demasiado grande para el servidor. Prueba con una más liviana."
          );
        }

        if (!subida.ok || !resultado?.success) {
          throw new Error(
            resultado?.message ??
              `Error al subir la imagen (HTTP ${subida.status}).`
          );
        }

        formData.append("imagen_url", resultado.url);
      } else {
        formData.append("imagen_url", form.imagenUrl);
      }

      const url = editando
        ? `${API}/admin/noticias/${editando}`
        : `${API}/admin/noticias`;

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
        setMensaje(mensajeDeError(datos, "No se pudo guardar la noticia."));
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
      if (vistaPrevia) URL.revokeObjectURL(vistaPrevia);
      setVistaPrevia("");
      setAvisoImagen("");
      borrarBorrador();
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

  async function eliminarNoticia(noticia: Noticia) {
    if (
      !window.confirm(
        `¿Seguro que deseas eliminar "${noticia.titulo}"? Esta acción no se puede deshacer.`
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
        `${API}/admin/noticias/${noticia.id}`,
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
          mensajeDeError(datos, "No se pudo eliminar la noticia.")
        );
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
          <h1 className="mt-2 font-display text-headline-md font-extrabold">Gestión de noticias</h1>
          <p className="mt-2 text-sm text-white/90">
            Crea, edita y administra las noticias institucionales.
          </p>
        </header>

        <section className="mb-8 rounded-2xl bg-white p-5 shadow-tarjeta sm:p-8">
          <h2 className="font-display text-headline-sm font-bold">
            {editando ? "Editar noticia" : "Crear noticia"}
          </h2>

          <form onSubmit={guardarNoticia} className="mt-6 space-y-5">
            <div>
              <label
                htmlFor="noticia-titulo"
                className="mb-2 block font-display text-label-sm font-semibold uppercase tracking-wider text-tinta-2"
              >
                Título
              </label>
              <input
                id="noticia-titulo"
                required
                maxLength={255}
                value={form.titulo}
                onChange={(e) => cambiar("titulo", e.target.value)}
                className="w-full rounded-lg border border-hueso-4 px-4 py-3 outline-none focus:border-primary"
                placeholder="Título de la noticia"
              />
            </div>

            <div>
              <label
                htmlFor="noticia-resumen"
                className="mb-2 block font-display text-label-sm font-semibold uppercase tracking-wider text-tinta-2"
              >
                Resumen
              </label>
              <textarea
                id="noticia-resumen"
                required
                rows={3}
                value={form.resumen}
                onChange={(e) => cambiar("resumen", e.target.value)}
                className="w-full rounded-lg border border-hueso-4 px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label
                htmlFor="noticia-contenido"
                className="mb-2 block font-display text-label-sm font-semibold uppercase tracking-wider text-tinta-2"
              >
                Contenido completo
              </label>
              <textarea
                id="noticia-contenido"
                required
                rows={7}
                value={form.contenido}
                onChange={(e) => cambiar("contenido", e.target.value)}
                className="w-full rounded-lg border border-hueso-4 px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label
                htmlFor="noticia-categoria"
                className="mb-2 block font-display text-label-sm font-semibold uppercase tracking-wider text-tinta-2"
              >
                Categoría
              </label>
              <select
                id="noticia-categoria"
                value={form.categoria}
                onChange={(e) => cambiar("categoria", e.target.value)}
                className="w-full rounded-lg border border-hueso-4 bg-white px-4 py-3"
              >
                <option>Institucional</option>
                <option>Deportivo</option>
                <option>Campeonatos</option>
                <option>Apoyo a deportistas</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="noticia-imagen-url"
                className="mb-2 block font-display text-label-sm font-semibold uppercase tracking-wider text-tinta-2"
              >
                Fotografía de la noticia
              </label>

              <input
                id="noticia-imagen-url"
                type="url"
                value={form.imagenUrl}
                onChange={(e) => cambiar("imagenUrl", e.target.value)}
                placeholder="O pega una URL de imagen"
                className="mb-3 w-full rounded-lg border border-hueso-4 px-4 py-3"
              />

              <input
                id="noticia-imagen-archivo"
                type="file"
                accept="image/*"
                aria-label="Subir fotografía desde la galería o la cámara"
                onChange={elegirImagen}
                disabled={procesandoImagen}
                className="w-full rounded-lg border border-hueso-4 p-3"
              />

              {procesandoImagen && (
                <p className="mt-1 text-xs text-tinta-3">
                  Preparando la imagen…
                </p>
              )}

              {avisoImagen && !procesandoImagen && (
                <p className="mt-1 text-xs text-tinta-2">{avisoImagen}</p>
              )}

              {(vistaPrevia || form.imagenUrl) && (
                <img
                  src={vistaPrevia || form.imagenUrl}
                  alt="Vista previa"
                  className="mt-3 h-48 w-full rounded-lg object-cover"
                />
              )}

              <p className="mt-1 text-xs text-tinta-3">
                JPG, PNG o WebP. La foto se reduce sola antes de subirla, así
                que también sirve una sacada con el celular. Si eliges una foto
                local, reemplazará la URL anterior.
              </p>
            </div>

            <div className="space-y-3 rounded-lg bg-hueso-2 p-4">
              <label
                htmlFor="noticia-destacada"
                className="flex items-center gap-3 text-sm"
              >
                <input
                  id="noticia-destacada"
                  type="checkbox"
                  checked={form.destacada}
                  onChange={(e) => cambiar("destacada", e.target.checked)}
                  className="h-4 w-4 accent-primary"
                />
                Mostrar como noticia destacada
              </label>

              <label
                htmlFor="noticia-publicada"
                className="flex items-center gap-3 text-sm"
              >
                <input
                  id="noticia-publicada"
                  type="checkbox"
                  checked={form.publicada}
                  onChange={(e) => cambiar("publicada", e.target.checked)}
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
                disabled={cargando || procesandoImagen}
                className="rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-dark disabled:opacity-50"
              >
                {procesandoImagen
                  ? "Preparando imagen..."
                  : cargando
                    ? "Guardando..."
                    : editando
                      ? "Guardar cambios"
                      : "Crear noticia"}
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
            <h2 className="font-display text-headline-sm font-bold">Noticias registradas</h2>
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
            <p className="py-8 text-tinta-3">Cargando noticias...</p>
          ) : noticias.length === 0 ? (
            <p className="py-8 text-tinta-3">
              Todavía no hay noticias registradas.
            </p>
          ) : (
            <div className="mt-5 divide-y divide-hueso-5">
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
                    <div className="flex h-24 w-full items-center justify-center rounded-lg bg-hueso-2 text-sm text-tinta-3 sm:w-36">
                      Sin imagen
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold">{noticia.titulo}</h3>
                    <p className="mt-1 text-sm text-tinta-3">
                      {noticia.categoria || "Institucional"}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          noticia.publicada
                            ? "bg-exito-suave text-exito"
                            : "bg-hueso-2 text-tinta-2"
                        }`}
                      >
                        {noticia.publicada ? "Publicada" : "Borrador"}
                      </span>
                      {noticia.destacada && (
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                          Destacada
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => prepararEdicion(noticia)}
                      className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => void eliminarNoticia(noticia)}
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

