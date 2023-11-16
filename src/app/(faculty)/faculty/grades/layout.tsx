export const metadata = {
  title: "Report Card | Faculty Portal",
  description: "Faculty Portal Report Card",
};

export default function StudentRecordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
