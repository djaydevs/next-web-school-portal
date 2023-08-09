"use client";

import { useState, useEffect, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";

import ScrollLink from "@/components/ui/ScrollLink";
import { Button } from "@/components/ui/Button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import MobileNav from "@/components/home/MobileNav";

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        // if scroll down hide the navbar
        setShow(false);
      } else {
        // if scroll up show the navbar
        setShow(true);
      }
      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [controlNavbar, lastScrollY]);

  return (
    <nav
      className={`z-50 fixed top-0 left-0 w-full p-2 flex-between gap-2 text-primary text-xs md:text-sm backdrop-blur-md bg-white/80 dark:bg-brown-800/80 dark:text-primary transition duration-150 ease-linear ${
        show || "-translate-y-full"
      }`}
      aria-label="Global"
    >
      <Link href={"/"} className="relative flex-center">
        <div className="w-14 h-14">
          <Image
            priority
            width="100"
            height="100"
            quality={100}
            src="/mja-logo.png"
            alt="Logo"
          />
        </div>
        <div className="p-2 text-xs">
          <strong className="text-sm">Mary Josette Academy</strong>
          <br />
          <span className="hidden sm:block sm:text-xs">
            Tigbe, Norzagaray, Bulacan, Philippines, 3013
          </span>
        </div>
      </Link>
      <div className="flex-auto hidden z-50 lg:flex lg:justify-center lg:gap-x-12">
        <Button variant="link">
          <Link href="/">Home</Link>
        </Button>
        <Button variant="link">
          <ScrollLink href="#programs">Programs</ScrollLink>
        </Button>
        <Button variant="link">
          <ScrollLink href="#about">About</ScrollLink>
        </Button>
        <Button variant="link">
          <ScrollLink href="#contacts">Contacts</ScrollLink>
        </Button>
      </div>
      <div className="flex-center place-content-end">
        <ThemeToggle />
        <MobileNav />
      </div>
      <Button className="hidden lg:block">
        <Link href="/login">Log In</Link>
      </Button>
    </nav>
  );
}
