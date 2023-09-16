import { Metadata } from "next";
import Providers from "@/components/providers";
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
      <header className="h-screen bg-background dark:bg-background">
        <Providers>
          <Navbar />
        </Providers>
        <Hero />
      </header>
      <main className="-mt-1 z-20 bg-background max-w-[1300px] mx-auto dark:bg-background">
        <SectionMessage />
        <SectionPrograms />
        <SectionAbout />
        <SectionContacts />
      </main>
    </>
  );
}
