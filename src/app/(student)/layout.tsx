import "@/styles/globals.css";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { poppins } from "@/lib/fonts";
import { authOptions } from "@/lib/auth";
import { StudentSidebar } from "@/components/sidebar/StudentSidebar";
import Providers from "@/components/Providers";
import StudentNavbar from "@/components/navbar/StudentNavbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const StudentPortalLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await getServerSession(authOptions);
  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/signin",
  //       permanent: false,
  //     },
  //   };
  // }

  if (session?.user.role !== "STUDENT") {
    throw new Error("User is not a student");
    // return redirect("/signin");
  }

  return (
    <html lang="en" className={poppins.className}>
      <body className="h-full relative">
        <aside className="hidden h-full md:flex md:w-20 lg:w-64 md:flex-col md:fixed md:inset-y-0 z-80 bg-background">
          <StudentSidebar />
        </aside>
        <main className="md:pl-20 lg:pl-64 pb-10 bg-background">
          <Providers>
            <StudentNavbar user={session?.user} />
          </Providers>
          <Avatar>
            {session?.user?.image && (
              <AvatarImage src={session?.user?.image} alt="avatar image" />
            )}
            <AvatarFallback>{session?.user?.name}</AvatarFallback>
          </Avatar>
          {children}
        </main>
      </body>
    </html>
  );
};

export default StudentPortalLayout;
