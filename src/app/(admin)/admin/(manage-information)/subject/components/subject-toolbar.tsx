"use client";

import { Table } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import Icons from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubjectTableFacetedFilter } from "@/components/subject-table-faceted-filter";
import { generateStrandOptions } from "@/lib/options";
import { Strand } from "@/types";
import { fetchStrands } from "@/hooks/getInfos";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function SubjectTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const { data: strands } = useQuery<Strand[]>({
    queryKey: ["strands"],
    queryFn: async () => fetchStrands(),
  });

  const [strandOptions, setStrandOptions] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    if (strands) {
      const strs = generateStrandOptions(strands);
      setStrandOptions(strs);
    }
  }, [strands]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col items-center space-x-2 py-4 md:flex-row">
        <Input
          placeholder="Search subjects"
          value={
            (table.getColumn("subjectName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("subjectName")?.setFilterValue(event.target.value)
          }
          className="h-8 w-full md:w-[300px]"
        />
        <div className="flex w-full items-center justify-start space-x-2">
          {table.getColumn("strand") && (
            <SubjectTableFacetedFilter
              column={table.getColumn("strand")}
              title="Strand"
              options={strandOptions}
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
