export type Deportista = {
  slug: string;
  nombre: string;
  disciplina: string;
  logro: string;
  bio: string;
  imagen: string;
  asociacionSlug: string;
};

export const deportistas: Deportista[] = [
  {
    slug: "maria-lopez",
    nombre: "María López",
    disciplina: "Atletismo",
    logro: "Campeona departamental 2026",
    bio: "Especialista en pruebas de fondo y medio fondo. Representó a Oruro en los últimos Juegos Nacionales y entrena en la pista del estadio departamental.",
    imagen:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=80",
    asociacionSlug: "atletismo",
  },
  {
    slug: "carlos-mendoza",
    nombre: "Carlos Mendoza",
    disciplina: "Natación",
    logro: "Medallista nacional",
    bio: "Nadador de estilo libre y mariposa, con varias medallas en campeonatos nacionales. Forma parte de la selección orureña de natación.",
    imagen:
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=80",
    asociacionSlug: "natacion",
  },
  {
    slug: "diego-fernandez",
    nombre: "Diego Fernández",
    disciplina: "Boxeo",
    logro: "Campeón departamental",
    bio: "Boxeador de peso welter con una destacada trayectoria amateur. Busca clasificar a competencias internacionales en los próximos años.",
    imagen:
      "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=1200&q=80",
    asociacionSlug: "boxeo",
  },
  {
    slug: "jeremy-carlos",
    nombre: "Jeremy Carlos",
    disciplina: "Natación",
    logro: "Medallista nacional",
    bio: "Nadador especializado en pruebas de velocidad. Integra el equipo de relevos de la selección departamental.",
    imagen:
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=80",
    asociacionSlug: "natacion",
  },
  {
    slug: "ana-quispe",
    nombre: "Ana Quispe",
    disciplina: "Voleibol",
    logro: "Seleccionada departamental",
    bio: "Armadora del equipo departamental de voleibol. Lidera el proyecto de formación de juveniles en clubes de la ciudad.",
    imagen:
      "https://images.unsplash.com/photo-1592656670411-92c94f6f3b47?auto=format&fit=crop&w=1200&q=80",
    asociacionSlug: "voleibol",
  },
  {
    slug: "luis-choque",
    nombre: "Luis Choque",
    disciplina: "Ciclismo",
    logro: "Ganador de la Vuelta a Oruro",
    bio: "Ciclista de ruta con experiencia en competencias nacionales. Destaca en las etapas de montaña del calendario boliviano.",
    imagen:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80",
    asociacionSlug: "ciclismo",
  },
  {
    slug: "valeria-ramirez",
    nombre: "Valeria Ramírez",
    disciplina: "Taekwondo",
    logro: "Subcampeona nacional",
    bio: "Competidora de taekwondo en la categoría de combate. Entrena en la escuela departamental y participa del circuito nacional.",
    imagen:
      "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1200&q=80",
    asociacionSlug: "taekwondo",
  },
  {
    slug: "pedro-condori",
    nombre: "Pedro Condori",
    disciplina: "Lucha",
    logro: "Medallista nacional",
    bio: "Luchador de estilo libre con varios podios nacionales. Es uno de los referentes del departamento en deportes de combate.",
    imagen:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80",
    asociacionSlug: "lucha",
  },
  {
    slug: "gabriela-mamani",
    nombre: "Gabriela Mamani",
    disciplina: "Básquetbol",
    logro: "MVP departamental",
    bio: "Base titular del equipo departamental femenino de básquetbol. Combina su carrera deportiva con el entrenamiento de categorías formativas.",
    imagen:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
    asociacionSlug: "basquetbol",
  },
  {
    slug: "rodrigo-vargas",
    nombre: "Rodrigo Vargas",
    disciplina: "Halterofilia",
    logro: "Récord departamental",
    bio: "Levantador de pesas en la categoría de 89 kg. Obtuvo el mejor registro departamental en arranque durante el último campeonato nacional.",
    imagen:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
    asociacionSlug: "halterofilia",
  },
  {
    slug: "camila-rojas",
    nombre: "Camila Rojas",
    disciplina: "Ajedrez",
    logro: "Maestra departamental",
    bio: "Jugadora de ajedrez con participación en torneos nacionales e internacionales. Promueve el ajedrez escolar en unidades educativas de Oruro.",
    imagen:
      "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1200&q=80",
    asociacionSlug: "ajedrez",
  },
  {
    slug: "sebastian-flores",
    nombre: "Sebastián Flores",
    disciplina: "Gimnasia",
    logro: "Campeón nacional juvenil",
    bio: "Gimnasta artístico con destacada participación en el campeonato nacional juvenil. Entrena en el centro de alto rendimiento departamental.",
    imagen:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
    asociacionSlug: "gimnasia",
  },
  {
    slug: "axel-colque",
    nombre: "Axel Colque",
    disciplina: "Fútbol",
    logro: "Medallista nacional",
    bio: "FUTBOLISTA PROFESIONALespecializado en pruebas de velocidad. Integra el equipo de relevos de la selección departamental.",
    imagen:
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=80",
    asociacionSlug: "futbol",
  },
];

export function getDeportistas(): Deportista[] {
  return deportistas;
}

export function getDeportistaBySlug(slug: string): Deportista | undefined {
  return deportistas.find((d) => d.slug === slug);
}

export function getDeportistasDestacados(cantidad: number): Deportista[] {
  return deportistas.slice(0, cantidad);
}
