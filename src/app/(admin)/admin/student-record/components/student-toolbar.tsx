"use client";

import { Table } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import Icons from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StudentTableFacetedFilter } from "@/components/student-table-faceted-filter";
import {
  generateGradeLevelOptionsStudent,
  generateSectionOptionsStudent,
  generateStrandOptionsStudent,
} from "@/lib/options";
import { Student } from "@/types";
import { fetchStudent } from "@/hooks/getUsers";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function StudentTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const { data: students } = useQuery<Student[]>({
    queryKey: ["students"],
    queryFn: async () => fetchStudent(),
  });

  const [gradeLevelOptions, setGradeLevelOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const [strandOptions, setStrandOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const [sectionOptions, setSectionOptions] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    if (students) {
      const gradeLevels = generateGradeLevelOptionsStudent(students);
      setGradeLevelOptions(gradeLevels);
      const strands = generateStrandOptionsStudent(students);
      setStrandOptions(strands);
      const sections = generateSectionOptionsStudent(students);
      setSectionOptions(sections);
    }
  }, [students]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col items-center space-x-2 py-4 md:flex-row">
        <Input
          placeholder="Search student by email"
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="h-8 w-full md:w-[300px]"
        />
        <div className="flex w-full items-center justify-start space-x-2">
          {table.getColumn("grade") && (
            <StudentTableFacetedFilter
              column={table.getColumn("grade")}
              title="Grade"
              options={gradeLevelOptions}
            />
          )}
          {table.getColumn("strand") && (
            <StudentTableFacetedFilter
              column={table.getColumn("strand")}
              title="Strand"
              options={strandOptions}
            />
          )}
          {table.getColumn("section") && (
            <StudentTableFacetedFilter
              column={table.getColumn("section")}
              title="Section"
              options={sectionOptions}
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
