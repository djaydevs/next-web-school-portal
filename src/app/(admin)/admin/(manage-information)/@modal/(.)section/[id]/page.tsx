"use client";

import { FC, useState, useCallback, useEffect } from "react";
import { Section } from "@/types";
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
import { fetchSectionById } from "@/hooks/getInfos";

interface SectionPageIdModalProps {
  params: {
    id: string;
  };
}

export default function SectionPageIdModal({
  params,
}: SectionPageIdModalProps) {
  const { id } = params;

  const {
    data: section,
    isPending: isLoadingSection,
    isError: isErrorFetchingSection,
    error: sectionsError,
  } = useQuery<Section>({
    queryKey: ["section", id],
    queryFn: async () => fetchSectionById(id),
  });

  const [sectionId, setSectionId] = useState({ id: section?.id });
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleClose = useCallback(() => {
    setOpen(false);
    setSectionId((prev) => ({ ...prev, id: id }));
    router.push("/admin/section/");
  }, [id, router]);

  useEffect(() => {
    if (!open) {
      router.push("/admin/section/");
    }
  }, [open, router]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Link
          href={`/admin/section/${id}`}
          aria-label="Manage section details"
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
          <DialogTitle>Edit Section</DialogTitle>
          <DialogDescription>Edit section.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
