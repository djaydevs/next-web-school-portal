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
  Row,
  RowModel
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StudentTableToolbar } from "@/components/student-toolbar";
import { StudentTablePagination } from "@/components/student-table-pagination";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StudentTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setFilteredData: (filteredData: TData[]) => void;
}

export default function StudentTable<TData, TValue>({
  columns,
  data,
  setFilteredData,
}: StudentTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable<TData>({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: async (filters) => {
      console.log('Filters Applied:', filters);    
      setColumnFilters(filters);
    
      try {
        const filteredData = getFilteredRowModel<TData>()(table) as unknown as RowModel<TData>;
        const filteredDataArray = filteredData && filteredData.rows
          ? filteredData.rows.map((row: Row<TData>) => row.original)
          : [];
    
        console.log('Filtered Data Array:', filteredDataArray);
        console.log('Filtered Data Length:', filteredDataArray.length);
    
        setFilteredData(filteredDataArray);
      } catch (error) {
        console.error('Error during filtering:', error);
      }
    }, 
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel<TData>(),
    getFilteredRowModel: getFilteredRowModel<TData>(),
    getPaginationRowModel: getPaginationRowModel<TData>(),
    getSortedRowModel: getSortedRowModel<TData>(),
    getFacetedRowModel: getFacetedRowModel<TData>(),
    getFacetedUniqueValues: getFacetedUniqueValues<TData>(),
  });


  return (
    <div className="space-y-2">
      <StudentTableToolbar table={table} />
      <div className="rounded-md border">
        <ScrollArea className="h-full md:h-[350px]">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No users found or an error occured.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
      <StudentTablePagination table={table} />
    </div>
  );
}
