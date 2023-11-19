"use client";

import { FC } from "react";
import EnrollmentForm from "@/components/enrollment-form";
import { useQuery } from "@tanstack/react-query";
import { Student } from "@/types";
import { getCurrentUser } from "@/hooks/getUsers";
import { SkeletonCard } from "@/components/loading";

interface studEnrollProps {}

const StudentEnrollment: FC<studEnrollProps> = ({}) => {
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
        <h2 className="text-2xl font-bold tracking-tight">
          Pre-Enrollment for Grade 12
        </h2>
        <p className="text-muted-foreground">
          Form for pre-enrollment of existing grade 11 student to grade 12.
        </p>
      </div>
      {isLoadingCurrentUser ? (
        <SkeletonCard />
      ) : (
        <EnrollmentForm initialValue={currentUser} />
      )}
    </div>
  );
};

export default StudentEnrollment;
