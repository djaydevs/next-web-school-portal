"use client";

import Link from "next/link";
import { Row } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { userSchema } from "@/types";
import { Button, buttonVariants } from "@/components/ui/button";

interface EnrollmentTableRowDetailsProps<TData> {
  row: Row<TData>;
}

export function EnrollmentTableRowDetails<TData>({
  row,
}: EnrollmentTableRowDetailsProps<TData>) {
  const user = userSchema.parse(row.original);

  return (
    <>
      <Link
        href={`/admin/enrollment/${user.id}`}
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
    </>
  );
}
