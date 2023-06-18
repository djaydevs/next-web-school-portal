import { Montserrat } from "next/font/google";

import "@/styles/globals.css";
import Navbar from "@/components/home/Navbar";
import Providers from "@/components/ui/Providers";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.className}>
      <body>
        <Providers>
          <Navbar />
        </Providers>
        {children}
      </body>
    </html>
  );
}
