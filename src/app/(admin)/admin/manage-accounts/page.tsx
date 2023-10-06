"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchUsers } from "@/hooks/getUsers";
import AccountTable from "@/components/account-table";
import InviteNewAccount from "@/components/invite-new-account";
import { SkeletonTable } from "@/components/loading";
import { columns } from "@/components/columns";
import { User } from "@/types";

export default function ManageAccountsPage() {
  // TODO: 1 Add the ability to add a new account by integrating invitation links through email
  // TODO: 2 Add status to the schema and change it automatically
  // TODO: 3 Add the functionality to change roles
  // TODO: 4 Add the ability to delete accounts but not the ability to delete the account of the current user
  // TODO: 5 Add the ability to delete accounts but not the student/faculty details for archiving purposes
  const { data, isLoading } = useQuery({
    queryFn: () => fetchUsers(),
    queryKey: ["users"],
  });

  return (
    <div className="h-full flex-1 flex-col space-y-6 p-6 md:flex">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Manage Accounts</h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of accounts you can manage as a portal
          admin/registrar.
        </p>
      </div>
      <InviteNewAccount />
      {isLoading ? (
        <SkeletonTable />
      ) : (
        <AccountTable columns={columns} data={data.users} />
      )}
    </div>
  );
}
