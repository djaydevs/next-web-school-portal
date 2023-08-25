export const metadata = {
  title: "Dashboard | Student Portal",
  description: "Student Portal Dashboard",
};

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
