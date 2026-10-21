import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Trophy } from "lucide-react";
import type { Deportista } from "@/content/deportistas";
import Badge from "@/components/ui/Badge";

export default function TarjetaDeportista({
  deportista,
}: {
  deportista: Deportista;
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-tarjeta transition-all duration-300 hover:-translate-y-1.5 hover:shadow-tarjeta-hover">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-hueso-3">
        <Image
          src={deportista.imagen}
          alt={deportista.nombre}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-space-sm top-space-sm">
          <Badge tono="dorado" icono={Trophy}>
            {deportista.logro}
          </Badge>
        </div>
        <div className="absolute bottom-space-sm right-space-sm">
          <span className="rounded-md bg-black/70 px-space-xs py-0.5 font-display text-label-sm font-semibold text-white backdrop-blur-sm">
            {deportista.disciplina}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-space-md p-space-md">
        <div>
          <span className="font-display text-label-sm font-bold uppercase tracking-wider text-primary">
            {deportista.disciplina}
          </span>
          <h3 className="mt-1 font-display text-headline-md font-black tracking-tight text-tinta transition-colors group-hover:text-primary">
            {deportista.nombre}
          </h3>
          <p className="mt-2 font-body-sm text-tinta-2">{deportista.bio}</p>
        </div>

        <div className="flex items-center justify-between border-t border-hueso-5 pt-space-sm">
          <div className="flex flex-col">
            <span className="font-display text-label-sm text-tinta-2">Logro</span>
            <span className="font-display text-headline-sm font-extrabold text-tinta">
              {deportista.logro}
            </span>
          </div>
          <Link
            href={`/deportistas/${deportista.slug}`}
            aria-label={`Ver perfil de ${deportista.nombre}`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-hueso-2 transition-colors hover:bg-primary hover:text-white"
          >
            <ArrowRight aria-hidden className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
