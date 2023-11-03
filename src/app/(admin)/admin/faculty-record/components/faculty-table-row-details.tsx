"use client";

import Link from "next/link";
import { Row } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { userSchema } from "@/types";
import { buttonVariants } from "@/components/ui/button";

interface FacultyTableRowDetailsProps<TData> {
  row: Row<TData>;
}

export function FacultyTableRowDetails<TData>({
  row,
}: FacultyTableRowDetailsProps<TData>) {
  const user = userSchema.parse(row.original);

  return (
    <Link
      href={`/admin/faculty-record/${user.id}`}
      aria-label="Manage faculty details"
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
