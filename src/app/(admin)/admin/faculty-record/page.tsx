"use client";

import { FC } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchFaculty } from "@/hooks/getUsers";
import FacultyTable from "@/components/faculty-table";
import { SkeletonTable } from "@/components/loading";
import { columns } from "@/components/faculty-columns";
import { Faculty } from "@/types";

interface FacultyRecordPageProps {}

const FacultyRecordPage: FC<FacultyRecordPageProps> = ({}) => {
  const {
    data: faculties,
    isPending: isLoadingFacultyTable,
    isError: isErrorFetchingFaculties,
    error,
  } = useQuery<Faculty[]>({
    queryKey: ["faculties"],
    queryFn: async () => fetchFaculty(),
  });

  if (isErrorFetchingFaculties) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="h-full flex-1 flex-col space-y-4 px-4 md:flex">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Manage Faculty Record
        </h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of faculty records you can manage as an
          admin/registrar.
        </p>
      </div>
      {isLoadingFacultyTable ? (
        <SkeletonTable />
      ) : (
        <FacultyTable columns={columns} data={faculties} />
      )}
    </div>
  );
};

export default FacultyRecordPage;
