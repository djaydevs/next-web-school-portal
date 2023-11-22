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
import { useQuery } from "@tanstack/react-query";
import { fetchSchoolYear } from "@/hooks/getInfos";

interface SchoolYearPageIdModalProps {
    params: {
        id: string;
    };
}

export default function SchoolYearPageIdModal ({ params }: SchoolYearPageIdModalProps) {
    const {
        data: schoolYear,
        isPending: isLoadingSchoolYear,
        isError: isErrorFetchingSchoolYear,
        error: schoolYearsError,
      } = useQuery<SchoolYear>({
        queryKey: ["schoolYear"],
        queryFn: async () => fetchSchoolYear(),
      });

  const [schoolYearId, setSchoolYearId] = useState({ id: schoolYear?.id});
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleClose = useCallback(() => {
    setOpen(false);
    setSchoolYearId((prev) => ({ ...prev, id: params.id }));
    router.push("/admin/school-year/");
  }, [params.id, router]);

  useEffect(() => {
    if (!open) {
      router.push("/admin/school-year/");
    }
  }, [open, router]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Link
          href={`/admin/school-year/${params.id || ""}`}
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
