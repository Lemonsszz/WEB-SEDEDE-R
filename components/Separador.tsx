export default function Separador() {
  return (
    <div className="bg-[#F7F3EA] py-9" aria-hidden="true">
      <div className="mx-auto flex max-w-7xl items-center gap-5 px-6">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#101318]/25 to-[#101318]/25" />
        <span className="h-2 w-2 rotate-45 bg-[#A6192E] shadow-[0_0_12px_rgba(166,25,46,0.45)]" />
        <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#101318]/25 to-[#101318]/25" />
      </div>
    </div>
  );
}
