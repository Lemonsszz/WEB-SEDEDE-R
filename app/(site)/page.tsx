import Noticias from "@/components/Noticias";
import Separador from "@/components/Separador";
import Hero from "@/components/Hero";
import Asociaciones from "@/components/Asociaciones";
import Deportistas from "@/components/Deportistas";

export default function Home() {
  return (
    <>
      <Noticias />

      <Separador />

      <div data-reveal="">
        <Hero />
      </div>

      <div data-reveal="">
        <Asociaciones />
      </div>

      <div data-reveal="">
        <Deportistas />
      </div>
    </>
  );
}
