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
        className="table-cell"
      />
    ),
    cell: ({ row }) => {
      const facultyProfile = row.getValue(
        "facultyProfile",
      ) as Faculty["facultyProfile"];

      if (!facultyProfile?.empNumber) {
        return (
          <Badge variant="destructive" className="w-fit">
            No ID
          </Badge>
        );
      }

      return (
        <span className=" w-full items-center justify-start">
          <p>{facultyProfile?.empNumber}</p>
        </span>
      );
    },
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => (
      <FacultyTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const facultyProfile = row.getValue(
        "facultyProfile",
      ) as Faculty["facultyProfile"];

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
            {facultyProfile?.firstName +
              (facultyProfile?.middleName
                ? ` ${facultyProfile?.middleName.charAt(0)}.`
                : "") +
              ` ${facultyProfile?.lastName}`}
          </span>
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
    accessorKey: "section",
    header: ({ column }) => (
      <FacultyTableColumnHeader
        column={column}
        title="Section"
        className="table-cell"
      />
    ),
    cell: ({ row }) => {
      const facultyProfile = row.getValue(
        "facultyProfile",
      ) as Faculty["facultyProfile"];

      if (!facultyProfile?.section.length) {
        return (
          <Badge variant="destructive" className="w-fit">
            No sections
          </Badge>
        );
      }

      return (
        <span className="w-full items-center justify-start">
          {facultyProfile?.section.map((sec) => (
            <Badge key={sec.id} variant="secondary" className="mb-1 mr-2">
              {sec.sectionName}
            </Badge>
          ))}
        </span>
      );
    },
    filterFn: (row, id, value) => {
      const facultyProfile: { section?: { sectionName: string }[] } =
        row.getValue("facultyProfile");
      return (
        facultyProfile?.section?.some((section) =>
          value.includes(section.sectionName),
        ) || false
      );
    },
  },
  {
    accessorKey: "subjects",
    header: ({ column }) => (
      <FacultyTableColumnHeader
        column={column}
        title="Subject"
        className=" md:table-cell"
      />
    ),
    cell: ({ row }) => {
      const facultyProfile = row.getValue(
        "facultyProfile",
      ) as Faculty["facultyProfile"];

      if (!facultyProfile?.subjects.length) {
        return (
          <Badge variant="destructive" className="w-fit">
            No subjects
          </Badge>
        );
      }

      return (
        <span className="w-full items-center justify-start">
          {facultyProfile?.subjects.map((sub) => (
            <Badge key={sub.id} variant="outline" className="mb-1 mr-2">
              {sub.subjectName}
            </Badge>
          ))}
        </span>
      );
    },
    filterFn: (row, id, value) => {
      const facultyProfile: { subjects?: { subjectName: string }[] } =
        row.getValue("facultyProfile");
      return (
        facultyProfile?.subjects?.some((subjects) =>
          value.includes(subjects.subjectName),
        ) || false
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <FacultyTableRowDetails row={row} />,
  },
];
