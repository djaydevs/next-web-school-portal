import "@/styles/globals.css";

import { mulish } from "@/lib/fonts";
import { FacultySidebar } from "@/components/sidebar/FacultySidebar";
import Providers from "@/components/Providers";
import FacultyNavbar from "@/components/navbar/FacultyNavbar";
import getCurrentUser from "@/app/actions/getCurrentUser";

const FacultyPortalLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = await getCurrentUser();

  return (
    <html lang="en" className={mulish.className}>
      <body className="h-full relative">
        <aside className="hidden h-full md:flex md:w-20 lg:w-64 md:flex-col md:fixed md:inset-y-0 z-80 bg-background">
          <FacultySidebar />
        </aside>
        <main className="md:pl-20 lg:pl-64 pb-10 bg-background">
          <Providers>
            <FacultyNavbar currentUser={user} />
            {children}
          </Providers>
        </main>
      </body>
    </html>
  );
};

export default FacultyPortalLayout;
