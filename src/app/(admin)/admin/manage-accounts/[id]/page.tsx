"use client";

import { FC } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchUserById } from "@/hooks/getUsers";
import { User } from "@/types";
import UserInfoCard from "@/components/user-info-card";
import UserUpdateForm from "@/components/user-update-form";
import { SkeletonCard } from "@/components/loading";

interface ManageAccountIdPageProps {
  params: {
    id: string;
  };
}

const ManageAccountIdPage: FC<ManageAccountIdPageProps> = ({ params }) => {
  const { id } = params;

  const {
    data: userInfo,
    isPending: infoLoading,
    isError,
    error,
  } = useQuery<User>({
    queryKey: ["user", id],
    queryFn: async () => fetchUserById(id),
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <h2 className="px-4 text-2xl font-bold tracking-tight">
        Manage Account Details
      </h2>
      {infoLoading ? (
        <div className="m-auto">
          <SkeletonCard />
        </div>
      ) : (
        <div className="flex w-full flex-col justify-between gap-4 p-4 md:flex-row">
          <UserInfoCard userInfo={userInfo} />
          <UserUpdateForm initialValue={userInfo} params={{ id }} />
        </div>
      )}
    </>
  );
};

export default ManageAccountIdPage;
