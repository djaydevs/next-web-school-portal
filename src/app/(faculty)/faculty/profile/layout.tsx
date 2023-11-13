export const metadata = {
  title: "Profile | Faculty Portal",
  description: "Faculty Portal Profile",
};

export default function FacultyProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
