import getCurrentUser from "@/app/actions/getCurrentUser";
import FacultyDashboard from "@/components/faculty/dashboard/faculty-dashboard";

export const metadata = {
  title: "Dashboard | Faculty Portal",
  description: "Faculty Portal Dashboard",
};

export default async function FacultyDashboardLayout() {
  const user = await getCurrentUser();

  return (
    <div>
      <FacultyDashboard currentUser={user} />
    </div>
  );
}
