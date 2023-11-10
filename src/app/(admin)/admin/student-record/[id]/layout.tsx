export const metadata = {
  title: "Student Details | Admin Portal",
  description: "Admin Portal Student Details",
};

export default function ManageStudentIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
