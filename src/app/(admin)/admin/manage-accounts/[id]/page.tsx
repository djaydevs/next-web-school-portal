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

  const { mutate: updateUser, isPending: isLoadingSubmit } = useMutation({
    mutationFn: (update: User) => {
      return axios.patch(`/api/user/${id}`, update);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 500) {
          toast({
            title: "Error",
            description: "Something went wrong! Please try again later.",
            variant: "destructive",
          });
        }
      }
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "User updated successfully!",
      });
      router.push("/admin/manage-accounts");
      router.refresh();
    },
  });

  const handleUpdateUser = (updateInfo: z.infer<typeof userSchema>) => {
    updateUser(updateInfo);
  };

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
          <UserUpdateForm
            onSubmit={handleUpdateUser}
            initialValue={userInfo}
            isLoadingSubmit={isLoadingSubmit}
          />
        </div>
      )}
    </>
  );
};

export default ManageAccountIdPage;
