"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@prisma/client";
import { UserAvatar } from "@/components/user-avatar";
import { fetchUsers } from "@/hooks/getUsers";
import { SkeletonTable } from "@/components/loading";

export default function AccountTable() {
  const { data, isLoading } = useQuery({
    queryFn: () => fetchUsers(),
    queryKey: ["users"],
  });

  if (isLoading) {
    return <SkeletonTable />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="hidden md:table-cell">E-mail</TableHead>
          <TableHead className="hidden md:table-cell">Status</TableHead>
          <TableHead className="hidden md:table-cell">Role</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.users.map((user: User) => (
          <TableRow key={user.id}>
            <TableCell className="flex items-center justify-start">
              <UserAvatar
                user={{
                  name: user?.name || null,
                  image: user?.image || null,
                }}
                className="h-10 w-10"
              />
              <p className="ms-2">{user.name}</p>
            </TableCell>
            <TableCell className="hidden md:table-cell">{user.email}</TableCell>
            <TableCell className="hidden md:table-cell">{user.role}</TableCell>
            <TableCell className="hidden md:table-cell">{user.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
