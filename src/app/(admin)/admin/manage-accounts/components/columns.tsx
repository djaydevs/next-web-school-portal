"use client";

import { ColumnDef } from "@tanstack/react-table";

import { statuses, roles } from "@/lib/options";
import { AccountTableColumnHeader } from "@/components/account-table-column-header";
import { AccountTableRowDetails } from "@/components/account-table-row-details";
import { User } from "@/types";
import { UserAvatar } from "@/components/user-avatar";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<User>[] = [
  //   {
  //     id: "select",
  //     header: ({ table }) => (
  //       <Checkbox
  //         checked={table.getIsAllPageRowsSelected()}
  //         onCheckedChange={(value: any) =>
  //           table.toggleAllPageRowsSelected(!!value)
  //         }
  //         aria-label="Select all"
  //         className="translate-y-[2px]"
  //       />
  //     ),
  //     cell: ({ row }) => (
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value: any) => row.toggleSelected(!!value)}
  //         aria-label="Select row"
  //         className="translate-y-[2px]"
  //       />
  //     ),
  //     enableSorting: false,
  //     enableHiding: false,
  //   },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <AccountTableColumnHeader column={column} title="Name" />
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
      <AccountTableColumnHeader
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
    accessorKey: "isVerified",
    header: ({ column }) => (
      <AccountTableColumnHeader
        column={column}
        title="Status"
        className="hidden md:table-cell"
      />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("isVerified"),
      );

      if (!status) {
        return null;
      }

      return (
        <span className="hidden md:table-cell">
          {status.value ? (
            <Badge variant="outline">{status.label}</Badge>
          ) : (
            <Badge variant="destructive">{status.label}</Badge>
          )}
        </span>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <AccountTableColumnHeader
        column={column}
        title="Role"
        className="hidden md:table-cell"
      />
    ),
    cell: ({ row }) => {
      const role = roles.find((role) => role.value === row.getValue("role"));

      if (!role) {
        return null;
      }

      return <span className="hidden md:table-cell">{role.label}</span>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <AccountTableRowDetails row={row} />,
  },
];
