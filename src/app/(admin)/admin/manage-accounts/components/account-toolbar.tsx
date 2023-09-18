"use client";

import { Table } from "@tanstack/react-table";

import { statuses, roles } from "@/lib/options";
import Icons from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AccountTableFacetedFilter } from "@/components/account-table-faceted-filter";
import { AccountViewOptions } from "@/components/account-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function AccountTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  // TODO: Fix this whole thing
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter accounts..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <AccountTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("role") && (
          <AccountTableFacetedFilter
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
      <AccountViewOptions table={table} />
    </div>
  );
}
