"use client";

import { ColumnDef } from "@tanstack/react-table";

import { StudentTableColumnHeader } from "@/components/student-table-column-header";
import { StudentTableRowDetails } from "@/components/student-table-row-details";
import { UserAvatar } from "@/components/user-avatar";
import { Student } from "@/types";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "studentProfile",
    header: ({ column }) => (
      <StudentTableColumnHeader
        column={column}
        title="LRN"
        className="hidden md:table-cell"
      />
    ),
    cell: ({ row }) => {
      const studentProfile = row.getValue(
        "studentProfile",
      ) as Student["studentProfile"];

      if (!studentProfile?.lrnNumber) {
        return (
          <Badge variant="destructive" className="hidden w-fit md:flex">
            No LRN
          </Badge>
        );
      }

      return (
        <span className="hidden w-full items-center justify-start md:flex">
          <p>{studentProfile?.lrnNumber}</p>
        </span>
      );
    },
  },
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
        title="Grade"
        className="hidden md:table-cell"
      />
    ),
    cell: ({ row }) => {
      const studentProfile = row.getValue(
        "studentProfile",
      ) as Student["studentProfile"];

      if (!studentProfile?.gradeLevel) {
        return (
          <Badge variant="destructive" className="hidden w-fit md:flex">
            No grade
          </Badge>
        );
      }

      return (
        <span className="hidden w-full items-center justify-start md:flex">
          <p>{studentProfile?.gradeLevel.gradeLevel}</p>
        </span>
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

      if (!studentProfile?.strand) {
        return (
          <Badge variant="destructive" className="hidden w-fit md:flex">
            No strand
          </Badge>
        );
      }

      return (
        <span className="hidden w-full items-center justify-start md:flex">
          <p>{studentProfile?.strand.strandCode}</p>
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

      if (!studentProfile?.section) {
        return (
          <Badge variant="destructive" className="hidden w-fit md:flex">
            No section
          </Badge>
        );
      }

      return (
        <span className="hidden w-full items-center justify-start md:flex">
          <p>{studentProfile?.section.sectionName}</p>
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <StudentTableRowDetails row={row} />,
  },
];
