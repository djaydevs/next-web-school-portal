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
import { StudentTableToolbar } from "@/components/student-toolbar";
import { StudentTablePagination } from "@/components/student-table-pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import * as XLSX from "xlsx";
import { Student, studentSchema } from "@/types";

interface StudentTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function StudentTable<TData, TValue>({
  columns,
  data,
}: StudentTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
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
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const exportFilteredData = () => {
    const filteredData = table.getFilteredRowModel().rows;
    if (filteredData.length > 0) {
      const typedData = filteredData as { original: { email: string, studentProfile: {
        strand: any;
        section: any;
        gradeLevel: any; 
        lrnNumber: string, firstName: string, middleName: string, lastName: string, sex: string, age: number, dateOfBirth: string, address: string, parentGuardianName: string, parentGuardianOccupation: string, parentGuardianAddress: string, contactNumber: string }, 
        gradeLevel: { gradeLevel: number }, section: { sectionName: string }, strand: { strandCode: string } } }[];
      // Extract and map the required properties from each object
      const dataToExport = typedData.map(row => ({
        lrnNumber: row.original.studentProfile.lrnNumber,
        firstName: row.original.studentProfile.firstName,
        middleName: row.original.studentProfile.middleName,
        lastName: row.original.studentProfile.lastName,
        email: row.original.email,
        sex: row.original.studentProfile.sex,
        age: row.original.studentProfile.age,
        dateOfBirth: new Date(row.original.studentProfile.dateOfBirth),
        address: row.original.studentProfile.address,
        parentGuardianName: row.original.studentProfile.parentGuardianName,
        parentGuardianOccupation: row.original.studentProfile.parentGuardianOccupation,
        parentGuardianAddress: row.original.studentProfile.parentGuardianAddress,
        contactNumber: row.original.studentProfile.contactNumber,
        gradeLevel: row.original.studentProfile.gradeLevel?.gradeLevel,
        sectionName: row.original.studentProfile.section?.sectionName,
        strandCode: row.original.studentProfile.strand?.strandCode,
      }));
      
    
      // Create workbook and worksheet
      const workbook: XLSX.WorkBook = XLSX.utils.book_new();
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);

      XLSX.utils.sheet_add_aoa(worksheet, [
        ["LRN Number", "Last Name", "First Name", "Middle Name","Email", "Sex", "Age", "Date of Birth", 
        "Address", "Parent/Guardian's Name", "Parent/Guardian's Occupation", "Parent/Guardian's Address",
        "Contact Number","Grade Level", "Section", "Strand"],
      ]);
    
      // Auto-size columns
      const ref = worksheet['!ref'];
      if (ref) {
        const headerRange = XLSX.utils.decode_range(ref);

        for (let col = headerRange.s.c; col <= headerRange.e.c; ++col) {
          worksheet['!cols'] = worksheet['!cols'] || [];

          // Set a default width for the column
          worksheet['!cols'][col] = worksheet['!cols'][col] || { width: 15 };

          // Adjust column width based on header length
          const headerCell = worksheet[XLSX.utils.encode_cell({ r: headerRange.s.r, c: col })];
          if (headerCell && typeof headerCell.v === 'string') {
            const colInfo = worksheet['!cols'][col]!;
            colInfo.width = colInfo.width || 15; // Default width
            if (headerCell.v.length > colInfo.width) {
              colInfo.width = headerCell.v.length + 2; // Add some padding
            }
          }

          // Adjust column width based on data length
          for (let row = headerRange.s.r + 1; row <= headerRange.e.r; ++row) {
            const cell = worksheet[XLSX.utils.encode_cell({ r: row, c: col })];
            if (cell && cell.v && typeof cell.v === 'string') {
              const colInfo = worksheet['!cols'][col]!;
              colInfo.width = colInfo.width || 15; // Default width
              if (cell.v.length > colInfo.width) {
                colInfo.width = cell.v.length + 2; // Add some padding
              }
            }
          }
        }
      }
    
      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Student');
    
      // Save the workbook to a file
      XLSX.writeFile(workbook, 'StudentRecord.xlsx', { compression: true });
    } else {
      console.warn('Filtered data array is empty. No data to export.');
    }
    
    // const dataStr = JSON.stringify(filteredData);
    // const dataUri =
    //   "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    // let exportFileDefaultName = "data.json";

    // let linkElement = document.createElement("a");
    // linkElement.setAttribute("href", dataUri);
    // linkElement.setAttribute("download", exportFileDefaultName);
    // linkElement.click();
  };

  return (
    <div className="space-y-2">
      <Button onClick={exportFilteredData}>
        <Icons.FileDown className="mr-2" />
        Export Data
      </Button>
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
