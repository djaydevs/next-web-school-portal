export const metadata = {
  title: "Account Details | Admin Portal",
  description: "Admin Portal Account Details",
};

export default function ManageAccountIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
