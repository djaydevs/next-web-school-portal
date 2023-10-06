"use client";

import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";

import { fetchUserById } from "@/hooks/getUsers";
import { User } from "@/types";

interface ManageAccountIdPageProps {
  params: {
    id: string;
  };
}

const ManageAccountIdPage: FC<ManageAccountIdPageProps> = ({ params }) => {
  const { id } = params;

  const { data: userInfo, isLoading } = useQuery<User>({
    queryKey: ["user", id],
    queryFn: async () => fetchUserById(id),
  });

  // const handleRoleChange: SubmitHandler<FormInputPost> = async (data) => {
  // TODO: handle role change in this section
  // }

  if (isLoading) {
    return <div>Loading...</div>; // TODO: add skeleton loading
  }

  return (
    <div>
      <p>{userInfo?.name}</p>
    </div>
  );
};

export default ManageAccountIdPage;
