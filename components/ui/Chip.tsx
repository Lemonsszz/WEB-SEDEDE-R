import Link from "next/link";
import type { ReactNode } from "react";

type Tono = "oscuro" | "claro";

const TONOS: Record<Tono, { activo: string; inactivo: string }> = {
  oscuro: {
    activo: "bg-primary text-white",
    inactivo: "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white",
  },
  claro: {
    activo: "bg-primary text-white shadow-sm",
    inactivo:
      "bg-white text-tinta-2 ring-1 ring-hueso-5 hover:bg-hueso-2 hover:text-tinta",
  },
};

/** Chip de filtro o de etiqueta navegable. Por defecto, para fondos oscuros. */
export default function Chip({
  children,
  activo = false,
  href,
  onClick,
  tono = "oscuro",
  className = "",
}: {
  children: ReactNode;
  activo?: boolean;
  href?: string;
  onClick?: () => void;
  tono?: Tono;
  className?: string;
}) {
  const clases = `inline-flex items-center rounded-full px-space-md py-1.5 font-display text-label-sm uppercase tracking-wider transition-colors ${
    activo ? TONOS[tono].activo : TONOS[tono].inactivo
  } ${className}`;

  if (href) {
    return (
      <Link href={href} className={clases}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={clases}>
      {children}
    </button>
  );
}
