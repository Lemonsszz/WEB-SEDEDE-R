import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Noticias from "@/components/Noticias";
import Separador from "@/components/Separador";
import Asociaciones from "@/components/Asociaciones";
import Deportistas from "@/components/Deportistas";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section id="noticias">
        <Noticias />
      </section>
      <Separador />
      <section id="inicio">
        <Hero />
      </section>
      <section id="asociaciones">
        <Asociaciones />
      </section>
      <section id="deportistas">
        <Deportistas />
      </section>
      <section id="contacto" />
      <Footer />
    </main>
  );
}
