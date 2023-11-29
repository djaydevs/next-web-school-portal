"use client";

import { FC } from "react";
import UseCSV from "@usecsv/react";
import * as XLSX from "xlsx";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { SkeletonTable } from "@/components/loading";
import Icons from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import StudentTable from "@/components/student-table";
import { columns } from "@/components/student-columns";
import { Student, studentSchema } from "@/types";
import { fetchStudent } from "@/hooks/getUsers";

interface StudentRecordPageProps {
  filteredData: Student[];
}

const StudentRecordPage: FC<StudentRecordPageProps> = ({}) => {
  const {
    data: students,
    isPending: isLoadingStudentTable,
    isError: isErrorFetchingStudents,
    error,
  } = useQuery<Student[]>({
    queryKey: ["students"],
    queryFn: async () => fetchStudent(),
  });

  console.log('Is Loading Student Table:', isLoadingStudentTable);

  const renderButton = (openModal: any) => {
    return (
      <Button onClick={openModal}>
        <Icons.FileUp className="mr-2" />
        Import Data
      </Button>
    );
  };

  const [exporting, setExporting] = useState(false);
  const [filteredData, setFilteredData] = useState<Student[]>([]);
  console.log('Fetched Students:', students); 

  useEffect(() => {
    if (students) {
      setFilteredData(students);
    }
  }, [students]);

  const handleExport = () => {
    try {
      setExporting(true)
      // Ensure that filteredDataArray is not empty before proceeding
      if (filteredData.length > 0 && exporting) {
        // Create workbook and worksheet
        const workbook: XLSX.WorkBook = XLSX.utils.book_new();
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);
            
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Student');
        XLSX.writeFile(workbook, 'StudentRecord.xlsx', { compression: true });
      } else {
          console.warn('Filtered data array is empty. No data to export.');
      }      
    } catch (error) {
      console.error("Error exporting data:", error);      
    } finally {
      setExporting(false);
    }  
  };

  useEffect(() => {
    console.log('Component Re-rendered. Filtered Data:', filteredData);
  }, [filteredData]);
  
  if (isErrorFetchingStudents) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="h-full flex-1 flex-col space-y-4 px-4 md:flex">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Manage Student Record
        </h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of student records you can manage as an
          admin/registrar.
        </p>
      </div>
      <div className="flex">
        <div className="flex w-full gap-3">
          <UseCSV
            importerKey="d4dd9a93-3546-44f6-9cbf-4ba978759442"
            user={{ userId: 12345 }}
            render={(openModal) => renderButton(openModal)}
          />
          <Button onClick={handleExport}>
            <Icons.FileDown className="mr-2" />
            Export Data
          </Button>
        </div>
        <div className="flex w-full justify-end">
          <Button variant="secondary">
            <Icons.FilePlus2 className="mr-2" />
            Add Student
          </Button>
        </div>
      </div>
      {isLoadingStudentTable ? (
        <SkeletonTable />
      ) : (
        // Inside StudentRecordPage component
        <StudentTable columns={columns} data={students} setFilteredData={setFilteredData} />
      )}
    </div>
  );
};

export default StudentRecordPage;
