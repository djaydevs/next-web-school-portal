"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { adminRoutes, manageInfoRoutes } from "@/lib/routes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import Icons from "@/components/ui/icons";

const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col space-y-4 bg-black/5 py-4 text-primary dark:bg-white/5">
      <div className="flex-1 px-3 py-2">
        <Link href="/admin" className="mb-14 flex items-center">
          <div className="relative h-14 w-14">
            <Image fill alt="Logo" src="/mja-logo.png" />
          </div>
          <h1 className="ml-3 text-xl font-bold md:hidden lg:flex">
            Admin Portal
          </h1>
        </Link>
        <div className="space-y-1">
          <TooltipProvider>
            {adminRoutes.map((route) => (
              <Tooltip key={route.href}>
                <TooltipTrigger className="w-full">
                  <Link
                    href={route.href}
                    className={cn(
                      "group flex w-full cursor-pointer justify-start rounded-lg p-3 text-sm font-medium transition hover:bg-primary/20 hover:font-bold hover:text-primary",
                      pathname === route.href
                        ? "bg-primary/20 font-bold text-primary"
                        : "text-primary/70",
                    )}
                  >
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
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="mx-14 -mb-16 hidden rounded-lg border-none bg-[#d6cccb] p-[0.88rem] font-medium text-primary shadow-none dark:bg-[#453b16] md:block lg:hidden">
                  {route.label}
                </TooltipContent>
              </Tooltip>
            ))}
            <Accordion
              type="single"
              collapsible
              className="hidden w-full lg:flex"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger className="w-full gap-[15px] rounded-lg p-3 text-sm font-medium text-primary/70 transition hover:bg-primary/20 hover:font-bold hover:text-primary">
                  <Icons.Milestone />
                  <span className="hidden lg:flex">Manage Information</span>
                </AccordionTrigger>
                {manageInfoRoutes.map((route) => (
                  <AccordionContent
                    key={route.href}
                    className="flex w-full flex-col"
                  >
                    <Link
                      href={route.href}
                      className={cn(
                        buttonVariants({
                          variant: "link",
                          size: "sm",
                        }),
                        "flex h-6 w-full justify-start pl-14",
                        pathname === route.href
                          ? "bg-primary/20 font-bold text-primary"
                          : "text-primary/70",
                      )}
                    >
                      {route.label}
                    </Link>
                  </AccordionContent>
                ))}
              </AccordionItem>
            </Accordion>
            <div className="lg:hidden">
              <DropdownMenu>
                <Tooltip>
                  <TooltipTrigger>
                    <DropdownMenuTrigger className="group flex w-full cursor-pointer justify-start rounded-lg p-3 text-sm font-medium transition hover:bg-primary/20 hover:font-bold hover:text-primary">
                      <Icons.Milestone className="mx-1 h-6 w-6 text-primary/70 hover:text-primary" />
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent className="mx-14 -mb-16 hidden rounded-lg border-none bg-[#d6cccb] p-[0.88rem] font-medium text-primary shadow-none dark:bg-[#453b16] md:block lg:hidden">
                    Manage Information
                  </TooltipContent>
                </Tooltip>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Manage Information</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {manageInfoRoutes.map((route) => (
                      <DropdownMenuItem key={route.href}>
                        <Link href={route.href}>{route.label}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
