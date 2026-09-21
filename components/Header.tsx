export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#A6192E] text-white font-bold">
            S
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              SEDEDE
            </h1>
            <p className="text-xs text-gray-500">
              Servicio Departamental de Deportes
            </p>
          </div>
        </div>

        {/* Navegación */}
        <nav className="hidden items-center gap-7 md:flex">
          <a href="#inicio" className="text-sm font-medium text-[#A6192E]">
            Inicio
          </a>

          <a href="#" className="text-sm font-medium text-gray-600 hover:text-[#A6192E]">
            SEDEDE
          </a>

          <a href="#asociaciones" className="text-sm font-medium text-gray-600 hover:text-[#A6192E]">
            Asociaciones
          </a>

          <a href="#deportistas" className="text-sm font-medium text-gray-600 hover:text-[#A6192E]">
            Deportistas
          </a>

          <a href="#noticias" className="text-sm font-medium text-gray-600 hover:text-[#A6192E]">
            Noticias
          </a>

          <a href="#eventos" className="text-sm font-medium text-gray-600 hover:text-[#A6192E]">
            Eventos
          </a>
        </nav>

        {/* Contacto */}
        <button className="hidden rounded-lg bg-[#A6192E] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#7F1424] md:block">
          Contacto
        </button>

      </div>
    </header>
  );
}