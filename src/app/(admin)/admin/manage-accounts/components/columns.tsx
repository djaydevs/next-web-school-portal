"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { statuses, roles } from "@/lib/options";
import { AccountTableColumnHeader } from "@/components/account-table-column-header";
import { AccountTableRowActions } from "@/components/account-table-row-actions";
import { User } from "@prisma/client";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <AccountTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div className="w-full">{row.getValue("name")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  //   {
  //     accessorKey: "name",
  //     header: ({ column }) => (
  //       <AccountTableColumnHeader column={column} title="Name" />
  //     ),
  //     cell: ({ row }) => {
  //       const label = labels.find(
  //         (label: { value: any }) => label.value === row.original.label,
  //       );

  //       return (
  //         <div className="flex space-x-2">
  //           <span className="w-full truncate font-medium">
  //             {row.getValue("name")}
  //           </span>
  //         </div>
  //       );
  //     },
  //   },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <AccountTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status"),
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {/* {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )} */}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <AccountTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const role = roles.find((role) => role.value === row.getValue("role"));

      if (!role) {
        return null;
      }

      return (
        <div className="flex items-center">
          {/* {role.icon && (
            <role.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )} */}
          <span>{role.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <AccountTableRowActions row={row} />,
  },
];
