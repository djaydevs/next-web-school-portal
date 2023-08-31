export const metadata = {
  title: "Manage Accounts | Admin Portal",
  description: "Admin Portal Account Settings",
};

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
