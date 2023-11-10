import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Not Verified User",
  description: "Not Verified User",
};

export default function VerifyAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
