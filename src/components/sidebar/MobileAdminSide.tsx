"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { adminRoutes } from "@/lib/routes";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

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
        <div className="space-y-4 py-4 flex flex-col h-full bg-black/5 dark:bg-white/5 text-primary">
          <div className="px-3 py-2 flex-1">
            <Link href="/admin/dashboard" className="flex items-center mb-14">
              <div className="relative h-14 w-14 me-4">
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
                    "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:font-bold hover:bg-primary/20 rounded-lg transition",
                    pathname === route.href
                      ? "text-primary font-bold bg-primary/20"
                      : "text-primary/70"
                  )}
                >
                  <SheetClose>
                    <div className="flex items-center flex-1">
                      <route.icon
                        className={cn(
                          "h-6 w-6 mx-1 hover:text-primary",
                          pathname === route.href
                            ? "text-primary "
                            : "text-primary/70"
                        )}
                      />
                      <div className="md:hidden lg:flex pl-2 hover:block">
                        {route.label}
                      </div>
                    </div>
                  </SheetClose>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
