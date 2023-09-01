"use client";

import { useState, useEffect, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import ScrollLink from "@/components/ui/scroll-link";
import { Button, buttonVariants } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import MobileNav from "@/components/home/MobileNav";
import { homeRoutes } from "@/lib/routes";

export default function Navbar() {
  const pathname = usePathname();
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
        {homeRoutes.map((route) => (
          <ScrollLink
            key={route.href}
            href={route.href}
            className={cn(
              buttonVariants({ variant: "link" }),
              pathname === route.href
            )}
          >
            {route.label}
          </ScrollLink>
        ))}
      </div>
      <div className="flex-center place-content-end">
        <ThemeToggle />
        <MobileNav />
      </div>
      <Link
        href="/signin"
        className={cn(
          buttonVariants({ variant: "default" }),
          "hidden lg:block"
        )}
      >
        Sign In
      </Link>
    </nav>
  );
}
