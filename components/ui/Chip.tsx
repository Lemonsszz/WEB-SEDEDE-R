import Link from "next/link";
import type { ReactNode } from "react";

/** Chip de filtro o de etiqueta navegable. */
export default function Chip({
  children,
  activo = false,
  href,
  onClick,
  className = "",
}: {
  children: ReactNode;
  activo?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const clases = `inline-flex items-center rounded-full px-space-md py-1.5 font-display text-label-sm uppercase tracking-wider transition-colors ${
    activo
      ? "bg-primary text-white"
      : "bg-white/5 text-tinta-3 hover:bg-white/10 hover:text-white"
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
