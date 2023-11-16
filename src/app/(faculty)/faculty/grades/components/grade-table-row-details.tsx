"use client";

import Link from "next/link";
import { Row } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { userSchema } from "@/types";
import { buttonVariants } from "@/components/ui/button";

interface GradeTableRowDetailsProps<TData> {
  row: Row<TData>;
}

export function GradeTableRowDetails<TData>({
  row,
}: GradeTableRowDetailsProps<TData>) {
  const user = userSchema.parse(row.original);

  return (
    <Link
      href={`/faculty/grades/${user.id}`}
      aria-label="Manage report card details"
      className={cn(
        buttonVariants({
          variant: "outline",
          size: "sm",
        }),
        "rounded-md px-2 py-1",
      )}
    >
      Details
    </Link>
  );
}
