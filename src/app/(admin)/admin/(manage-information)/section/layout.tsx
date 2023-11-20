export const metadata = {
    title: "Section | Admin Portal",
    description: "Admin Portal Section",
  };
  
  export default function SectionLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return <section>{children}</section>;
  }
  