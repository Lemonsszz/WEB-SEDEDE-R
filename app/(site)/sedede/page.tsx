import HeroInstitucional from "@/components/sedede/HeroInstitucional";
import Pilares from "@/components/sedede/Pilares";
import Organigrama from "@/components/sedede/Organigrama";
import Complejos from "@/components/sedede/Complejos";
import Normativa from "@/components/sedede/Normativa";
import CtaVinculacion from "@/components/sedede/CtaVinculacion";

export default function SededePage() {
  return (
    <div className="min-h-screen bg-surface">
      <HeroInstitucional />

      <div data-reveal="">
        <Pilares />
      </div>

      <div data-reveal="">
        <Organigrama />
      </div>

      <div data-reveal="">
        <Complejos />
      </div>

      <div data-reveal="">
        <Normativa />
      </div>

      <div data-reveal="">
        <CtaVinculacion />
      </div>
    </div>
  );
}
