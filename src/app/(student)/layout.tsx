import { StudentSidebar } from "@/components/sidebar/StudentSidebar";

const StudentPortalLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-full relative">
      <aside className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-900">
        <StudentSidebar />
      </aside>
      <main className="md:pl-72 pb-10">
        {/* <Navbar /> */}
        {children}
      </main>
    </div>
  );
};

export default StudentPortalLayout;
