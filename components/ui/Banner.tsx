import Kicker from "@/components/ui/Kicker";

function idPatron(texto: string) {
  return `banner-grid-${texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`;
}

export default function Banner({
  kicker,
  titulo,
  descripcion,
  claseTitulo = "text-headline-lg lg:text-display-hero",
}: {
  kicker: string;
  titulo: string;
  descripcion?: string;
  claseTitulo?: string;
}) {
  const patron = idPatron(`${kicker}-${titulo}`);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-primary-dark to-primary text-white">
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
      >
        <defs>
          <pattern
            id={patron}
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="white"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patron})`} />
      </svg>

      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold-soft/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-rosa/20 blur-3xl" />

      <div className="relative mx-auto flex max-w-contenido flex-col gap-space-xs px-margin py-space-lg lg:py-space-xl">
        <Kicker tono="dorado">{kicker}</Kicker>
        <h1
          className={`text-balance break-words font-display uppercase leading-[1.05] tracking-tight text-white ${claseTitulo}`}
        >
          {titulo}
        </h1>
        {descripcion ? (
          <p className="mt-space-md max-w-2xl text-body-lg leading-relaxed text-primary-soft">
            {descripcion}
          </p>
        ) : null}
      </div>
    </section>
  );
}
