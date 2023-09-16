import "@/styles/globals.css";

import { mulish } from "@/lib/fonts";
import { StudentSidebar } from "@/components/sidebar/StudentSidebar";
import Providers from "@/components/providers";
import StudentNavbar from "@/components/navbar/StudentNavbar";

const StudentPortalLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <html lang="en" className={mulish.className}>
      <body className="h-full relative">
        <aside className="hidden h-full md:flex md:w-20 lg:w-64 md:flex-col md:fixed md:inset-y-0 z-80 bg-background">
          <StudentSidebar />
        </aside>
        <main className="md:pl-20 lg:pl-64 pb-10 bg-background">
          <Providers>
            <StudentNavbar />
            {children}
          </Providers>
        </main>
      </body>
    </html>
  );
};

export default StudentPortalLayout;
