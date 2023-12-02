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
        className="table-cell"
      />
    ),
    cell: ({ row }) => {
      const studentProfile = row.getValue(
        "studentProfile",
      ) as Student["studentProfile"];

      if (!studentProfile?.lrnNumber) {
        return (
          <Badge variant="destructive" className="w-fit">
            No LRN
          </Badge>
        );
      }

      return (
        <span className="w-full items-center justify-start">
          <p>{studentProfile?.lrnNumber}</p>
        </span>
      );
    },
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => (
      <StudentTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const studentProfile = row.getValue(
        "studentProfile",
      ) as Student["studentProfile"];

      return (
        <div className="flex w-full items-center justify-start">
          <UserAvatar
            user={{
              name: row.original.name || null,
              image: row.original.image || null,
            }}
            className="h-8 w-8 md:h-10 md:w-10"
          />
          <span className="ml-2">
            {studentProfile?.firstName +
              (studentProfile?.middleName
                ? ` ${studentProfile?.middleName.charAt(0)}.`
                : "") +
              ` ${studentProfile?.lastName}`}
          </span>
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
        className="table-cell"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-full items-center justify-start">
          {row.getValue("email")}
        </div>
      );
    },
  },
  {
    accessorKey: "grade",
    header: ({ column }) => (
      <StudentTableColumnHeader
        column={column}
        title="Grade"
        className="table-cell"
      />
    ),
    cell: ({ row }) => {
      const studentProfile = row.getValue(
        "studentProfile",
      ) as Student["studentProfile"];

      if (!studentProfile?.gradeLevel) {
        return (
          <Badge variant="destructive" className="w-fit">
            No grade
          </Badge>
        );
      }

      return (
        <span className="w-full items-center justify-start">
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
      <StudentTableColumnHeader
        column={column}
        title="Strand"
        className="table-cell"
      />
    ),
    cell: ({ row }) => {
      const studentProfile = row.getValue(
        "studentProfile",
      ) as Student["studentProfile"];

      if (!studentProfile?.strand) {
        return (
          <Badge variant="destructive" className="w-fit">
            No strand
          </Badge>
        );
      }

      return (
        <span className="w-full items-center justify-start">
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
      <StudentTableColumnHeader
        column={column}
        title="Section"
        className="table-cell"
      />
    ),
    cell: ({ row }) => {
      const studentProfile = row.getValue(
        "studentProfile",
      ) as Student["studentProfile"];

      if (!studentProfile?.section) {
        return (
          <Badge variant="destructive" className="w-fit">
            No section
          </Badge>
        );
      }

      return (
        <span className="w-full items-center justify-start">
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
    cell: ({ row }) => <StudentTableRowDetails row={row} />,
  },
];
