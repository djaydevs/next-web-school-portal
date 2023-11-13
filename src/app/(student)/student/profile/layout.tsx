export const metadata = {
  title: "Profile | Student Portal",
  description: "Student Portal Profile",
};

export default function StudentProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
