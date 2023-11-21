"use client";

import { FC, useState, useCallback, useEffect } from "react";
import { SchoolYear } from "@prisma/client";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SchoolYearPageIdProps {
  schoolYearInfo?: SchoolYear;
}

const SchoolYearPageId: FC<SchoolYearPageIdProps> = ({ schoolYearInfo }) => {
  const [schoolYear, setSchoolYear] = useState({
    id: schoolYearInfo?.id,
    from: schoolYearInfo?.from,
    to: schoolYearInfo?.to,
    semester: schoolYearInfo?.semester,
  });
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleClose = useCallback(() => {
    setOpen(false);
    setSchoolYear((prev) => ({ ...prev, id: undefined }));
    router.push("/admin/school-year/");
  }, [router]);

  useEffect(() => {
    if (!open) {
      router.push("/admin/school-year/");
    }
  }, [open, router]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Link
          key={schoolYear.id}
          href={`/admin/school-year/${schoolYear.id || ""}`}
          aria-label="Manage enrollment details"
          className={cn(
            buttonVariants({
              variant: "outline",
              size: "sm",
            }),
            "w-full rounded-md px-2 py-1",
          )}
        >
          Details
        </Link>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit School Year</DialogTitle>
          <DialogDescription>Edit school year and semester.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SchoolYearPageId;
