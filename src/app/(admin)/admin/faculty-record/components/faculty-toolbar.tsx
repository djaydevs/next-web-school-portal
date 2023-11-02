"use client";

import { Table } from "@tanstack/react-table";

import { statuses, roles } from "@/lib/options";
import Icons from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FacultyTableFacetedFilter } from "@/components/faculty-table-faceted-filter";
import { FacultyViewOptions } from "@/components/faculty-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function FacultyTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col items-center space-x-2 md:flex-row">
        <Input
          placeholder="Search faculty by E-mail"
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="h-8 w-full md:w-[300px]"
        />
        <div className="flex w-full items-center justify-start space-x-2 py-4">
          {table.getColumn("status") && (
            <FacultyTableFacetedFilter
              column={table.getColumn("status")}
              title="Status"
              options={statuses.map((status) => ({
                label: status.label,
                value: status.value.toString(),
              }))}
            />
          )}
          {table.getColumn("role") && (
            <FacultyTableFacetedFilter
              column={table.getColumn("role")}
              title="Roles"
              options={roles}
            />
          )}
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <Icons.PlusCircle className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      <FacultyViewOptions table={table} />
    </div>
  );
}
