import getAllUsers from "@/actions/getAllUsers";
import Heading from "@/components/ui/heading";
import AccountTable from "@/components/admin/manage-accounts/account-table";

export const metadata = {
  title: "Manage Accounts | Admin Portal",
  description: "Admin Portal Account Settings",
};

export default async function ManageAccountsLayout() {
  const users = await getAllUsers();

  return (
    <section className="grow">
      <Heading size="sm">Manage Accounts</Heading>
      <div>
        <AccountTable />
      </div>
    </section>
  );
}
