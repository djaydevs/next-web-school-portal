import Navbar from "@/components/home/Navbar";
import { Metadata } from "next";
import SectionPrograms from "@/components/home/SectionPrograms";
import Hero from "@/components/home/Hero";
import SectionAbout from "@/components/home/SectionAbout";
import SectionContacts from "@/components/home/SectionContacts";
import SectionMessage from "@/components/home/SectionMessage";

export const metadata: Metadata = {
  title: "Mary Josette Academy | Home",
  description: "Official website of Mary Josette Academy",
};

export default function Home() {
  return (
    <>
      <header className="h-screen bg-primary-500">
        <Navbar />
        <Hero />
      </header>
      <main className="-mt-1 z-20 bg-primary-500">
        <SectionMessage />
        <SectionPrograms />
        <SectionAbout />
        <SectionContacts />
      </main>
    </>
  );
}
