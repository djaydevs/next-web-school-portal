"use client";

import { FC } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchFacultyById } from "@/hooks/getUsers";
import { Faculty } from "@/types";
import { SkeletonCard } from "@/components/loading";
import FacultyAssignForm from "@/components/faculty-assign-form";
import FacultyInfoCard from "@/components/faculty-info-card";

interface ManageFacultyRecordProps {
  params: {
    id: string;
  };
}

const ManageFacultyRecord: FC<ManageFacultyRecordProps> = ({ params }) => {
  const { id } = params;

  const {
    data: facultyInfo,
    isPending: infoLoading,
    isError,
    error,
  } = useQuery<Faculty>({
    queryKey: ["faculty", id],
    queryFn: async () => fetchFacultyById(id),
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <h2 className="px-4 text-2xl font-bold tracking-tight">
        Manage Faculty Details
      </h2>
      {infoLoading ? (
        <div className="m-auto">
          <SkeletonCard />
        </div>
      ) : (
        <div className="w-full justify-between space-x-4 p-4 md:flex">
          <FacultyInfoCard facultyInfo={facultyInfo} />
          <FacultyAssignForm initialValue={facultyInfo} params={{ id }} />
        </div>
      )}
    </>
  );
};

export default ManageFacultyRecord;
