import "@/styles/globals.css";
import { montserrat } from "@/lib/fonts";

import Providers from "@/components/providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.className}>
      <head>
        <link rel="icon" href="/mja-logo.png" sizes="any" />
      </head>
      <body className="bg-brown-200/50 dark:bg-brown-800">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
