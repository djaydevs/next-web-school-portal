"use client";

import { ColumnDef } from "@tanstack/react-table";

import { SubjectTableColumnHeader } from "@/components/subject-table-column-header";
import { SubjectTableRowDetails } from "@/components/subject-table-row-details";
import { Subject } from "@/types";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Subject>[] = [
  {
    accessorKey: "subjectName",
    header: ({ column }) => (
      <SubjectTableColumnHeader
        column={column}
        title="Subject"
        className="hidden md:table-cell"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="hidden w-full items-center justify-start md:flex">
          {row.getValue("subjectName")}
        </div>
      );
    },
  },
  {
    accessorKey: "strand",
    header: ({ column }) => (
      <SubjectTableColumnHeader
        column={column}
        title="Strand"
        className="hidden md:table-cell"
      />
    ),
    cell: ({ row }) => {
      const strand = row.getValue("strand") as any;
      return (
        <div className="hidden w-full items-center justify-start md:flex">
          {strand?.strandCode}
          <Badge variant="outline" className="ml-2">
            {strand?.strandName}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const strand = row.getValue("strand") as any;
      return value.includes(strand?.strandCode);
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <SubjectTableRowDetails row={row} />,
  },
];
