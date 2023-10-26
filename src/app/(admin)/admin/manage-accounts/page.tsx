"use client";

import axios, { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { fetchUsers } from "@/hooks/getUsers";
import AccountTable from "@/components/account-table";
import InviteNewAccount from "@/components/invite-new-account";
import { SkeletonTable } from "@/components/loading";
import { columns } from "@/components/columns";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@/types";

export default function ManageAccountsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();

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
      router.refresh();
    },
  });

  const handleInvite = (users: any) => {
    createUser(users);
  };

  const handleInviteUser: SubmitHandler<User> = async (users) => {
    createUser(users);
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
      <form onSubmit={handleSubmit(handleInvite)}>
        <input
          {...register("email")}
          type="email"
          placeholder="some@example.com"
        />
        <select {...register("role")}>
          <option value="">Select...</option>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      <InviteNewAccount
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
