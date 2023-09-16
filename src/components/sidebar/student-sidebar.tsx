"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { studentRoutes } from "@/lib/routes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export const StudentSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-black/5 dark:bg-white/5 text-primary">
      <div className="px-3 py-2 flex-1">
        <Link href="/student" className="flex items-center mb-14">
          <div className="relative h-14 w-14">
            <Image fill alt="Logo" src="/mja-logo.png" />
          </div>
          <h1 className="text-xl font-bold md:hidden lg:flex ml-3">
            Student Portal
          </h1>
        </Link>
        <div className="space-y-1">
          <TooltipProvider>
            {studentRoutes.map((route) => (
              <Tooltip key={route.href}>
                <TooltipTrigger className="w-full">
                  <Link
                    href={route.href}
                    className={cn(
                      "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:font-bold hover:bg-primary/20 rounded-lg transition",
                      pathname === route.href
                        ? "text-primary font-bold bg-primary/20"
                        : "text-primary/70"
                    )}
                  >
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
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="hidden md:block lg:hidden -mb-16 mx-14 p-[0.88rem] bg-[#d6cccb] dark:bg-[#453b16] text-primary font-medium shadow-none border-none rounded-lg">
                  {route.label}
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};
