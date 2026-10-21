export default function Separador() {
  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden bg-hueso py-6">
      <div className="mx-auto flex w-full max-w-contenido items-center justify-center px-margin">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-tinta-3/30 to-tinta-3/60" />
        <div className="relative mx-4 flex items-center justify-center">
          <div className="h-3 w-3 rotate-45 bg-primary shadow-[0_0_8px_rgba(155,11,36,0.4)]" />
          <div className="pointer-events-none absolute h-6 w-6 rotate-45 scale-125 border border-primary/20" />
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-tinta-3/30 to-tinta-3/60" />
      </div>
    </div>
  );
}
