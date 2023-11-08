export const metadata = {
  title: "Profile | Admin Portal",
  description: "Admin Portal Profile",
};

export default function AdminProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
