import type { ReactNode } from "react";

export default function Contenedor({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-contenido px-margin ${className}`}>
      {children}
    </div>
  );
}
