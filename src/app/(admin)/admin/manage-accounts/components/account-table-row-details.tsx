"use client";

import Link from "next/link";
import { Row } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { userSchema } from "@/types";
import { Button, buttonVariants } from "@/components/ui/button";

interface AccountTableRowDetailsProps<TData> {
  row: Row<TData>;
}

export function AccountTableRowDetails<TData>({
  row,
}: AccountTableRowDetailsProps<TData>) {
  const user = userSchema.parse(row.original);

  return (
    <>
      {!user.isVerified ? (
        <div className="flex w-full gap-2">
          <Button size="sm" className="w-full">
            Verify
          </Button>
          <Link
            href={`/admin/manage-accounts/${user.id}`}
            aria-label="Manage account details"
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
        </div>
      ) : (
        <Link
          href={`/admin/manage-accounts/${user.id}`}
          aria-label="Manage account details"
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
      )}
    </>
  );
}
