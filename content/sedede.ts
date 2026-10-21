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
    "Fomentar, articular y garantizar la práctica del deporte formativo, recreativo y de alto rendimiento en todo el departamento de Oruro, gestionando eficientemente la infraestructura pública y fortaleciendo a nuestras asociaciones de base.",
  fundamento: "Art. 104 Constitución Política del Estado",
};

export const vision = {
  titulo: "Visión Institucional",
  texto:
    "Ser reconocidos como el motor del deporte orureño y referente nacional en formación básica, infraestructura y alto rendimiento, con atletas de élite que representen al departamento en cada competencia.",
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
    titulo: "Identidad Oruroña",
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
    valor: "12",
    label: "Complejos",
    detalle: "Escenarios de alto rendimiento",
    icono: "stadium",
  },
  {
    valor: "+4,5K",
    label: "Atletas RUDA",
    detalle: "Registrados y monitoreados",
    icono: "sprint",
  },
  {
    valor: "75",
    label: "Años",
    detalle: "De fomento ininterrumpido",
    icono: "medalla",
  },
];

export const sede = {
  direccion: "Estadio Departamental, Tribuna Preferencia, Puerta 4",
  ciudad: "Oruro, Bolivia",
  telefono: "+591 (4) 425-6700",
  horario: "Lunes a viernes: 08:00 - 16:30",
  email: "contacto@sedede.gob.bo",
  provisional: true,
};

export const ruda = {
  etiqueta: "Programa de Alto Rendimiento",
  titulo: "¿Eres deportista federado de Oruro?",
  destacado: "Inscríbete en el RUDA 2026.",
  descripcion:
    "Accede a cobertura biomédica deportiva, nutrición especializada, pasajes competitivos y el programa departamental de becas para atletas destacados.",
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
    titulo: "Ley de Fomento Deportivo del Departamento",
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
