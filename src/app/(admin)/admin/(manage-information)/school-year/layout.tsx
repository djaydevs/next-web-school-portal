export const metadata = {
  title: "School Year | Admin Portal",
  description: "Admin Portal School Year",
};

export default function SchoolYearLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
