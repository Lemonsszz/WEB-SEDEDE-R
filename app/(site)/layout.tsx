import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevelarGlobal from "@/components/ui/RevelarGlobal";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <RevelarGlobal />
      <Header />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </>
  );
}
