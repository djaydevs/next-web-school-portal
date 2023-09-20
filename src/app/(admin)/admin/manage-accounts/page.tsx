"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchUsers } from "@/hooks/getUsers";
import AccountTable from "@/components/account-table";
import { SkeletonTable } from "@/components/loading";
import { columns } from "@/components/columns";

export default function ManageAccountsPage() {
  // TODO: Make this a server component but still using useQuery
  // TODO: Add image and email to table
  // TODO: Add status to the schema
  // TODO: Modify the actions necessary for managing accounts
  // TODO: Add asc and desc to name column
  // TODO: Change the icon to the column header
  const { data, isLoading } = useQuery({
    queryFn: () => fetchUsers(),
    queryKey: ["users"],
  });

  if (isLoading) {
    return <SkeletonTable />;
  }

  return <AccountTable columns={columns} data={data.users} />;
}
