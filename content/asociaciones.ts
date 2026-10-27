/**
 * Asociaciones deportivas departamentales de Oruro.
 *
 * La lista, los presidentes y los celulares son los que entregó la institución
 * el 2026-10-26 (planilla oficial). No inventar ni completar datos: si falta
 * algo, se deja vacío y se pregunta.
 *
 * `imagen` es opcional a propósito: mientras no lleguen las fotos reales, las
 * tarjetas y el detalle muestran un degradado institucional con la disciplina.
 * Al recibir la foto, guardarla en `public/img/asociaciones/<slug>.jpg` y
 * agregar el campo `imagen: "/img/asociaciones/<slug>.jpg"`.
 */
export type Asociacion = {
  slug: string;
  nombre: string;
  disciplina: string;
  descripcion: string;
  presidente: string;
  /** Celular de 8 dígitos, sin código de país ni espacios. */
  telefono: string;
  imagen?: string;
};

export const asociaciones: Asociacion[] = [
  {
    slug: "automovilismo",
    nombre: "Asociación Departamental de Automovilismo Oruro",
    disciplina: "Automovilismo",
    descripcion:
      "Reúne a los pilotos y clubes de automovilismo del departamento, organiza las fechas del calendario local y representa a Oruro en las competencias nacionales de la disciplina.",
    presidente: "Josué Roberto Vidal Blass",
    telefono: "71881177",
  },
  {
    slug: "badminton",
    nombre: "Asociación Departamental de Bádminton Oruro",
    disciplina: "Bádminton",
    descripcion:
      "Promueve el bádminton en Oruro, con escuelas de formación, torneos departamentales y deportistas en el circuito nacional.",
    presidente: "Juan Sixto Colque López",
    telefono: "71856669",
  },
  {
    slug: "bicicross",
    nombre: "Asociación Departamental de Bicicross Oruro",
    disciplina: "Bicicross",
    descripcion:
      "Organiza las competencias de bicicross en el departamento, forma pilotos desde las categorías infantiles y coordina su participación en los torneos nacionales.",
    presidente: "José Gonzalo Beltrán Buitrago",
    telefono: "73808988",
  },
  {
    slug: "ciclismo",
    nombre: "Asociación Departamental de Ciclismo Oruro",
    disciplina: "Ciclismo",
    descripcion:
      "Fomenta el ciclismo de ruta, montaña y pista en Oruro, con escuelas de formación, carreras departamentales y presencia en las pruebas nacionales.",
    presidente: "Mary Gladys Simón Hinojosa",
    telefono: "63642603",
  },
  {
    slug: "deporte-integrado",
    nombre: "Asociación Departamental del Deporte Integrado Oruro",
    disciplina: "Deporte Integrado",
    descripcion:
      "Promueve la práctica deportiva de las personas con discapacidad intelectual, coordina las escuelas de formación y las delegaciones que representan a Oruro.",
    presidente: "Roberto Carlos Auca Martínez",
    telefono: "72466479",
  },
  {
    slug: "deporte-para-ciegos",
    nombre: "Asociación Departamental de Deporte para Ciegos Oruro",
    disciplina: "Deporte para Ciegos",
    descripcion:
      "Trabaja con atletas con discapacidad visual en las disciplinas adaptadas, organiza competencias locales y acompaña a las selecciones departamentales.",
    presidente: "Ariel Espejo Colque",
    telefono: "73841588",
  },
  {
    slug: "futbol-de-salon",
    nombre: "Asociación Departamental de Fútbol de Salón Oruro",
    disciplina: "Fútbol de Salón",
    descripcion:
      "Regula el fútbol de salón en Oruro, una de las disciplinas con más participación en el departamento, con torneos barriales, juveniles y de mayores.",
    presidente: "Max Fuentes Vinaya",
    telefono: "71853076",
  },
  {
    slug: "fisicoculturismo",
    nombre:
      "Asociación Departamental de Fisicoculturismo, Potencia y Fitness Oruro",
    disciplina: "Fisicoculturismo, Potencia y Fitness",
    descripcion:
      "Agrupa a los atletas de fisicoculturismo, potencia y fitness del departamento, organiza campeonatos locales y prepara a los competidores para las citas nacionales.",
    presidente: "Roger Simón Cabrera Marca",
    telefono: "75949113",
  },
  {
    slug: "karate",
    nombre: "Asociación Departamental de Karate Do Oruro",
    disciplina: "Karate Do",
    descripcion:
      "Desarrolla el karate do en las modalidades de kata y kumite, con dojos afiliados en todo el departamento y participación en campeonatos nacionales.",
    presidente: "Marcelo Taborga Flores",
    telefono: "72339939",
  },
  {
    slug: "kung-fu-wushu",
    nombre:
      "Asociación Deportiva Departamental de Kung Fu - Wushu Orureña",
    disciplina: "Kung Fu - Wushu",
    descripcion:
      "Difunde las artes marciales chinas en Oruro, con escuelas de kung fu y wushu, exhibiciones y competencias departamentales y nacionales.",
    presidente: "Cintya Flores Espinoza",
    telefono: "65434877",
  },
  {
    slug: "motociclismo",
    nombre: "Asociación Departamental de Motociclismo Oruro",
    disciplina: "Motociclismo",
    descripcion:
      "Reúne a los pilotos y clubes de motociclismo del departamento, organiza las pruebas del calendario local y representa a Oruro en el ámbito nacional.",
    presidente: "Zulma Vásquez Franco",
    telefono: "72471411",
  },
  {
    slug: "pelota-de-mano",
    nombre:
      "Asociación Departamental de Pelota de Mano, Paleta y Raqueta Oruro",
    disciplina: "Pelota de Mano, Paleta y Raqueta",
    descripcion:
      "Promueve las modalidades de pelota vasca —mano, paleta y raqueta— en el departamento, con frontones activos y torneos departamentales.",
    presidente: "Iván Arturo Silez Guzmán",
    telefono: "62777742",
  },
  {
    slug: "raquetbol",
    nombre: "Asociación Departamental de Raquetbol Oruro",
    disciplina: "Raquetbol",
    descripcion:
      "Fomenta el raquetbol en Oruro, con canchas activas, torneos locales y jugadores que compiten en el circuito nacional.",
    presidente: "Richard Oxachoque Gutiérrez",
    telefono: "63654419",
  },
  {
    slug: "taekwondo",
    nombre: "Asociación Departamental World Taekwondo Oruro",
    disciplina: "World Taekwondo",
    descripcion:
      "Forma atletas de taekwondo en las modalidades de combate y poomsae, con escuelas afiliadas y participación en los torneos nacionales.",
    presidente: "Lizzeth Carmen Bolívar Pérez",
    telefono: "70425377",
  },
  {
    slug: "deportiva-administracion-publica",
    nombre: "Asociación Deportiva de la Administración Pública Oruro",
    disciplina: "Deporte de la Administración Pública",
    descripcion:
      "Agrupa a los servidores públicos que practican deporte, organiza los torneos internos de las instituciones y representa al sector en las citas departamentales.",
    presidente: "Óscar Arrelano Vargas",
    telefono: "70423308",
  },
  {
    slug: "tenis-de-mesa",
    nombre: "Asociación Departamental de Tenis de Mesa Oruro",
    disciplina: "Tenis de Mesa",
    descripcion:
      "Desarrolla el tenis de mesa en Oruro, con competencias escolares, universitarias y de alto rendimiento, y jugadores en el circuito nacional.",
    presidente: "Mirtha Alina Mérida Balderrama",
    telefono: "69570998",
  },
  {
    slug: "triatlon",
    nombre: "Asociación Departamental de Triatlón Oruro",
    disciplina: "Triatlón",
    descripcion:
      "Coordina el triatlón y las pruebas combinadas en el departamento, con entrenamientos en los escenarios locales y participación en competencias nacionales.",
    presidente: "Ever Christian Oxachoque Gutiérrez",
    telefono: "71880793",
  },
  {
    slug: "beisbol",
    nombre: "Asociación Departamental de Béisbol y Sóftbol Oruro",
    disciplina: "Béisbol y Sóftbol",
    descripcion:
      "Agrupa a los equipos de béisbol y sóftbol de Oruro, sostiene las ligas juveniles y femeninas y conforma las selecciones que compiten a nivel nacional.",
    presidente: "Mirtha Vásquez Fernández",
    telefono: "73833448",
  },
];

