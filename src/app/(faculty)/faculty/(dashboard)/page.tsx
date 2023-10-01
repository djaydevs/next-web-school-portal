import FacultyDashboard from "@/components/faculty-dashboard";

export const metadata = {
  title: "Dashboard | Faculty Portal",
  description: "Faculty Portal Dashboard",
};

export default async function FacultyDashboardPage() {
  return (
    <div>
      <FacultyDashboard />
    </div>
  );
}
