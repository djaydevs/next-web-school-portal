import "@/styles/globals.css";
import { FacultySidebar } from "@/components/sidebar/FacultySidebar";
import Providers from "@/components/Providers";
import FacultyNavbar from "@/components/navbar/FacultyNavbar";

const FacultyPortalLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <html>
      <body className="h-full relative">
        <aside className="hidden h-full md:flex md:w-20 lg:w-64 md:flex-col md:fixed md:inset-y-0 z-80 bg-background">
          <FacultySidebar />
        </aside>
        <main className="md:pl-20 lg:pl-64 pb-10 bg-background">
          <Providers>
            <FacultyNavbar />
          </Providers>
          {children}
        </main>
      </body>
    </html>
  );
};

export default FacultyPortalLayout;
