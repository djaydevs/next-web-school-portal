"use client";

import { FC } from "react";
import UseCSV from "@usecsv/react";
import { useQuery } from "@tanstack/react-query";

import { SkeletonTable } from "@/components/loading";
import Icons from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import StudentTable from "@/components/student-table";
import { columns } from "@/components/student-columns";
import { Student } from "@/types";
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

  const renderButton = (openModal: any) => {
    return (
      <Button onClick={openModal} className="w-[170px]">
        <Icons.FilePlus2 className="mr-2" />
        Import Data
      </Button>
    );
  };

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
      <UseCSV
        importerKey="d4dd9a93-3546-44f6-9cbf-4ba978759442"
        user={{ userId: 12345 }}
        render={(openModal) => renderButton(openModal)}
      />
      {isLoadingStudentTable ? (
        <SkeletonTable />
      ) : (
        <StudentTable columns={columns} data={students} />
      )}
    </div>
  );
};

export default StudentRecordPage;
