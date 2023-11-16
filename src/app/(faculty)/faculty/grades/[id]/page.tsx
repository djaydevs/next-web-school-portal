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

interface ManageGradeIdPageProps {
  params: {
    id: string;
  };
}

const ManageGradeIdPage: FC<ManageGradeIdPageProps> = ({ params }) => {
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
        Manage Report Card Details
      </h2>
      {infoLoading ? (
        <div className="m-auto">
          <SkeletonCard />
        </div>
      ) : (
        <>
          {studentInfo.studentProfile ? (
            <div className="w-full items-center justify-between space-x-4 p-4 md:flex">
              <StudentInfoCard studentInfo={studentInfo} />
            </div>
          ) : (
            <div className="m-auto flex h-[500px] w-full items-center justify-center">
              <Card className="m-auto">
                <CardHeader className="m-auto">
                  Student is either not verified or has no profile yet.
                </CardHeader>
              </Card>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ManageGradeIdPage;
