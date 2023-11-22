"use client";

import { FC, useState, useCallback, useEffect } from "react";
import { Strand } from "@/types";
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
import { fetchStrandById } from "@/hooks/getInfos";

interface StrandPageIdModalProps {
  params: {
    id: string;
  };
}

export default function StrandPageIdModal({ params }: StrandPageIdModalProps) {
  const { id } = params;

  const {
    data: strand,
    isPending: isLoadingStrand,
    isError: isErrorFetchingStrand,
    error: strandsError,
  } = useQuery<Strand>({
    queryKey: ["strand", id],
    queryFn: async () => fetchStrandById(id),
  });

  const [strandId, setStrandId] = useState({ id: strand?.id });
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleClose = useCallback(() => {
    setOpen(false);
    setStrandId((prev) => ({ ...prev, id: id }));
    router.push("/admin/strand/");
  }, [id, router]);

  useEffect(() => {
    if (!open) {
      router.push("/admin/strand/");
    }
  }, [open, router]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Link
          href={`/admin/strand/${id}`}
          aria-label="Manage strand details"
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
          <DialogTitle>Edit Strand</DialogTitle>
          <DialogDescription>Edit strand.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
