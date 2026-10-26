import Link from "next/link";
import type { ReactNode } from "react";

type Variante = "primario" | "claro" | "fantasma" | "contorno" | "velo";
type Tamano = "sm" | "md";

const VARIANTES: Record<Variante, string> = {
  primario:
    "bg-primary text-white shadow-boton hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-boton-fuerte",
  claro:
    "bg-white text-primary shadow-sm hover:-translate-y-0.5 hover:bg-hueso-2",
  fantasma:
    "bg-white/10 text-white backdrop-blur-md hover:bg-white/20",
  contorno:
    "border border-white/30 text-white hover:border-white/60 hover:bg-white/10",
  velo: "bg-primary-soft-dim/20 text-white backdrop-blur-md hover:bg-primary-soft-dim/30",
};

const TAMANOS: Record<Tamano, string> = {
  sm: "px-space-md py-space-xs text-label-md",
  md: "px-space-lg py-space-sm text-body-md",
};

export default function Boton({
  href,
  variante = "primario",
  tamano = "md",
  className = "",
  children,
  type = "button",
  onClick,
  disabled,
  ariaLabel,
}: {
  href?: string;
  variante?: Variante;
  tamano?: Tamano;
  className?: string;
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
}) {
  const clases = `inline-flex items-center justify-center gap-space-xs rounded-full font-display font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${VARIANTES[variante]} ${TAMANOS[tamano]} ${className}`;

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={clases} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clases}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
