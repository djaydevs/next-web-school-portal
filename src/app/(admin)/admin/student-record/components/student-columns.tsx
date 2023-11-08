"use client";

import { ColumnDef } from "@tanstack/react-table";

import { StudentTableColumnHeader } from "@/components/student-table-column-header";
import { StudentTableRowDetails } from "@/components/student-table-row-details";
import { UserAvatar } from "@/components/user-avatar";
import { Student } from "@/types";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <StudentTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-full items-center justify-start">
          <UserAvatar
            user={{
              name: row.original.name || null,
              image: row.original.image || null,
            }}
            className="h-8 w-8 md:h-10 md:w-10"
          />
          <span className="ml-2">{row.getValue("name")}</span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <StudentTableColumnHeader
        column={column}
        title="Email"
        className="hidden md:table-cell"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="hidden w-full items-center justify-start md:flex">
          {row.getValue("email")}
        </div>
      );
    },
  },
  {
    accessorKey: "studentProfile",
    header: ({ column }) => (
      <StudentTableColumnHeader
        column={column}
        title="Strand"
        className="hidden md:table-cell"
      />
    ),
    cell: ({ row }) => {
      const studentProfile = row.getValue(
        "studentProfile",
      ) as Student["studentProfile"];

      if (!studentProfile?.strand.length) {
        return <Badge variant="destructive">No strand</Badge>;
      }

      return (
        <span className="hidden w-full items-center justify-start md:flex">
          {studentProfile?.strand.map((str) => (
            <Badge key={str.id} variant="secondary" className="mr-2">
              {str.strandName}
            </Badge>
          ))}
        </span>
      );
    },
  },
  {
    accessorKey: "studentProfile",
    header: ({ column }) => (
      <StudentTableColumnHeader
        column={column}
        title="Section"
        className="hidden md:table-cell"
      />
    ),
    cell: ({ row }) => {
      const studentProfile = row.getValue(
        "studentProfile",
      ) as Student["studentProfile"];

      if (!studentProfile?.section.length) {
        return <Badge variant="destructive">No section</Badge>;
      }

      return (
        <span className="hidden w-full items-center justify-start md:flex">
          {studentProfile?.section.map((sec) => (
            <Badge key={sec.id} variant="secondary" className="mr-2">
              {sec.sectionName}
            </Badge>
          ))}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <StudentTableRowDetails row={row} />,
  },
];
