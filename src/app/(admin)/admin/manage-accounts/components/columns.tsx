"use client";

import { ColumnDef } from "@tanstack/react-table";

import { statuses, roles } from "@/lib/options";
import { AccountTableColumnHeader } from "@/components/account-table-column-header";
import { AccountTableRowActions } from "@/components/account-table-row-actions";
import { User } from "@/types";
import { UserAvatar } from "@/components/user-avatar";

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
      <AccountTableColumnHeader column={column} title="E-mail" />
    ),
    cell: ({ row }) => {
      return <div className="w-full">{row.getValue("email")}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <AccountTableColumnHeader
        column={column}
        title="Status"
        className="hidden md:table-cell"
      />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status"),
      );

      if (!status) {
        return null;
      }

      return <span>{status.label}</span>;
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
    cell: ({ row }) => (
      <AccountTableRowActions
        row={row}
        // selectedRole={"STUDENT"}
        // onRoleChange={function (role: $Enums.Role): void {
        //   throw new Error("Function not implemented.");
        // }}
      />
    ),
  },
];
