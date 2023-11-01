"use client";

import * as z from "zod";
import axios, { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { fetchUsers } from "@/hooks/getUsers";
import AccountTable from "@/components/account-table";
import { SkeletonTable } from "@/components/loading";
import { columns } from "@/components/columns";
import { useToast } from "@/components/ui/use-toast";
import { User, userSchema } from "@/types";
import InviteAccount from "@/components/invite-account";

export default function ManageAccountsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: users,
    isPending: isLoadingUserTable,
    isError: isErrorFetchingUsers,
    error,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => fetchUsers(),
  });

  const { mutate: createUser, isPending: isLoadingSubmit } = useMutation({
    mutationFn: (newInvite: User) => {
      return axios.post("/api/user", newInvite);
    },
    onError: (error) => {
      // console.error(error);
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
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "Success",
        description: "User added successfully!",
      });
      router.push("/admin/manage-accounts");
      router.refresh();
    },
  });

  const handleInviteUser = (invite: z.infer<typeof userSchema>) => {
    createUser(invite);
  };

  if (isErrorFetchingUsers) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="h-full flex-1 flex-col space-y-4 px-4 md:flex">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Manage Accounts</h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of accounts you can manage as a portal
          admin/registrar.
        </p>
      </div>
      <InviteAccount
        onSubmit={handleInviteUser}
        isLoadingSubmit={isLoadingSubmit}
      />
      {isLoadingUserTable ? (
        <SkeletonTable />
      ) : (
        <AccountTable columns={columns} data={users} />
      )}
    </div>
  );
}
