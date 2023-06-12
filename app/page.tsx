import Image from "next/image";
import Navbar from "@components/home/Navbar";
import PageButton from "@components/home/PageButton";

export default function Home() {
  return (
    <>
      <header className="h-screen bg-primary-500">
        <Navbar />
        <Image
          src="/assets/images/bgHero.png"
          //   width={500}
          //   height={500}
          fill={true}
          alt="Hero"
        />
        <div className="pt-40 px-16 flex flex-col justify-center items-center space-y-[10rem]">
          <div className="z-10 text-accent-500 text-center space-y-3">
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black">
              Welcome MJAIANS!
            </h1>
            <p className="text-xs md:text-sm lg:text-md xl:text-lg md:font-semibold">
              "Unwavering commitment towards academic distinction."
            </p>
          </div>
          <PageButton
            to="/login"
            className="z-10 border-solid border-2 border-accent-500 text-accent-500 md:border-4 md:text-sm tracking-wider hover:bg-accent-500 hover:text-primary-500 hover:-translate-y-1 hover:scale-110 focus:text-primary-500 focus:-translate-y-1 focus:scale-110 lg:mt-[5rem]"
          >
            Login to School Portal
          </PageButton>
        </div>
      </header>
      <main className="-mt-1 z-20 bg-primary-500">
        <div className="p-10">
          <h3>Principal Message</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente,
            pariatur ex asperiores, error molestiae minus rem veniam facere
            accusantium corrupti velit quod. Perspiciatis voluptatum voluptas
            odio optio dignissimos, ipsum illo?
          </p>
        </div>
        <div className="bg-white p-10">
          <div className="bg-primary-500 p-10 rounded-xl">
            <h3>Programs</h3>
          </div>
        </div>
        <div>About</div>
        <div>Contacts</div>
      </main>
    </>
  );
}
