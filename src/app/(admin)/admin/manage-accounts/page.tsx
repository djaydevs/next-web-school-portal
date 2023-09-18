"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchUsers } from "@/hooks/getUsers";
import AccountTable from "@/components/account-table";
import { SkeletonTable } from "@/components/loading";
import { columns } from "@/components/columns";

export const metadata = {
  title: "Manage Accounts | Admin Portal",
  description: "Admin Portal Account Management",
};

export default function ManageAccountsLayout() {
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
  return (
    <section className="grow">
      <div className="h-full flex-1 flex-col space-y-8 p-6 md:flex">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Manage Accounts</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of accounts you can manage as a portal
            admin/registrar.
          </p>
        </div>
        <AccountTable columns={columns} data={data.users} />
      </div>
    </section>
  );
}
