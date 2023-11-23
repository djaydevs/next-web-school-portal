"use client";

import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { Subject } from "@/types";

import AddSubjectForm from "@/components/add-subject-form";
import { fetchSubjects } from "@/hooks/getInfos";
import { SkeletonTable } from "@/components/loading";
import SubjectTable from "@/components/subject-table";

interface SubjectPageProps {}

const SubjectPage: FC<SubjectPageProps> = ({}) => {
  const {
    data: subjects,
    isPending: isLoadingSubjects,
    isError: isErrorFetchingSubjects,
    error: subjectsError,
  } = useQuery<Subject[]>({
    queryKey: ["subjects"],
    queryFn: async () => fetchSubjects(),
  });

  if (isErrorFetchingSubjects) {
    return <span>Error: {subjectsError.message}</span>;
  }

  return (
    <div className="h-full flex-1 flex-col space-y-4 px-4 md:flex">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Manage Subject</h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of subject you can manage as a portal
          admin/registrar.
        </p>
      </div>
      <div className="flex">
        <AddSubjectForm />
      </div>
      {isLoadingSubjects ? (
        <SkeletonTable />
      ) : (
        <SubjectTable subjectInfo={subjects} />
      )}
    </div>
  );
};

export default SubjectPage;
