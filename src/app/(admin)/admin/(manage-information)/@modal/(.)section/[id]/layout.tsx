export const metadata = {
  title: "Section Details | Admin Portal",
  description: "Admin Portal Section",
};

export default function SectionLayoutId({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
