import { FC } from "react";

import Heading from "@/components/ui/heading";
import AccountTable from "@/components/admin/manage-accounts/account-table";

interface adminACProps {}

const AdminAccountSettings: FC<adminACProps> = ({}) => {
  return (
    <section className="grow">
      <Heading size="sm">Manage Accounts</Heading>
      <div>
        <AccountTable />
      </div>
    </section>
  );
};

export default AdminAccountSettings;
