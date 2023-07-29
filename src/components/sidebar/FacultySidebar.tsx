"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import Icons from "@/components/ui/Icons";

const routes = [
  {
    label: "Dashboard",
    icon: Icons.LayoutDashboard,
    href: "/faculty/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Advisory Class",
    icon: Icons.FileText,
    href: "/faculty/advisory-class",
    color: "text-violet-500",
  },
  {
    label: "Report Card",
    icon: Icons.Star,
    color: "text-pink-700",
    href: "/faculty/grades",
  },
  {
    label: "Settings",
    icon: Icons.Settings,
    href: "/settings",
  },
];

export const FacultySidebar = () => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-brown-900 text-white">
      <div className="px-3 py-2 flex-1">
        <Link
          href="/faculty/dashboard"
          className="flex items-center pl-3 mb-14"
        >
          <div className="relative h-10 w-10 mr-4">
            <Image fill alt="Logo" src="/mja-logo.png" />
          </div>
          <h1 className="text-2xl font-bold">Faculty Portal</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
