/**
 * DATOS INSTITUCIONALES PROVISIONALES.
 *
 * La institución aún no ha entregado la información oficial (misión, visión,
 * cifras, sede, complejos, datos de contacto). Este archivo centraliza
 * contenido de trabajo para poder presentar y maquetar la web.
 *
 * IMPORTANTE: antes de publicar en producción, reemplazar cada valor por la
 * información oficial y eliminar este aviso. Todo lo marcado con
 * `provisional: true` existe solo para la presentación.
 */

export type Metrica = {
  valor: string;
  label: string;
  detalle: string;
  icono: "diversity" | "stadium" | "sprint" | "medalla";
};

export type Valor = {
  titulo: string;
  descripcion: string;
};

export const institucion = {
  nombre: "SEDEDE",
  nombreCompleto: "Servicio Departamental de Deportes",
  entidad: "Gobierno Autónomo Departamental de Oruro",
  descripcion:
    "Entidad rectora del desarrollo deportivo, fomento de la actividad física, infraestructura de alto rendimiento y apoyo integral a atletas destacados.",
  descripcionLarga:
    "Somos la instancia departamental encargada de planificar, ejecutar y fortalecer el desarrollo deportivo en Oruro: desde el fomento de la actividad física comunitaria hasta la preparación de atletas de alto rendimiento.",
  provisional: true,
};

export const mision = {
  titulo: "Misión Institucional",
  texto:
    "Promover y facilitar la práctica del deporte y la actividad física en el Departamento de Oruro así mismo fomentar a través de un conjunto de actividades y procesos que garanticen el derecho a una formación integral apoyando al deporte: recreativo, formativo, competitivo y de alto rendimiento en las diferentes disciplinas deportivas.",
  fundamento: "Art. 104 Constitución Política del Estado",
};

export const vision = {
  titulo: "Visión Institucional",
  texto:
    "Ser una Institución eficiente y eficaz, con un alto compromiso social y humano orientado al desarrollo integral del deporte recreativo, formativo, competitivo y de alto rendimiento implementando acciones para la práctica deportiva de máximo rendimiento logrando altos niveles de competencia, para mejorar la participación en eventos de carácter local, nacional e internacional, así apoya y garantiza la participación en eventos deportivos.",
};

export const valores: Valor[] = [
  {
    titulo: "Excelencia Atlética",
    descripcion: "Superación constante y rigor técnico en cada disciplina.",
  },
  {
    titulo: "Equidad Deportiva",
    descripcion:
      "Oportunidad real para cada niño, joven y atleta del departamento.",
  },
  {
    titulo: "Transparencia Pública",
    descripcion: "Rendición de cuentas de cada recurso invertido.",
  },
  {
    titulo: "Identidad Orureña",
    descripcion: "Raíces culturales que impulsan la pasión deportiva.",
  },
];

export const metricas: Metrica[] = [
  {
    valor: "18",
    label: "Asociaciones",
    detalle: "Federadas con vigencia jurídica",
    icono: "diversity",
  },
  {
    valor: "+5",
    label: "Complejos",
    detalle: "Escenarios de alto rendimiento",
    icono: "stadium",
  },
  {
    valor: "+4,5K",
    label: "Atletas Inscritos",
    detalle: "Registrados y monitoreados",
    icono: "sprint",
  },
  {
    valor: "20",
    label: "Años",
    detalle: "De fomento ininterrumpido",
    icono: "medalla",
  },
];

export const sede = {
  direccion: "Palacio de los Deportes",
  ciudad: "Oruro, Bolivia",
  telefono: "+52 47568",
  horario: "Lunes a viernes: 08:30 - 16:30",
  email: "sededeoruro2026@gmail.com",
  provisional: true,
};

export const ruda = {
  etiqueta: "Programa de Inscripción de Deportistas",
  titulo: "¿Eres deportista en Oruro?",
  destacado: "Inscríbete a una Asociación en 2026.",
  descripcion:
    "Accede a cobertura, sé parte de competiciones y muchos otros beneficios.",
  ctaPrimario: { texto: "Iniciar registro de atleta", href: "/contacto" },
  ctaSecundario: { texto: "Descargar convocatoria", href: "/documentos" },
};

export const direccion = {
  cargo: "Dirección Departamental de Deportes",
  entidad: "Gobierno Autónomo Departamental de Oruro",
  descripcion:
    "Entidad rectora del desarrollo deportivo departamental, custodia de la infraestructura atlética histórica y promotora del talento competitivo de Oruro hacia los escenarios nacionales e internacionales.",
  etiquetas: ["Gestión departamental", "Alta competencia", "Medicina deportiva"],
  provisional: true,
};

