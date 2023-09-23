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
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
