import "@/styles/globals.css";
import { AdminSidebar } from "@/components/sidebar/AdminSidebar";

const AdminPortalLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-full relative">
      <aside className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-900">
        <AdminSidebar />
      </aside>
      <main className="md:pl-72 pb-10 bg-background">
        {/* <Navbar /> */}
        {children}
      </main>
    </div>
  );
};

export default AdminPortalLayout;
