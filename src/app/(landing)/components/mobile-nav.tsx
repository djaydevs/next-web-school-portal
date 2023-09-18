import { FC } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { homeRoutes } from "@/lib/routes";
import ScrollLink from "@/components/ui/scroll-link";

interface MobileNavProps {}

const MobileNav: FC<MobileNavProps> = ({}) => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Icons.Menu className="h-8 w-8" />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-white/80 p-2 dark:bg-brown-900/80">
        <div className="mx-4 mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="flex w-full flex-col gap-10 space-y-4 py-20 text-center">
              {homeRoutes.map((route) => (
                <ScrollLink
                  key={route.href}
                  href={route.href}
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    pathname === route.href,
                  )}
                >
                  <SheetClose>{route.label}</SheetClose>
                </ScrollLink>
              ))}
              <Link
                href="/signin"
                className={cn(buttonVariants({ variant: "default" }))}
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default dynamic(() => Promise.resolve(MobileNav), { ssr: false });
