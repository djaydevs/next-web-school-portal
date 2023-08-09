"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet";
import { AdminSidebar } from "@/components/sidebar/AdminSidebar";
import Icons from "@/components/ui/Icons";

export const MobileAdminSide = () => {
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
        <AdminSidebar />
      </SheetContent>
    </Sheet>
  );
};