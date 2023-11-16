"use client";

import { FC } from "react";
import { useQuery } from "@tanstack/react-query";

import { SkeletonTable } from "@/components/loading";
import Icons from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import GradeTable from "@/components/grade-table";
import { columns } from "@/components/grade-columns";
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

  if (isErrorFetchingStudents) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="h-full flex-1 flex-col space-y-4 px-4 md:flex">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Manage Report Card
        </h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of students report card you can manage as a faculty
          member.
        </p>
      </div>
      {isLoadingStudentTable ? (
        <SkeletonTable />
      ) : (
        <GradeTable columns={columns} data={students} />
      )}
    </div>
  );
};

export default StudentRecordPage;
