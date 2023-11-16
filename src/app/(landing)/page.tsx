import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import SectionMessage from "@/components/section-message";
import SectionPrograms from "@/components/section-programs";
import SectionAbout from "@/components/section-about";
import SectionContacts from "@/components/section-contacts";

export const metadata: Metadata = {
  title: "Mary Josette Academy | Home",
  description: "Official website of Mary Josette Academy",
};

export default function Home() {
  return (
    <>
      <header className="h-screen">
        <Navbar />
        <Hero />
      </header>
      <main className="z-20 mx-auto -mt-1 max-w-[1300px]">
        <SectionMessage />
        <SectionPrograms />
        <SectionAbout />
        <SectionContacts />
      </main>
    </>
  );
}
