import type { ReactNode } from "react";

type Tono = "rosa" | "primario" | "dorado" | "claro" | "tinta";

const TONOS: Record<Tono, string> = {
  rosa: "text-rosa",
  primario: "text-primary",
  dorado: "text-gold-soft",
  claro: "text-white/70",
  tinta: "text-tinta-2",
};

/** Antetítulo en mayúsculas que precede a los títulos de sección. */
export default function Kicker({
  children,
  tono = "rosa",
  className = "",
}: {
  children: ReactNode;
  tono?: Tono;
  className?: string;
}) {
  return (
    <span
      className={`font-display text-kicker uppercase tracking-[0.2em] ${TONOS[tono]} ${className}`}
    >
      {children}
    </span>
  );
}
