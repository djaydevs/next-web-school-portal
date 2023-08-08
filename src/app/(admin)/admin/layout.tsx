import "@/styles/globals.css";
import { AdminSidebar } from "@/components/sidebar/AdminSidebar";
import AdminNavbar from "@/components/navbar/AdminNavbar";
import Providers from "@/components/Providers";

export default function AdminPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="h-full relative">
        <aside className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-900">
          <AdminSidebar />
        </aside>
        <main className="md:pl-72 pb-10 bg-background">
          <Providers>
            <AdminNavbar />
          </Providers>
          {children}
        </main>
      </body>
    </html>
  );
}
