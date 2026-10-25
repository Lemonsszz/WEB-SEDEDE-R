/**
 * Ficha de Héctor Garibay Flores.
 *
 * Es el único deportista real del sitio (el resto de `content/deportistas.ts`
 * son datos de muestra). La estructura viene del mockup `hector.html` que
 * entregó el usuario; los datos personales que el mockup inventaba (estatura,
 * peso, número de federado, ranking sudamericano) se omitieron o se
 * reemplazaron por marcas verificables.
 *
 * Los campos marcados como provisionales deben confirmarse con la institución
 * antes de quitar `notaProvisional` de la página.
 */

export type MarcaHector = {
  /** Chip corto: 42K, 21K, 10K. */
  distancia: string;
  /** Nombre de la prueba con la distancia exacta. */
  prueba: string;
  tiempo: string;
  evento: string;
  sede: string;
  anio: string;
  distincion: string;
  /** `true` para el récord nacional: se pinta con el acento dorado. */
  record?: boolean;
};

export type FichaHector = {
  slug: string;
  nombre: string;
  nombreCorto: string;
  apellidoDestacado: string;
  disciplina: string;
  pruebaPrincipal: string;
  origen: string;
  imagen: string;
  programa: string;
  contexto: string;
  altitud: string;
  resumen: string;
  presentacion: string;
  etiquetas: string[];
  metricas: Array<{ valor: string; etiqueta: string }>;
  record: { tiempo: string; prueba: string; descripcion: string };
  proximoDesafio: { titulo: string; detalle: string };
  beca: { titulo: string; detalle: string };
  marcas: MarcaHector[];
  biografia: string[];
  cita: string;
  notaProvisional: string;
};

export const hectorGaribay: FichaHector = {
  slug: "hector-garibay",
  nombre: "Héctor Garibay Flores",
  nombreCorto: "Héctor Garibay",
  apellidoDestacado: "Flores",
  disciplina: "Maratón",
  pruebaPrincipal: "Maratón olímpica 42.195 km",
  origen: "Totoral, Oruro",
  imagen: "/img/deportistas/hector-garibay.png",
  programa: "Programa de Alto Rendimiento Departamental 2026",
  contexto: "Ciclo olímpico y ODESUR 2026",
  altitud: "Oruro, 3.735 m.s.n.m.",
  resumen:
    "Campeón del Maratón Internacional de la Ciudad de México con récord histórico de circuito y poseedor de la mejor marca boliviana de todos los tiempos en los 42K (Sevilla 2023).",
  presentacion:
    "Ficha oficial de marcas homologadas por World Athletics y seguimiento técnico del máximo fondista boliviano. Orgullo de Totoral y embajador deportivo del Departamento de Oruro.",
  etiquetas: ["Maratón 42.195K", "Medio maratón 21K", "Fondismo boliviano"],
  metricas: [
    { valor: "2:07:44", etiqueta: "Récord nacional 42K" },
    { valor: "1:03:29", etiqueta: "Mejor marca 21K" },
    { valor: "02", etiqueta: "Oros internacionales 2024" },
    { valor: "3.735", etiqueta: "Altitud de Oruro (m)" },
  ],
  record: {
    tiempo: "2:07:44",
    prueba: "42.195 km · Maratón",
    descripcion:
      "Establecido en el Maratón de Sevilla 2023. Primera marca olímpica directa A en la historia del fondo boliviano y una de las mejores de Sudamérica.",
  },
  proximoDesafio: {
    titulo: "Maratón internacional",
    detalle: "Ciclo olímpico y ODESUR 2026",
  },
  beca: {
    titulo: "Élite Oro Plus",
    detalle: "Beca alimentaria, viajes y equipo",
  },
  marcas: [
    {
      distancia: "42K",
      prueba: "Maratón (42.195 km)",
      tiempo: "2:07:44",
      evento: "Maratón de Sevilla",
      sede: "Sevilla, España",
      anio: "2023",
      distincion: "Récord nacional de Bolivia",
      record: true,
    },
    {
      distancia: "42K",
      prueba: "Maratón (42.195 km)",
      tiempo: "2:08:23",
      evento: "Maratón de la Ciudad de México",
      sede: "CDMX, México (2.240 m.s.n.m.)",
      anio: "2023",
      distincion: "Récord histórico de circuito",
    },
    {
      distancia: "21K",
      prueba: "Medio maratón (21.097 km)",
      tiempo: "1:03:29",
      evento: "Meia Maratona do Rio",
      sede: "Río de Janeiro, Brasil",
      anio: "2024",
      distincion: "Medalla de oro",
    },
    {
      distancia: "10K",
      prueba: "10K en ruta",
      tiempo: "29:27",
      evento: "10K San Isidro",
      sede: "Buenos Aires, Argentina",
      anio: "2024",
      distincion: "Medalla de oro",
    },
  ],
  biografia: [
    "Nacido el 9 de julio de 1988 en Totoral, centro minero de Oruro, Héctor Garibay Flores forjó su tenacidad en condiciones geográficas de extrema exigencia. Sin infraestructura inicial de lujo, pero con la fortaleza pulmonar que confiere el altiplano andino a más de 3.700 metros de altitud, se convirtió en el referente absoluto del atletismo boliviano contemporáneo.",
    "Su planificación de entrenamiento en los arenales de Cochiraya y las rutas del altiplano orureño asombró a fisiólogos del deporte de todo el continente, consolidando una adaptación natural a la altura que le permite competir al más alto nivel en las capitales del mundo.",
  ],
  cita:
    "En Oruro aprendí que la falta de oxígeno en las montañas se transforma en coraje y velocidad cuando bajas a competir al nivel del mar.",
  /** Se muestra en pequeño al pie de la ficha. Quitar cuando la institución confirme los datos. */
  notaProvisional:
    "Ficha en revisión: las marcas y los datos de carrera se están confirmando con la Dirección Departamental de Deportes.",
};
