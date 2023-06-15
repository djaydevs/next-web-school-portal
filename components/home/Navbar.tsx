"use client";

import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import ScrollLink from "@/components/ui/ScrollLink";
import { XCircle } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav
        className="z-40 custom-navbar flex-between text-primary-500 text-xs md:text-sm"
        aria-label="Global"
      >
        <Link href={"/"}>
          <Image
            priority
            fill
            quality={100}
            src="/mja-logo.png"
            alt="Logo"
            style={{
              padding: "0.2rem",
              objectFit: "contain",
              objectPosition: "left",
            }}
          />
          <div className="relative mx-16 p-2">
            <strong className="text-sm">Mary Josette Academy</strong>
            <br />
            <span className="hidden md:block">
              Tigbe, Norzagaray, Bulacan, Philippines, 3013
            </span>
          </div>
        </Link>
        <div className="hidden z-50 lg:flex lg:justify-between lg:gap-x-12 lg:text-md font-semibold">
          <Link href="/">Home</Link>
          <ScrollLink href="#programs">Programs</ScrollLink>
          <ScrollLink href="#about">About</ScrollLink>
          <ScrollLink href="#contacts">Contacts</ScrollLink>
        </div>
        <div className="flex justify-end gap-3">
          {/* <PageButton
            to="/login"
            className="hidden bg-primary-500 text-white hover:bg-accent-500 hover:text-primary-500 focus:bg-accent-500 focus:text-primary-500 sm:block"
          >
            School Portal
          </PageButton> */}
          <div className="flex lg:hidden">
            {/* <button
              type="button"
              className="p-2.5 text-primary-500 hover:text-primary-900 focus:text-primary-900"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="w-8" aria-hidden="true" />
            </button> */}
          </div>
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
            <div className="relative flex items-center justify-between">
              <Link href={"/"}>
                <Image
                  priority
                  fill
                  quality={100}
                  src="/mja-logo.png"
                  alt="Logo"
                  style={{
                    padding: "0.2rem",
                    objectFit: "contain",
                    objectPosition: "left",
                  }}
                />
                <div className="relative mx-12 p-2">
                  <strong className="text-sm">Mary Josette Academy</strong>
                </div>
              </Link>
              <button
                type="button"
                className="p-2.5 pr-4 rounded-md text-primary-500 hover:text-primary-300 focus:text-primary-300 sm:absolute sm:right-0 sm:top-0 sm:pt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XCircle className="w-8" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 mx-4 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-4 py-16">
                  {/* <NavbarLinks className="flex flex-col gap-10 text-md text-center font-medium" /> */}
                </div>
                {/* <PageButton
                  to="/login"
                  className="w-full border-none bg-primary-500 text-white hover:bg-accent-500 hover:text-primary-500 sm:hidden"
                >
                  School Portal
                </PageButton> */}
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </Transition>
    </>
  );
}
