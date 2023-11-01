export const metadata = {
  title: "Section & Subject | Admin Portal",
  description: "Admin Portal Add Section & Subject",
};

export default function SectionAndSubjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
