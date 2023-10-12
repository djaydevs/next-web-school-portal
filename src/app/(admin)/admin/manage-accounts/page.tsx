"use client";

import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

import { fetchUsers } from "@/hooks/getUsers";
import AccountTable from "@/components/account-table";
import InviteNewAccount from "@/components/invite-new-account";
import { SkeletonTable } from "@/components/loading";
import { columns } from "@/components/columns";
import { User } from "@/types";

export default function ManageAccountsPage() {
  // TODO: 4 Add the ability to delete accounts but not the ability to delete the account of the current user
  // TODO: 5 Add the ability to delete accounts but not the student/faculty details for archiving purposes
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryFn: () => fetchUsers(),
    queryKey: ["users"],
  });

  const { mutate: createUser, isLoading: isLoadingSubmit } = useMutation({
    mutationFn: (newInvite: User) => {
      return axios.post("/api/user", newInvite);
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      // router.push("/admin/manage-accounts");
      router.refresh();
    },
  });

  const handleInvite: SubmitHandler<User> = async (data) => {
    createUser(data);
  };

  return (
    <div className="h-full flex-1 flex-col space-y-6 p-6 md:flex">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Manage Accounts</h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of accounts you can manage as a portal
          admin/registrar.
        </p>
      </div>
      <InviteNewAccount
        onSubmit={handleInvite}
        isLoadingSubmit={isLoadingSubmit}
        isEditing
      />
      {isLoading ? (
        <SkeletonTable />
      ) : (
        <AccountTable columns={columns} data={data.users} />
      )}
    </div>
  );
}
