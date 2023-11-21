"use client";

import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { fetchStudent } from "@/hooks/getUsers";
import { SkeletonTable } from "@/components/loading";
import { columns } from "@/components/enrollment-columns";
import { useToast } from "@/components/ui/use-toast";
import { Student, studentSchema } from "@/types";
import EnrollmentTable from "./components/enrollment-table";

interface UpdateEnrollmentProps {}

const UpdateEnrollment: FC<UpdateEnrollmentProps> = ({}) => {
  const router = useRouter();
  const { toast } = useToast();

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

  return (
    <div className="h-full flex-1 flex-col space-y-4 px-4 md:flex">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Manage Enrollment for Incoming Grade 12</h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of student enrollment you can manage as a portal
          admin/registrar.
        </p>
      </div>
      {isLoadingStudentsTable ? (
        <SkeletonTable />
      ) : (
        <EnrollmentTable columns={columns} data={students} />
      )}
    </div>
  );
}

export default UpdateEnrollment
