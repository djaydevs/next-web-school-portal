"use client";

import { FC } from "react";
import { useQuery } from "@tanstack/react-query";

import { SkeletonTable } from "@/components/loading";
import { columns } from "@/components/enrollment-columns";
import EnrollmentTable from "@/components/enrollment-table";
import { fetchStudent } from "@/hooks/getUsers";
import { Student } from "@/types";

interface UpdateEnrollmentProps {}

const UpdateEnrollment: FC<UpdateEnrollmentProps> = ({}) => {
  const {
    data: students,
    isPending: isLoadingStudentsTable,
    isError: isErrorFetchingStudents,
    error,
  } = useQuery<Student[]>({
    queryKey: ["students"],
    queryFn: async () => fetchStudent(),
  });

  if (isErrorFetchingStudents) {
    return <span>Error: {error.message}</span>;
  }

  // show the students that has enrollment only
  const studentsFilter = students?.filter(
    (student) =>
      student &&
      student.studentProfile &&
      student.studentProfile.enrollment &&
      student.studentProfile.enrollment.length > 0,
  ) as Student[];

  return (
    <div className="h-full flex-1 flex-col space-y-4 px-4 md:flex">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Manage Enrollment for Incoming Grade 12
        </h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of student enrollment you can manage as a portal
          admin/registrar.
        </p>
      </div>
      {isLoadingStudentsTable ? (
        <SkeletonTable />
      ) : (
        <EnrollmentTable columns={columns} data={studentsFilter} />
      )}
    </div>
  );
};

export default UpdateEnrollment;
