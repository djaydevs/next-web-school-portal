"use client";

import { Row } from "@tanstack/react-table";

import { userSchema } from "@/types";
import EnrollmentPageIdModal from "../../@modal/(.)enrollment/[id]/page";

interface EnrollmentTableRowDetailsProps<TData> {
  row: Row<TData>;
}

export function EnrollmentTableRowDetails<TData>({
  row,
}: EnrollmentTableRowDetailsProps<TData>) {
  const user = userSchema.parse(row.original);

  return (
    <>
      <EnrollmentPageIdModal params={{ id: user.id }} />
    </>
  );
}
