"use client";

import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import ScrollLink from "@/components/ui/ScrollLink";
import { Menu, XCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav
        className="z-40 custom-navbar flex-between text-primary-500 text-xs md:text-sm"
        aria-label="Global"
      >
        <Link href={"/"} className="flex-none relative flex-center">
          <div className="w-14 h-14">
            <Image
              priority
              fill
              quality={100}
              src="/mja-logo.png"
              alt="Logo"
              style={{
                objectFit: "contain",
                objectPosition: "left",
              }}
            />
          </div>
          <div className="p-2">
            <strong className="text-sm">Mary Josette Academy</strong>
            <br />
            <span className="hidden sm:block sm:text-xs md:text-sm">
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
        <Button asChild className="hidden lg:block">
          <Link href="/login">School Portal</Link>
        </Button>
        <div className="flex justify-end gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="flex lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="w-8 h-8 text-primary" aria-hidden="true" />
          </Button>
        </div>
      </nav>

      <Transition
        show={mobileMenuOpen}
        enter="transition ease-in-out duration-300 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-right-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-right-0"
        leaveTo="translate-x-full"
        as={Fragment}
      >
        <Dialog
          className="z-50 fixed inset-0 lg:hidden"
          onClose={setMobileMenuOpen}
        >
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full top-0 p-2 backdrop-blur-md bg-white/70 text-primary-500 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="relative flex-between sm:flex sm:justify-end">
              <Link href={"/"} className="relative flex-center sm:hidden">
                <div className="w-14 h-14">
                  <Image
                    priority
                    fill
                    quality={100}
                    src="/mja-logo.png"
                    alt="Logo"
                    style={{
                      objectFit: "contain",
                      objectPosition: "left",
                    }}
                  />
                </div>
                <div className="p-2">
                  <strong className="text-sm">Mary Josette Academy</strong>
                </div>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XCircle className="w-8 h-8 text-primary" aria-hidden="true" />
              </Button>
            </div>
            <div className="mt-6 mx-4 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-4 py-16 flex flex-col gap-10 text-center">
                  <Button
                    variant="link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link href="/">Home</Link>
                  </Button>
                  <Button
                    variant="link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ScrollLink href="#programs">Programs</ScrollLink>
                  </Button>
                  <Button
                    variant="link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ScrollLink href="#about">About</ScrollLink>
                  </Button>
                  <Button
                    variant="link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ScrollLink href="#contacts">Contacts</ScrollLink>
                  </Button>
                  <Button asChild>
                    <Link href="/login">School Portal</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </Transition>
    </>
  );
}
