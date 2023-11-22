"use client";

import { ColumnDef } from "@tanstack/react-table";

import { EnrollmentTableColumnHeader } from "@/components/enrollment-table-column-header";
import { EnrollmentTableRowDetails } from "@/components/enrollment-table-row-details";
import { Student } from "@/types";
import { UserAvatar } from "@/components/user-avatar";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <EnrollmentTableColumnHeader column={column} title="Name" />
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
      <EnrollmentTableColumnHeader
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
      <EnrollmentTableColumnHeader
        column={column}
        title="Status"
        className="hidden md:table-cell"
      />
    ),
    cell: ({ row }) => {
      const studentProfile = row.getValue(
        "studentProfile",
      ) as Student["studentProfile"];

      if (!studentProfile?.enrollment.length) {
        return (
          <Badge variant="destructive" className="hidden md:table-cell">
            No status
          </Badge>
        );
      }

      return (
        <span className="hidden w-full items-center justify-start md:flex">
          {studentProfile?.enrollment.map((enr) => (
            <Badge
              key={enr.id}
              variant={enr.status === "Enrolled" ? "outline" : "secondary"}
              className="mr-2"
            >
              {enr.status}
            </Badge>
          ))}
        </span>
      );
    },
    filterFn: (row, id, value) => {
      const studentProfile: { enrollment?: { status: string }[] } =
        row.getValue("studentProfile");
      return (
        studentProfile?.enrollment?.some((enrollment) =>
          value.includes(enrollment.status),
        ) || false
      );
    },
  },
  {
    accessorKey: "enrollmentDate",
    header: ({ column }) => (
      <EnrollmentTableColumnHeader
        column={column}
        title="Date"
        className="hidden md:table-cell"
      />
    ),
    cell: ({ row }) => {
      const studentProfile = row.getValue(
        "studentProfile",
      ) as Student["studentProfile"];

      if (!studentProfile?.enrollment.length) {
        return (
          <Badge variant="destructive" className="hidden md:table-cell">
            No date
          </Badge>
        );
      }

      return (
        <span className="hidden w-full items-center justify-start md:flex">
          {studentProfile?.enrollment.map((enr) => (
            <p key={enr.id}>
              {new Date(enr.enrollmentDate).toLocaleDateString(undefined, {
                weekday: "short",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          ))}
        </span>
      );
    },
  },
  {
    accessorKey: "academicYear",
    header: ({ column }) => (
      <EnrollmentTableColumnHeader
        column={column}
        title="School Year"
        className="hidden md:table-cell"
      />
    ),
    cell: ({ row }) => {
      const studentProfile = row.getValue(
        "studentProfile",
      ) as Student["studentProfile"];

      if (!studentProfile?.enrollment.length) {
        return (
          <Badge variant="destructive" className="hidden md:table-cell">
            No school year
          </Badge>
        );
      }

      return (
        <span className="hidden w-full items-center justify-start md:flex">
          {studentProfile?.enrollment.map((enr) => (
            <p key={enr.id}>{enr.academicYear}</p>
          ))}
        </span>
      );
    },
    filterFn: (row, id, value) => {
      const studentProfile: { enrollment?: { academicYear: string }[] } =
        row.getValue("studentProfile");
      return (
        studentProfile?.enrollment?.some((enrollment) =>
          value.includes(enrollment.academicYear),
        ) || false
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <EnrollmentTableRowDetails row={row} />,
  },
];
