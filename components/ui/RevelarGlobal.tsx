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
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          entrada.target.setAttribute("data-visible", "true");
          observador.unobserve(entrada.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
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
