import "@/styles/globals.css";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { poppins } from "@/lib/fonts";
import { authOptions } from "@/lib/auth";
import { FacultySidebar } from "@/components/sidebar/FacultySidebar";
import Providers from "@/components/Providers";
import FacultyNavbar from "@/components/navbar/FacultyNavbar";

const FacultyPortalLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/signin");

  return (
    <html lang="en" className={poppins.className}>
      <body className="h-full relative">
        <aside className="hidden h-full md:flex md:w-20 lg:w-64 md:flex-col md:fixed md:inset-y-0 z-80 bg-background">
          <FacultySidebar />
        </aside>
        <main className="md:pl-20 lg:pl-64 pb-10 bg-background">
          <Providers>
            <FacultyNavbar user={session?.user} />
          </Providers>
          {children}
        </main>
      </body>
    </html>
  );
};

export default FacultyPortalLayout;
