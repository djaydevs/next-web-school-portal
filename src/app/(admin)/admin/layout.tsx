import "@/styles/globals.css";

import { mulish } from "@/lib/fonts";
import { AdminSidebar } from "@/components/sidebar/admin-sidebar";
import AdminNavbar from "@/components/navbar/admin-navbar";
import Providers from "@/components/providers";

export default function AdminPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={mulish.className}>
      <head>
        <link rel="icon" href="/mja-logo.png" sizes="any" />
      </head>
      <body className="relative h-full">
        <Providers>
          <aside className="z-80 hidden h-full bg-background md:fixed md:inset-y-0 md:flex md:w-20 md:flex-col lg:w-64">
            <AdminSidebar />
          </aside>
          <main className="bg-background pb-10 md:pl-20 lg:pl-64">
            <AdminNavbar />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
