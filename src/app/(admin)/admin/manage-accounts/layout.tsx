export const metadata = {
  title: "Manage Accounts | Admin Portal",
  description: "Admin Portal Account Management",
};

export default function ManageAccountsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
