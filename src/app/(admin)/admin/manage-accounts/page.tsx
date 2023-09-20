"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchUsers } from "@/hooks/getUsers";
import AccountTable from "@/components/account-table";
import { SkeletonTable } from "@/components/loading";
import { columns } from "@/components/columns";

export default function ManageAccountsPage() {
  // TODO: 1 Add the ability to add a new account by integrating invitation links through email
  // TODO: 2 Add status to the schema and change it automatically
  // TODO: 3 Add the modal or sheet component for the details of the account
  // TODO: 4 Add the functionality to change roles
  // TODO: 5 Add the ability to delete accounts but not the ability to delete the account of the current user
  // TODO: 6 Add the ability to delete accounts but not the student/faculty details for archiving purposes
  const { data, isLoading } = useQuery({
    queryFn: () => fetchUsers(),
    queryKey: ["users"],
  });

  if (isLoading) {
    return <SkeletonTable />;
  }

  return <AccountTable columns={columns} data={data.users} />;
}
