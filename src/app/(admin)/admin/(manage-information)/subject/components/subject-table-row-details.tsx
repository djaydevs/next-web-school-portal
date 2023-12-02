"use client";

import { Row } from "@tanstack/react-table";

import { subjectSchema } from "@/types";
import SubjectPageIdModal from "../../@modal/(.)subject/[id]/page";

interface SubjectTableRowDetailsProps<TData> {
  row: Row<TData>;
}

export function SubjectTableRowDetails<TData>({
  row,
}: SubjectTableRowDetailsProps<TData>) {
  const subject = subjectSchema.parse(row.original);

  return <SubjectPageIdModal params={{ id: subject.id }} />;
}
