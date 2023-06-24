import { Metadata } from "next";
import Providers from "@/components/Providers";
import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import SectionMessage from "@/components/home/SectionMessage";
import SectionPrograms from "@/components/home/SectionPrograms";
import SectionAbout from "@/components/home/SectionAbout";
import SectionContacts from "@/components/home/SectionContacts";

export const metadata: Metadata = {
  title: "Mary Josette Academy | Home",
  description: "Official website of Mary Josette Academy",
};

export default function Home() {
  return (
    <>
      <header className="h-screen bg-background dark:bg-background">
        <Providers>
          <Navbar />
        </Providers>
        <Hero />
      </header>
      <main className="-mt-1 z-20 bg-background max-width dark:bg-background">
        <SectionMessage />
        <SectionPrograms />
        <SectionAbout />
        <SectionContacts />
      </main>
    </>
  );
}
