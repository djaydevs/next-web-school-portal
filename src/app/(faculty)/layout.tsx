import "@/styles/globals.css";

import { mulish } from "@/lib/fonts";
import { FacultySidebar } from "@/components/sidebar/faculty-sidebar";
import Providers from "@/components/providers";
import FacultyNavbar from "@/components/navbar/faculty-navbar";

const FacultyPortalLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <html lang="en" className={mulish.className}>
      <head>
        <link rel="icon" href="/mja-logo.png" sizes="any" />
      </head>
      <body className="relative h-full">
        <Providers>
          <aside className="z-80 hidden h-full bg-background md:fixed md:inset-y-0 md:flex md:w-20 md:flex-col lg:w-64">
            <FacultySidebar />
          </aside>
          <main className="bg-background pb-10 md:pl-20 lg:pl-64">
            <FacultyNavbar />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
};

export default FacultyPortalLayout;
