import "@/styles/globals.css";

import { poppins } from "@/lib/fonts";
import { AdminSidebar } from "@/components/sidebar/AdminSidebar";
import AdminNavbar from "@/components/navbar/AdminNavbar";
import Providers from "@/components/Providers";

export default function AdminPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="h-full relative">
        <aside className="hidden h-full md:flex md:w-20 lg:w-64 md:flex-col md:fixed md:inset-y-0 z-80 bg-background">
          <AdminSidebar />
        </aside>
        <main className="md:pl-20 lg:pl-64 pb-10 bg-background">
          <AdminNavbar />
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
