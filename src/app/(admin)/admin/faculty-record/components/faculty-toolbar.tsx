"use client";

import { Table } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import Icons from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FacultyTableFacetedFilter } from "@/components/faculty-table-faceted-filter";
import {
  generateSectionOptionsFaculty,
  generateSubjectOptionsFaculty,
} from "@/lib/options";
import { Faculty } from "@/types";
import { fetchFaculty } from "@/hooks/getUsers";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function FacultyTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const { data: faculties } = useQuery<Faculty[]>({
    queryKey: ["faculties"],
    queryFn: async () => fetchFaculty(),
  });

  const [sectionOptions, setSectionOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const [subjectOptions, setSubjectOptions] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    if (faculties) {
      const sections = generateSectionOptionsFaculty(faculties);
      setSectionOptions(sections);

      const subjects = generateSubjectOptionsFaculty(faculties);
      setSubjectOptions(subjects);
    }
  }, [faculties]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col items-center space-x-2 py-4 md:flex-row">
        <Input
          placeholder="Search faculty by name"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-full md:w-[300px]"
        />
        <div className="flex w-full items-center justify-start space-x-2">
          {table.getColumn("section") && (
            <FacultyTableFacetedFilter
              column={table.getColumn("section")}
              title="Section"
              options={sectionOptions}
            />
          )}
          {table.getColumn("subjects") && (
            <FacultyTableFacetedFilter
              column={table.getColumn("subjects")}
              title="Subject"
              options={subjectOptions}
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
