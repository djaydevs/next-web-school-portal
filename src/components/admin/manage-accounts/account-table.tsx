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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SafeUser } from "@/types";

interface accountTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function AccountTable<TData, TValue>({
  columns,
  data,
}: accountTableProps<TData, TValue>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>E-mail</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      {/* <TableBody>
        {accounts.map((account) => (
          <TableRow key={account.id}>
            <TableCell className="font-medium">{account.id}</TableCell>
            <TableCell className="flex items-center justify-start">
              <Avatar>
                {account?.image && (
                  <AvatarImage src={account?.image} alt="avatar image" />
                )}
                <AvatarFallback>J{account?.name}</AvatarFallback>
              </Avatar>
              <p className="ms-2">{account.name}</p>
            </TableCell>
            <TableCell>{account.email}</TableCell>
            <TableCell>{account.role}</TableCell>
          </TableRow>
        ))}
      </TableBody> */}
    </Table>
  );
}
