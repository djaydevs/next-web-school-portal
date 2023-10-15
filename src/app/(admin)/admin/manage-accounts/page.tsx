"use client";

import axios, { AxiosError } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
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
  // TODO: 4 Add the ability to delete accounts but not the ability to delete the account of the current user
  // TODO: 5 Add the ability to delete accounts but not the student/faculty details for archiving purposes
  const router = useRouter();
  const { toast } = useToast();

  const { data, isLoading } = useQuery({
    queryFn: async () => fetchUsers(),
    queryKey: ["users"],
  });

  const { mutate: createUser, isLoading: isLoadingSubmit } = useMutation({
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
      toast({
        title: "Success",
        description: "User added successfully!",
      });
      router.push("/admin/manage-accounts");
      router.refresh();
    },
  });

  const handleInvite = (data: any) => {
    createUser(data);
  };

  const { register, handleSubmit } = useForm();

  return (
    <div className="h-full flex-1 flex-col space-y-6 px-4 md:flex">
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
        <input type="submit" />
      </form>
      <InviteNewAccount
        onSubmit={handleInvite}
        isLoadingSubmit={isLoadingSubmit}
      />
      {isLoading ? (
        <SkeletonTable />
      ) : (
        <AccountTable columns={columns} data={data.users} />
      )}
    </div>
  );
}
