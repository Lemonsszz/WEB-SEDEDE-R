import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Comunicados from "@/components/Comunicados";
import Noticias from "@/components/Noticias";
import Asociaciones from "@/components/Asociaciones";
import Deportistas from "@/components/Deportistas";
import Eventos from "@/components/Eventos";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section id="inicio">
        <Hero />
      </section>

      <section id="comunicados">
        <Comunicados />
      </section>

      <section id="noticias">
        <Noticias />
      </section>

      <section id="asociaciones">
        <Asociaciones />
      </section>

      <section id="deportistas">
        <Deportistas />
      </section>

      <section id="eventos">
        <Eventos />
      </section>
      
      <section id="contacto" />
      <Footer />
    </main>
  );
}