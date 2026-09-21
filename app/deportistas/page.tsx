import Header from "@/components/Header";
import Deportistas from "@/components/Deportistas";
import Footer from "@/components/Footer";

export default function DeportistasPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Deportistas />
      <Footer />
    </main>
  );
}