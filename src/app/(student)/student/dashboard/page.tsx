import StudentDashboard from "@/components/student/dashboard/student-dashboard";

export const metadata = {
  title: "Dashboard | Student Portal",
  description: "Student Portal Dashboard",
};

export default async function StudentDashboardLayout() {
  return (
    <div>
      <StudentDashboard />
    </div>
  );
}
