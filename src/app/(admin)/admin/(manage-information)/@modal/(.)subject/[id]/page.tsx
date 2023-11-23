"use client";

import { FC, useState, useCallback, useEffect } from "react";
import { Subject } from "@/types";
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
import { fetchSubjectById } from "@/hooks/getInfos";

interface SubjectPageIdModalProps {
  params: {
    id: string;
  };
}

export default function SubjectPageIdModal({
  params,
}: SubjectPageIdModalProps) {
  const { id } = params;

  const {
    data: subject,
    isPending: isLoadingSubject,
    isError: isErrorFetchingSubject,
    error: subjectsError,
  } = useQuery<Subject>({
    queryKey: ["subject", id],
    queryFn: async () => fetchSubjectById(id),
  });

  const [subjectId, setSubjectId] = useState({ id: subject?.id });
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleClose = useCallback(() => {
    setOpen(false);
    setSubjectId((prev) => ({ ...prev, id: id }));
    router.push("/admin/subject/");
  }, [id, router]);

  useEffect(() => {
    if (!open) {
      router.push("/admin/subject/");
    }
  }, [open, router]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Link
          href={`/admin/subject/${id}`}
          aria-label="Manage subject details"
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
          <DialogTitle>Edit Subject</DialogTitle>
          <DialogDescription>Edit subject.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
