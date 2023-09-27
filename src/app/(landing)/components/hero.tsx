"use client";

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import Heading from "@/components/ui/heading";
import Paragraph from "@/components/ui/paragraph";
import { buttonVariants } from "@/components/ui/button";
import ScrollLink from "@/components/ui/scroll-link";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";

interface HeroProps {}

const Hero: FC<HeroProps> = ({}) => {
  return (
    <div className="static h-screen w-full">
      <Image
        priority
        fill
        src="/bg-hero.webp"
        alt="Hero Image"
        style={{ objectFit: "cover" }}
        className="hero-image"
      />
      <div className="flex h-screen w-full flex-col items-center justify-center space-y-[8rem] px-10 py-40">
        <div className="z-10 space-y-3 pt-36">
          <Heading
            size="lg"
            className="three-d text-secondary dark:text-secondary-foreground"
          >
            Welcome MJAIANS!
          </Heading>
          <Paragraph>
            &ldquo;Unwavering commitment towards academic distinction.&rdquo;
          </Paragraph>
        </div>
        <div className="z-10 flex flex-col items-center justify-center space-y-[5rem]">
          <Link
            href="/signin"
            aria-label="Sign In to School Portal"
            className={cn(
              buttonVariants({
                variant: "default",
                size: "lg",
                transition: "d300",
              }),
              "rounded-full py-4 tracking-wider hover:-translate-y-1 hover:scale-110 focus:-translate-y-1 focus:scale-110 focus:text-primary lg:mt-[5rem]",
            )}
          >
            Sign In to School Portal
          </Link>
          <ScrollLink
            href="#message"
            aria-label="Scroll down"
            className={cn(
              buttonVariants({
                variant: "none",
                transition: "d300",
              }),
              "w-full text-primary hover:translate-y-4 hover:text-primary-foreground",
            )}
          >
            <Icons.ChevronsDown className="mx-auto h-12 w-12" />
          </ScrollLink>
        </div>
      </div>
    </div>
  );
};

export default Hero;