export type Unidad = {
  titulo: string;
  descripcion: string;
  icono: "altoRendimiento" | "infraestructura" | "asociaciones" | "juridica";
};

export const unidades: Unidad[] = [
  {
    titulo: "Unidad de Alto Rendimiento",
    descripcion:
      "Monitoreo biomecánico, nutricional y técnico de seleccionados orureños rumbo a Juegos Plurinacionales y torneos federativos.",
    icono: "altoRendimiento",
  },
  {
    titulo: "Infraestructura y Mantenimiento",
    descripcion:
      "Supervisión de césped natural, sistemas de iluminación LED, calderas para natación y mantenimiento correctivo de coliseos.",
    icono: "infraestructura",
  },
  {
    titulo: "Asociaciones y Fomento",
    descripcion:
      "Asistencia para la personería jurídica de asociaciones departamentales, asignación horaria de escenarios y gestión de pasajes de delegación.",
    icono: "asociaciones",
  },
  {
    titulo: "Unidad Jurídica y Convenios",
    descripcion:
      "Fiscalización reglamentaria, formalización de comodatos y convenios de cooperación interinstitucional con universidades e institutos.",
    icono: "juridica",
  },
];

export type Norma = {
  titulo: string;
  etiqueta: string;
  descripcion: string;
  tono: "primario" | "neutro" | "dorado";
  href: string;
};

export const normativa: Norma[] = [
  {
    titulo: "Ley de fomento Deportivo del Departamento",
    etiqueta: "Ley departamental",
    descripcion:
      "Establece el régimen de asignación de recursos, viajes a torneos nacionales y becas para deportistas de élite.",
    tono: "primario",
    href: "/documentos",
  },
  {
    titulo: "Uso y alquiler de escenarios públicos",
    etiqueta: "Reglamento",
    descripcion:
      "Tabla de aranceles, exenciones para selecciones de base y protocolos de seguridad para eventos masivos.",
    tono: "neutro",
    href: "/documentos",
  },
  {
    titulo: "Memoria y rendición pública de cuentas",
    etiqueta: "Transparencia",
    descripcion:
      "Detalle presupuestario ejecutado en mantenimiento, adquisición de indumentaria y apoyo a torneos intermunicipales.",
    tono: "dorado",
    href: "/documentos",
  },
];

export type Complejo = {
  slug: string;
  nombre: string;
  etiqueta: string;
  descripcion: string;
  dato: string;
  datoLabel: string;
  disciplinas: string;
  imagen: string;
};

export const complejos: Complejo[] = [
  {
    slug: "estadio-jesus-bermudez",
    nombre: "Estadio Jesús Bermúdez",
    etiqueta: "Estadio principal",
    descripcion:
      "Césped natural de alto drenaje con luminarias para copas internacionales.",
    dato: "33.000 espectadores",
    datoLabel: "Capacidad",
    disciplinas: "Fútbol profesional / Atletismo",
    imagen: "/img/complejo-estadio.jpg",
  },
  {
    slug: "palacio-de-los-deportes",
    nombre: 'Palacio "Eduardo Leclere Polo"',
    etiqueta: "Coliseo cerrado",
    descripcion:
      "Piso flotante de madera de guayacán homologado para ligas nacionales de básquetbol y voleibol.",
    dato: "12.000 espectadores",
    datoLabel: "Capacidad",
    disciplinas: "Básquetbol / Voleibol / Futsal",
    imagen: "/img/complejo-palacio.jpg",
  },
  {
    slug: "pista-de-atletismo",
    nombre: "Pista Sintética de Atletismo",
    etiqueta: "Pista atlética",
    descripcion:
      "Recubrimiento sintético de 8 carriles con fosa de salto triple, colchoneta de pértiga y zona de lanzamiento.",
    dato: "Tartán Clase 1",
    datoLabel: "Superficie",
    disciplinas: "Velocidad / Fondo / Saltos",
    imagen: "/img/complejo-pista.jpg",
  },
  {
    slug: "piscina-capachos",
    nombre: "Piscina Olímpica Capachos",
    etiqueta: "Acuático",
    descripcion:
      "Vaso reglamentario de 50 m climatizado, apto para pruebas cronometradas de natación y polo acuático.",
    dato: "50 metros · 8 carriles",
    datoLabel: "Longitud",
    disciplinas: "Natación / Triatlón",
    imagen: "/img/complejo-piscina.jpg",
  },
];
