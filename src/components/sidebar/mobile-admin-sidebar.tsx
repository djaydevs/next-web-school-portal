"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { adminRoutes, manageInfoRoutes } from "@/lib/routes";
import { Button, buttonVariants } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const MobileAdminSide = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Icons.Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <div className="flex h-full flex-col space-y-4 bg-black/5 py-4 text-primary dark:bg-white/5">
          <div className="flex-1 px-3 py-2">
            <Link href="/admin" className="mb-14 flex items-center">
              <div className="relative me-4 h-14 w-14">
                <Image fill alt="Logo" src="/mja-logo.png" />
              </div>
              <h1 className="text-2xl font-bold">Admin Portal</h1>
            </Link>
            <div className="space-y-1">
              {adminRoutes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "group flex w-full cursor-pointer justify-start rounded-lg p-3 text-sm font-medium transition hover:bg-primary/20 hover:font-bold hover:text-primary",
                    pathname === route.href
                      ? "bg-primary/20 font-bold text-primary"
                      : "text-primary/70",
                  )}
                >
                  <SheetClose>
                    <div className="flex flex-1 items-center">
                      <route.icon
                        className={cn(
                          "mx-1 h-6 w-6 hover:text-primary",
                          pathname === route.href
                            ? "text-primary "
                            : "text-primary/70",
                        )}
                      />
                      <div className="pl-2 hover:block md:hidden lg:flex">
                        {route.label}
                      </div>
                    </div>
                  </SheetClose>
                </Link>
              ))}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="justify-start gap-4 rounded-lg p-3 text-sm font-medium text-primary/70 transition hover:bg-primary/20 hover:font-bold hover:text-primary">
                    <Icons.Milestone />
                    Manage Information
                  </AccordionTrigger>
                  <AccordionContent className="flex w-full flex-col">
                    {manageInfoRoutes.map((route) => (
                      <Link
                        key={route.href}
                        href={route.href}
                        className={cn(
                          buttonVariants({
                            variant: "link",
                            size: "sm",
                          }),
                          "flex h-6 w-full justify-start py-5 pl-14",
                          pathname === route.href
                            ? "bg-primary/20 font-bold text-primary"
                            : "text-primary/70",
                        )}
                      >
                        {route.label}
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
