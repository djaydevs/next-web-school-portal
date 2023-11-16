"use client";

import { ColumnDef } from "@tanstack/react-table";

import { GradeTableColumnHeader } from "@/components/grade-table-column-header";
import { GradeTableRowDetails } from "@/components/grade-table-row-details";
import { UserAvatar } from "@/components/user-avatar";
import { Student } from "@/types";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "studentProfile",
    header: ({ column }) => (
      <GradeTableColumnHeader
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
      <GradeTableColumnHeader column={column} title="Name" />
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
      <GradeTableColumnHeader
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
    accessorKey: "grade",
    header: ({ column }) => (
      <GradeTableColumnHeader
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
    filterFn: (row, id, value) => {
      const studentProfile: { gradeLevel?: { id: string } } =
        row.getValue("studentProfile");
      return value.includes(studentProfile?.gradeLevel?.id);
    },
  },
  {
    accessorKey: "strand",
    header: ({ column }) => (
      <GradeTableColumnHeader
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
    filterFn: (row, id, value) => {
      const studentProfile: { strand?: { strandCode: string } } =
        row.getValue("studentProfile");
      return value.includes(studentProfile?.strand?.strandCode);
    },
  },
  {
    accessorKey: "section",
    header: ({ column }) => (
      <GradeTableColumnHeader
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
    filterFn: (row, id, value) => {
      const studentProfile: { section?: { sectionName: string } } =
        row.getValue("studentProfile");
      return value.includes(studentProfile?.section?.sectionName);
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <GradeTableRowDetails row={row} />,
  },
];
