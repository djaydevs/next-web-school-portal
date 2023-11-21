"use client";

import { Table } from "@tanstack/react-table";

import { enrollmentStatus } from "@/lib/options";
import Icons from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EnrollmentTableFacetedFilter } from "@/components/enrollment-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function EnrollmentTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col items-center space-x-2 py-4 md:flex-row">
        <Input
          placeholder="Search accounts by name"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-full md:w-[300px]"
        />
        <div className="flex w-full items-center justify-start space-x-2">
          {table.getColumn("studentProfile") && (
            <EnrollmentTableFacetedFilter
              column={table.getColumn("studentProfile")}
              title="Status"
              options={enrollmentStatus}
            />
          )}
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <Icons.XCircle className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
