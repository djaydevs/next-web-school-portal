/* eslint-disable react/no-unescaped-entities */
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
    <div className="static w-full h-screen">
      <Image
        priority
        fill
        src="/bg-hero.webp"
        alt="Hero Image"
        style={{ objectFit: "cover" }}
        className="hero-image"
      />
      <div className="py-40 px-10 w-full h-screen flex flex-col justify-center items-center space-y-[8rem]">
        <div className="z-10 pt-36 space-y-3">
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
        <div className="z-10 flex flex-col justify-center items-center space-y-[5rem]">
          <Link
            href="/api/auth/signin"
            className={cn(
              buttonVariants({
                variant: "default",
                size: "lg",
                transition: "d300",
              }),
              "py-4 rounded-full tracking-wider hover:-translate-y-1 hover:scale-110 focus:text-primary focus:-translate-y-1 focus:scale-110 lg:mt-[5rem]"
            )}
          >
            Sign In to School Portal
          </Link>
          <ScrollLink
            href="#message"
            className={cn(
              buttonVariants({
                variant: "none",
                transition: "d300",
              }),
              "w-full text-primary hover:translate-y-4 hover:text-primary-foreground"
            )}
          >
            <Icons.ChevronsDown className="w-12 h-12 mx-auto" />
          </ScrollLink>
        </div>
      </div>
    </div>
  );
};

export default Hero;
