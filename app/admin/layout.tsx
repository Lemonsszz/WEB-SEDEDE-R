import type { Metadata } from "next";
import type { ReactNode } from "react";

/**
 * El panel de administración nunca debe aparecer en buscadores (además de estar
 * bloqueado en `robots.txt`, que no impide que una URL se indexe si alguien la
 * enlaza). Aquí solo se declara el `noindex`; el layout visible lo pone cada
 * página.
 */
export const metadata: Metadata = {
  title: "Panel de administración",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
