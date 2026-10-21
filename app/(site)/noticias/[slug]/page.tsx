import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { getNoticia, formatearFecha } from "@/lib/api";
import Badge from "@/components/ui/Badge";

export default async function DetalleNoticia({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const noticia = await getNoticia(slug).catch(() => notFound());

  return (
    <div className="min-h-screen bg-hueso">
      <article className="mx-auto flex max-w-3xl flex-col gap-space-md px-margin py-space-xl">
        <div className="flex flex-wrap items-center gap-4">
          <Badge tono="primario">{noticia.categoria || "Institucional"}</Badge>
          <span className="inline-flex items-center gap-1.5 font-display text-label-md text-tinta-2">
            <CalendarDays aria-hidden className="h-4 w-4 text-tinta-3" />
            {formatearFecha(noticia.fecha_publicacion)}
          </span>
        </div>

        <h1 className="font-display text-headline-xl font-black leading-tight tracking-tight text-tinta">
          {noticia.titulo}
        </h1>

        {noticia.resumen ? (
          <p className="border-l-4 border-primary pl-space-md font-body-lg font-medium leading-relaxed text-tinta">
            {noticia.resumen}
          </p>
        ) : null}

        {noticia.imagen_url ? (
          <Image
            src={noticia.imagen_url}
            alt={noticia.titulo}
            width={1600}
            height={1000}
            priority
            className="mt-space-sm h-auto max-h-[520px] w-full rounded-2xl object-cover shadow-tarjeta"
          />
        ) : null}

        {noticia.contenido ? (
          <div className="mt-space-sm whitespace-pre-line font-body-md leading-relaxed text-tinta-2">
            {noticia.contenido}
          </div>
        ) : null}

        <Link
          href="/noticias"
          className="inline-flex w-fit items-center gap-2 font-display text-label-md font-semibold text-primary transition-colors hover:text-primary-dark"
        >
          <ArrowLeft aria-hidden className="h-4 w-4" />
          Volver a noticias
        </Link>
      </article>
    </div>
  );
}
