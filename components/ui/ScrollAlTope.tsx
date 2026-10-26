"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Devuelve la vista al tope al cambiar de página.
 *
 * Next 16 cambió el comportamiento al navegar: mantiene la posición del scroll
 * si el comienzo de la página nueva ya cae dentro del viewport (y con
 * `scroll-behavior: smooth` el salto podía quedar a medio camino). El atributo
 * `data-scroll-behavior="smooth"` del `<html>` resuelve el caso general; este
 * componente es la garantía de que, al saltar de tab en tab, siempre se entra
 * en el tope exacto de la página nueva.
 *
 * - Se salta con `behavior: "instant"` porque `globals.css` define
 *   `scroll-behavior: smooth` y, si no, el salto se animaría desde el fondo.
 * - No actúa en la primera carga para no romper la restauración del navegador
 *   ni los enlaces con `#ancla`.
 */
export default function ScrollAlTope() {
  const pathname = usePathname();
  const primeraCarga = useRef(true);

  useEffect(() => {
    if (primeraCarga.current) {
      primeraCarga.current = false;
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
