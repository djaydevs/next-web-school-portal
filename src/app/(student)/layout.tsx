import "@/styles/globals.css";

import { mulish } from "@/lib/fonts";
import { StudentSidebar } from "@/components/sidebar/student-sidebar";
import Providers from "@/components/providers";
import StudentNavbar from "@/components/navbar/student-navbar";

const StudentPortalLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <html lang="en" className={mulish.className}>
      <body className="relative h-full">
        <Providers>
          <aside className="z-80 hidden h-full bg-background md:fixed md:inset-y-0 md:flex md:w-20 md:flex-col lg:w-64">
            <StudentSidebar />
          </aside>
          <main className="bg-background pb-10 md:pl-20 lg:pl-64">
            <StudentNavbar />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
};

export default StudentPortalLayout;
