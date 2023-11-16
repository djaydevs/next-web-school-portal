"use client";

import { FC } from "react";
import { useQuery } from "@tanstack/react-query";

import { SkeletonCard } from "@/components/loading";
import { Student } from "@/types";
import { getCurrentUser } from "@/hooks/getUsers";
import ReportCard from "@/components/report-card";

interface StudentRecordPageProps {}

const StudentRecordPage: FC<StudentRecordPageProps> = ({}) => {
  const {
    data: currentUser,
    isPending: isLoadingCurrentUser,
    isError: isErrorFetchingCurrentUser,
    error,
  } = useQuery<Student>({
    queryKey: ["currentUser"],
    queryFn: async () => getCurrentUser(),
  });

  if (isErrorFetchingCurrentUser) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="h-full flex-1 flex-col space-y-4 px-4 md:flex">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">View Report Card</h2>
        <p className="text-muted-foreground">
          Here&apos;s the report card you can view as a student.
        </p>
      </div>
      {isLoadingCurrentUser ? (
        <SkeletonCard />
      ) : (
        <ReportCard studentInfo={currentUser} />
      )}
    </div>
  );
};

export default StudentRecordPage;
