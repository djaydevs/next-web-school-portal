"use client";

import Link from "next/link";
import { Row } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { userSchema } from "@/types";
import { buttonVariants } from "@/components/ui/button";

interface AccountTableRowDetailsProps<TData> {
  row: Row<TData>;
}

export function AccountTableRowDetails<TData>({
  row,
}: AccountTableRowDetailsProps<TData>) {
  const user = userSchema.parse(row.original);

  return (
    <Link
      href={`/admin/manage-accounts/${user.id}`}
      aria-label="Manage account details"
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
