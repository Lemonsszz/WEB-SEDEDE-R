"use client";

import { useEffect } from "react";

/**
 * Observa todos los elementos con `data-reveal` y los muestra con una
 * transición suave cuando entran en pantalla (fade-in on scroll).
 * Se monta una sola vez en el layout: cualquier bloque puede opting-in
 * añadiendo el atributo `data-reveal` (y opcionalmente `style.transitionDelay`).
 */
export default function RevelarGlobal() {
  useEffect(() => {
    const mostrar = (elemento: Element) =>
      elemento.setAttribute("data-visible", "true");

    // Navegadores sin IntersectionObserver: sin esto el contenido con
    // `data-reveal` se quedaría invisible para siempre (opacity 0).
    if (typeof IntersectionObserver === "undefined") {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach(mostrar);
      return;
    }

    // `threshold: 0` a propósito. Con un valor alto (antes 0.12) los bloques
    // más altos que la pantalla nunca lo alcanzaban: en el celular el listado
    // de asociaciones mide ~7000 px contra una pantalla de ~700 px, así que la
    // proporción visible jamás llegaba al 12 % y el listado se quedaba en
    // opacity 0 (solo se veía el banner). Basta con que asome un píxel.
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          mostrar(entrada.target);
          observador.unobserve(entrada.target);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -6% 0px" }
    );

    const observar = (raiz: ParentNode) => {
      raiz
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((elemento) => {
          if (elemento.getAttribute("data-visible") === "true") return;
          observador.observe(elemento);
        });
    };

    observar(document);

    const mutador = new MutationObserver((cambios) => {
      for (const cambio of cambios) {
        cambio.addedNodes.forEach((nodo) => {
          if (!(nodo instanceof HTMLElement)) return;
          if (nodo.matches("[data-reveal]")) {
            observador.observe(nodo);
          }
          observar(nodo);
        });
      }
    });

    mutador.observe(document.body, { childList: true, subtree: true });

    return () => {
      observador.disconnect();
      mutador.disconnect();
    };
  }, []);

  return null;
}
