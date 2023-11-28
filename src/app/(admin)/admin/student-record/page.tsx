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
import  StudentExportFilteredData  from "@/components/student-export-filtered-data";
import { Student, studentSchema } from "@/types";
import { fetchStudent } from "@/hooks/getUsers";

interface StudentRecordPageProps {}

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

  const [filteredData, setFilteredData] = useState<Student[]>([]);
  console.log('Fetched Students:', students);
  
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
          {/* <Button onClick={filteredData}>
            <Icons.FileDown className="mr-2" />
            Export Data
          </Button> */}
          {/* Pass the filteredData to the ExportDataButton */}
          <StudentExportFilteredData filteredData={filteredData} />
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
        <StudentTable columns={columns} data={students} onFilteredDataChange={setFilteredData} />
      )}
    </div>
  );
};

export default StudentRecordPage;
