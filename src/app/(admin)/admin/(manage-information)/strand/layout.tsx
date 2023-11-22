export const metadata = {
  title: "Strand | Admin Portal",
  description: "Admin Portal Strand",
};

export default function StrandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
