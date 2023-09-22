"use client";

import { Row } from "@tanstack/react-table";
import { useState } from "react";

import Icons from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { roles } from "@/lib/options";
import { updateRole } from "@/hooks/updateRole";
import { userSchema } from "@/types";

interface AccountTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function AccountTableRowActions<TData>({
  row,
}: AccountTableRowActionsProps<TData>) {
  const user = userSchema.parse(row.original);
  const [selectedRole, setSelectedRole] = useState(user.role);

  const handleRoleChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newRole = event.target.value as "STUDENT" | "FACULTY" | "ADMIN";
    setSelectedRole(newRole);
    await updateRole(user.id, newRole);

    console.log(newRole);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <Icons.MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>Details</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Change Roles</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={selectedRole}
              onChange={handleRoleChange}
            >
              {roles.map((role) => (
                <DropdownMenuRadioItem key={role.value} value={role.value}>
                  {role.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
