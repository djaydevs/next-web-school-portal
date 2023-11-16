"use client";

import { FC } from "react";
import { getCurrentUser } from "@/hooks/getUsers";
import { useQuery } from "@tanstack/react-query";
import { Faculty } from "@/types";

import AddFacultyProfileForm from "@/components/add-facultyprofile";
import { SkeletonCard } from "@/components/loading";
import EditFacultyProfileForm from "./components/edit-facultyprofile";
import FacultyInfoCard from "@/components/faculty-info-card";

interface FacultyProfilePageProps {}

const FacultyProfilePage: FC<FacultyProfilePageProps> = ({}) => {
  const {
    data: currentUser,
    isPending: isLoadingCurrentUser,
    isError: isErrorFetchingCurrentUser,
    error,
  } = useQuery<Faculty>({
    queryKey: ["currentUser"],
    queryFn: async () => getCurrentUser(),
  });

  if (isErrorFetchingCurrentUser) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <h2 className="px-4 text-2xl font-bold tracking-tight">
        Manage your profile
      </h2>
      {isLoadingCurrentUser ? (
        <div className="m-auto">
          <SkeletonCard />
        </div>
      ) : (
        <>
          {currentUser.facultyProfile ? (
            <div className="w-full items-center justify-between space-x-4 p-4 md:flex">
              <FacultyInfoCard facultyInfo={currentUser} />
              <EditFacultyProfileForm />
            </div>
          ) : (
            <div className="m-auto flex h-[500px] w-full items-center justify-center">
              <AddFacultyProfileForm />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default FacultyProfilePage;
