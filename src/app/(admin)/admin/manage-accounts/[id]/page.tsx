"use client";

import { FC } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import * as z from "zod";

import { fetchUserById } from "@/hooks/getUsers";
import { User, userSchema } from "@/types";
import UserInfoCard from "@/components/user-info-card";
import UserUpdateForm from "@/components/user-update-form";
import { useToast } from "@/components/ui/use-toast";
import { SkeletonCard } from "@/components/loading";

interface ManageAccountIdPageProps {
  params: {
    id: string;
  };
}

const ManageAccountIdPage: FC<ManageAccountIdPageProps> = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const { toast } = useToast();

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
        <div className="w-full justify-between space-x-4 p-4 md:flex">
          <UserInfoCard userInfo={userInfo} />
          <UserUpdateForm initialValue={userInfo} params={{ id }} />
        </div>
      )}
    </>
  );
};

export default ManageAccountIdPage;
