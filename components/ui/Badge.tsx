import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type Tono = "primario" | "dorado" | "rosa" | "vidrio" | "neutro";

const TONOS: Record<Tono, string> = {
  primario: "bg-primary text-white",
  dorado: "bg-gold text-gold-deep",
  rosa: "bg-primary-soft text-primary",
  vidrio: "bg-black/60 text-white backdrop-blur-md",
  neutro: "bg-hueso-3 text-tinta-2",
};

/** Etiqueta compacta: medallas, estados, categorías. */
export default function Badge({
  children,
  tono = "primario",
  icono: Icono,
  className = "",
}: {
  children: ReactNode;
  tono?: Tono;
  icono?: LucideIcon;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-space-sm py-1 font-display text-label-sm font-bold uppercase shadow-md ${TONOS[tono]} ${className}`}
    >
      {Icono ? <Icono aria-hidden className="h-3.5 w-3.5" /> : null}
      {children}
    </span>
  );
}
