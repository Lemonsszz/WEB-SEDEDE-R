export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-10 md:grid-cols-4">

          {/* Institución */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#A6192E] font-bold">
                S
              </div>

              <div>
                <h2 className="text-xl font-bold">SEDEDE</h2>
                <p className="text-xs text-gray-400">
                  Servicio Departamental de Deportes
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-md text-sm leading-7 text-gray-400">
              Información oficial, actividades, asociaciones y noticias
              del deporte departamental.
            </p>
          </div>

          {/* Enlaces */}
          <div>
            <h3 className="font-semibold">Enlaces</h3>

            <div className="mt-5 space-y-3 text-sm text-gray-400">
              <a href="#" className="block hover:text-white">Inicio</a>
              <a href="#" className="block hover:text-white">SEDEDE</a>
              <a href="#" className="block hover:text-white">Asociaciones</a>
              <a href="#" className="block hover:text-white">Noticias</a>
              <a href="#" className="block hover:text-white">Eventos</a>
            </div>
          </div>

          {/* Información */}
          <div>
            <h3 className="font-semibold">Información</h3>

            <div className="mt-5 space-y-3 text-sm text-gray-400">
              <p> Oruro, Bolivia</p>
              <p> +591 2 XXX XXXX</p>
              <p> contacto@sedede.gob.bo</p>
            </div>
          </div>

        </div>

        {/* Línea inferior */}
        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          © 2026 SEDEDE. Todos los derechos reservados.
        </div>

      </div>
    </footer>
  );
}