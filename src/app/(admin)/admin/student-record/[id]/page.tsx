"use client";

import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { fetchStudentById } from "@/hooks/getUsers";
import { Student } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SkeletonCard } from "@/components/loading";
import StudentAssignForm from "@/components/student-assign-form";
import StudentInfoCard from "@/components/student-info-card";

interface ManageStudentIdPageProps {
  params: {
    id: string;
  };
}

const ManageStudentIdPage: FC<ManageStudentIdPageProps> = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const { toast } = useToast();

  const {
    data: studentInfo,
    isPending: infoLoading,
    isError,
    error,
  } = useQuery<Student>({
    queryKey: ["student", id],
    queryFn: async () => fetchStudentById(id),
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <h2 className="px-4 text-2xl font-bold tracking-tight">
        Manage Student Details
      </h2>
      {infoLoading ? (
        <div className="m-auto">
          <SkeletonCard />
        </div>
      ) : (
        <div className="w-full items-center justify-between space-x-4 p-4 md:flex">
          {studentInfo.studentProfile ? (
            <>
              <StudentInfoCard studentInfo={studentInfo} />
              <StudentAssignForm initialValue={studentInfo} params={{ id }} />
            </>
          ) : (
            <Card className="m-auto">
              <CardHeader className="m-auto">
                Student has no profile yet.
              </CardHeader>
            </Card>
          )}
        </div>
      )}
    </>
  );
};

export default ManageStudentIdPage;
