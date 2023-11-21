"use client";

import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { SchoolYear } from "@prisma/client";

import AddSchoolYearForm from "@/components/add-schoolyear-form";
import { fetchSchoolYear } from "@/hooks/getInfos";
import { SkeletonTable } from "@/components/loading";
import SchoolYearTable from "@/components/school-year-table";

interface SchoolYearPageProps {}

const SchoolYearPage: FC<SchoolYearPageProps> = ({}) => {
  const {
    data: schoolYears,
    isPending: isLoadingSchoolYears,
    isError: isErrorFetchingSchoolYears,
    error: schoolYearsError,
  } = useQuery<SchoolYear[]>({
    queryKey: ["schoolYears"],
    queryFn: async () => fetchSchoolYear(),
  });

  if (isErrorFetchingSchoolYears) {
    return <span>Error: {schoolYearsError.message}</span>;
  }

  return (
    <div className="h-full flex-1 flex-col space-y-4 px-4 md:flex">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Manage School Year
        </h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of school year you can manage as a portal
          admin/registrar.
        </p>
      </div>
      <div className="flex">
        <AddSchoolYearForm />
      </div>
      {isLoadingSchoolYears ? (
        <SkeletonTable />
      ) : (
        <SchoolYearTable schoolYearInfo={schoolYears} />
      )}
    </div>
  );
};

export default SchoolYearPage;
