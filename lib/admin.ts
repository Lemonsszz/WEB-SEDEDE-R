export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export function obtenerToken(): string | null {
  return sessionStorage.getItem("sedede_token");
}

type RouterLike = { replace: (url: string) => void };

export function expirarSesion(router: RouterLike) {
  sessionStorage.removeItem("sedede_token");
  router.replace("/login?motivo=sesion");
}

export function mensajeDeError(datos: unknown, porDefecto: string): string {
  if (datos && typeof datos === "object") {
    const conErrores = datos as {
      errors?: Record<string, string[]>;
      message?: string;
    };

    if (conErrores.errors) {
      return Object.values(conErrores.errors).flat().join(" ");
    }

    if (conErrores.message) {
      return conErrores.message;
    }
  }

  return porDefecto;
}
