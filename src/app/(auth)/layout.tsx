import "@/styles/globals.css";

import { mulish } from "@/lib/fonts";
import Providers from "@/components/providers";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={mulish.className}>
      <head>
        <link rel="icon" href="/mja-logo.png" sizes="any" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
