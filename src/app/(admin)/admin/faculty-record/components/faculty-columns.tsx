"use client";

import { ColumnDef } from "@tanstack/react-table";

import { FacultyTableColumnHeader } from "@/components/faculty-table-column-header";
import { FacultyTableRowDetails } from "@/components/faculty-table-row-details";
import { UserAvatar } from "@/components/user-avatar";
import { Faculty } from "@/types";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Faculty>[] = [
  {
    accessorKey: "facultyProfile",
    header: ({ column }) => (
      <FacultyTableColumnHeader
        column={column}
        title="ID"
        className="hidden md:table-cell"
      />
    ),
    cell: ({ row }) => {
      const facultyProfile = row.getValue(
        "facultyProfile",
      ) as Faculty["facultyProfile"];

      if (!facultyProfile?.empNumber) {
        return (
          <Badge variant="destructive" className="hidden w-fit md:flex">
            No ID
          </Badge>
        );
      }

      return (
        <span className="hidden w-full items-center justify-start md:flex">
          <p>{facultyProfile?.empNumber}</p>
        </span>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <FacultyTableColumnHeader column={column} title="Name" />
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
      <FacultyTableColumnHeader
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
    accessorKey: "facultyProfile",
    header: ({ column }) => (
      <FacultyTableColumnHeader
        column={column}
        title="Section"
        className="hidden md:table-cell"
      />
    ),
    cell: ({ row }) => {
      const facultyProfile = row.getValue(
        "facultyProfile",
      ) as Faculty["facultyProfile"];

      if (!facultyProfile?.section.length) {
        return <Badge variant="destructive">No sections</Badge>;
      }

      return (
        <span className="hidden w-full items-center justify-start md:flex">
          {facultyProfile?.section.map((sec) => (
            <Badge key={sec.id} variant="secondary" className="mr-2">
              {sec.sectionName}
            </Badge>
          ))}
        </span>
      );
    },
    filterFn: (row, id, value) => {
      const facultyProfile = row.getValue(
        "facultyProfile",
      ) as Faculty["facultyProfile"];

      // Check if any section name matches the filter value
      return facultyProfile?.section.some((sec) => sec.sectionName === value);
    },
  },
  {
    accessorKey: "facultyProfile",
    header: ({ column }) => (
      <FacultyTableColumnHeader
        column={column}
        title="Subject"
        className="hidden md:table-cell"
      />
    ),
    cell: ({ row }) => {
      const facultyProfile = row.getValue(
        "facultyProfile",
      ) as Faculty["facultyProfile"];

      if (!facultyProfile?.subjects.length) {
        return <Badge variant="destructive">No subjects</Badge>;
      }

      return (
        <span className="hidden w-full items-center justify-start md:flex">
          {facultyProfile?.subjects.map((sub) => (
            <Badge key={sub.id} variant="outline" className="mr-2">
              {sub.subjectName}
            </Badge>
          ))}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <FacultyTableRowDetails row={row} />,
  },
];
