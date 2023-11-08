export const metadata = {
  title: "Student Record | Admin Portal",
  description: "Admin Portal Student Record",
};

export default function StudentRecordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
