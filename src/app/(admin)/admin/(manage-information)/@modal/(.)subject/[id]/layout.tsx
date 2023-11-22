export const metadata = {
  title: "Subject Details | Admin Portal",
  description: "Admin Portal Subject",
};

export default function SubjectLayoutId({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
