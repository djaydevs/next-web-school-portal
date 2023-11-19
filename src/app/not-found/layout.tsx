import { Metadata } from "next";
import "@/styles/globals.css";
import { montserrat } from "@/lib/fonts";

import Providers from "@/components/providers";

export const metadata: Metadata = {
  title: "Mary Josette Academy | Not Found",
  description: "Official website of Mary Josette Academy",
};

export default function NotFoundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.className}>
      <head>
        <link rel="icon" href="/mja-logo.png" sizes="any" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
