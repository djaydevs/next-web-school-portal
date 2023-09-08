import FacultyDashboard from "@/components/faculty/dashboard/faculty-dashboard";

export const metadata = {
  title: "Dashboard | Faculty Portal",
  description: "Faculty Portal Dashboard",
};

export default async function FacultyDashboardLayout() {
  return (
    <div>
      <FacultyDashboard />
    </div>
  );
}
