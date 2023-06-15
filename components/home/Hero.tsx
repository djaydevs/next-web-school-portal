import { FC } from "react";
import Image from "next/image";

interface HeroProps {}

const Hero: FC<HeroProps> = ({}) => {
  return (
    <>
      <Image
        priority
        fill
        src="/bg-hero.png"
        alt="Hero"
        style={{ objectFit: "cover" }}
        className="hero-image"
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
        {/* <PageButton
          to="/login"
          className="z-10 border-solid border-2 border-accent-500 text-accent-500 md:border-4 md:text-sm tracking-wider hover:bg-accent-500 hover:text-primary-500 hover:-translate-y-1 hover:scale-110 focus:text-primary-500 focus:-translate-y-1 focus:scale-110 lg:mt-[5rem]"
        >
          Login to School Portal
        </PageButton> */}
      </div>
    </>
  );
};

export default Hero;
