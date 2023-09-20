import InviteNewAccount from "@/components/invite-new-account";

export const metadata = {
  title: "Manage Accounts | Admin Portal",
  description: "Admin Portal Account Management",
};

export default function ManageAccountsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grow">
      <div className="h-full flex-1 flex-col space-y-6 p-6 md:flex">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Manage Accounts</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of accounts you can manage as a portal
            admin/registrar.
          </p>
        </div>
        <InviteNewAccount />
        {children}
      </div>
    </section>
  );
}
