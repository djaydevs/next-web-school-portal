import StudentDashboard from "@/components/student-dashboard";

export const metadata = {
  title: "Dashboard | Student Portal",
  description: "Student Portal Dashboard",
};

export default async function StudentDashboardPage() {
  return (
    <div>
      <StudentDashboard />
    </div>
  );
}