export function getAsociaciones(): Asociacion[] {
  return asociaciones;
}

export function getAsociacionBySlug(slug: string): Asociacion | undefined {
  return asociaciones.find((a) => a.slug === slug);
}

export function getAsociacionesDestacadas(cantidad: number): Asociacion[] {
  return asociaciones.slice(0, cantidad);
}

/** Celular con el código de país de Bolivia, para `tel:` y `wa.me`. */
export function telefonoConPais(telefono: string): string {
  return `591${telefono.replace(/\D/g, "")}`;
}

/** Celular en formato legible: `+591 71881177`. */
export function telefonoLegible(telefono: string): string {
  return `+591 ${telefono.replace(/\D/g, "")}`;
}

export type Familia = {
  slug: string;
  nombre: string;
  disciplinas: string[] | null;
};

/**
 * Familias de disciplinas usadas para filtrar el listado de asociaciones.
 * Cada disciplina de `asociaciones` debe estar en **una sola** familia; si
 * falta, la asociación desaparece al filtrar.
 */
export const familias: Familia[] = [
  { slug: "todas", nombre: "Todas", disciplinas: null },
  {
    slug: "balon-y-raqueta",
    nombre: "Balón y raqueta",
    disciplinas: [
      "Béisbol y Sóftbol",
      "Fútbol de Salón",
      "Pelota de Mano, Paleta y Raqueta",
      "Raquetbol",
      "Tenis de Mesa",
      "Bádminton",
    ],
  },
  {
    slug: "combate-y-artes-marciales",
    nombre: "Combate y artes marciales",
    disciplinas: ["Karate Do", "Kung Fu - Wushu", "World Taekwondo"],
  },
  {
    slug: "ruedas-y-resistencia",
    nombre: "Ruedas y resistencia",
    disciplinas: [
      "Automovilismo",
      "Bicicross",
      "Ciclismo",
      "Motociclismo",
      "Triatlón",
    ],
  },
  {
    slug: "fuerza-y-acondicionamiento",
    nombre: "Fuerza y acondicionamiento",
    disciplinas: ["Fisicoculturismo, Potencia y Fitness"],
  },
  {
    slug: "inclusivo-y-social",
    nombre: "Inclusivo y social",
    disciplinas: [
      "Deporte Integrado",
      "Deporte para Ciegos",
      "Deporte de la Administración Pública",
    ],
  },
];

export function getAsociacionesPorFamilia(slugFamilia: string): Asociacion[] {
  const familia = familias.find((f) => f.slug === slugFamilia);
  if (!familia || !familia.disciplinas) return asociaciones;
  return asociaciones.filter((a) => familia.disciplinas!.includes(a.disciplina));
}
