import "@/styles/globals.css";
import { StudentSidebar } from "@/components/sidebar/StudentSidebar";
import Providers from "@/components/Providers";
import StudentNavbar from "@/components/navbar/StudentNavbar";

const StudentPortalLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <html>
      <body className="h-full relative">
        <aside className="hidden h-full md:flex md:w-20 lg:w-64 md:flex-col md:fixed md:inset-y-0 z-80 bg-background">
          <StudentSidebar />
        </aside>
        <main className="md:pl-20 lg:pl-64 pb-10 bg-background">
          <Providers>
            <StudentNavbar />
          </Providers>
          {children}
        </main>
      </body>
    </html>
  );
};

export default StudentPortalLayout;
