export const metadata = {
  title: "Faculty Record | Admin Portal",
  description: "Admin Portal Faculty Record",
};

export default function FacultyRecordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
