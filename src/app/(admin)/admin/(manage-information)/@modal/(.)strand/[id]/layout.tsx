export const metadata = {
  title: "Strand Details | Admin Portal",
  description: "Admin Portal Strand",
};

export default function StrandLayoutId({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
