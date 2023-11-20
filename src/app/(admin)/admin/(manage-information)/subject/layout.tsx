export const metadata = {
  title: "Subject | Admin Portal",
  description: "Admin Portal Subject",
};

export default function SubjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
