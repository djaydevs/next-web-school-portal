"use client";

import { useState, useEffect, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import ScrollLink from "@/components/ui/scroll-link";
import { Button, buttonVariants } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/theme-toggle";
import MobileNav from "@/app/(landing)/components/mobile-nav";
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
      className={`flex-between fixed left-0 top-0 z-50 w-full gap-2 bg-white/80 p-2 text-xs text-primary backdrop-blur-md transition duration-150 ease-linear dark:bg-brown-800/80 dark:text-primary md:text-sm ${
        show || "-translate-y-full"
      }`}
      aria-label="Global"
    >
      <Link href={"/"} className="flex-center relative">
        <div className="h-14 w-14">
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
      <div className="z-50 hidden flex-auto lg:flex lg:justify-center lg:gap-x-12">
        {homeRoutes.map((route) => (
          <ScrollLink
            key={route.href}
            href={route.href}
            className={cn(
              buttonVariants({ variant: "link" }),
              pathname === route.href,
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
        aria-label="Sign In to School Portal"
        className={cn(
          buttonVariants({ variant: "default" }),
          "hidden lg:block",
        )}
      >
        Sign In
      </Link>
    </nav>
  );
}
