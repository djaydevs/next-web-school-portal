export const metadata = {
  title: "Report Card | Student Portal",
  description: "Student Portal Report Card",
};

export default function StudentRecordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
