"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet";
import { StudentSidebar } from "@/components/sidebar/StudentSidebar";
import Icons from "@/components/ui/Icons";

export const MobileStudentSide = () => {
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
        <StudentSidebar />
      </SheetContent>
    </Sheet>
  );
};
