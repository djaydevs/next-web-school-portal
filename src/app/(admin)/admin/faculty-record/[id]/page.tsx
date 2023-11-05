"use client";

import { FC } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import * as z from "zod";

import { fetchFacultyById } from "@/hooks/getUsers";
import { Faculty, facultySchema } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { SkeletonCard } from "@/components/loading";
import FacultyAssignForm from "@/components/faculty-assign-form";

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
    <div>
      {/* {facultyInfo?.name}
      {facultyInfo?.facultyProfile.section.map((section, index) => (
        <p key={index}>{section.sectionName}</p>
      ))} */}
      <h2 className="px-4 text-2xl font-bold tracking-tight">
        Manage Faculty Details
      </h2>
      {infoLoading ? (
        <div className="m-auto">
          <SkeletonCard />
        </div>
      ) : (
        <div className="w-full justify-between space-x-4 p-4 md:flex">
          <FacultyAssignForm initialValue={facultyInfo} params={{ id }} />
        </div>
      )}
    </div>
  );
};

export default ManageFacultyRecord;
