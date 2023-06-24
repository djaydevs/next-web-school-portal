import { FC } from "react";
import Image from "next/image";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

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
      <div className="pt-40 px-16 flex flex-col justify-center items-center space-y-[12rem]">
        <div className="z-10 space-y-3">
          <Heading
            size="lg"
            className="text-secondary dark:text-secondary-foreground three-d"
          >
            Welcome MJAIANS!
          </Heading>
          <Paragraph>
            "Unwavering commitment towards academic distinction."
          </Paragraph>
        </div>
        <Button
          asChild
          variant="default"
          size="lg"
          transition="d300"
          className="z-10 rounded-full tracking-wider hover:bg-secondary hover:text-primary hover:-translate-y-1 hover:scale-110 focus:text-primary focus:-translate-y-1 focus:scale-110 lg:mt-[5rem]"
        >
          <Link href="/login">Login to School Portal</Link>
        </Button>
      </div>
    </>
  );
};

export default Hero;
