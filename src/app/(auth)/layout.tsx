import "@/styles/globals.css";

import { mulish } from "@/lib/fonts";
import Providers from "@/components/Providers";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={mulish.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
