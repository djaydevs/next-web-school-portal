import getCurrentUser from "@/app/actions/getCurrentUser";
import StudentDashboard from "@/components/student/dashboard/student-dashboard";

export const metadata = {
  title: "Dashboard | Student Portal",
  description: "Student Portal Dashboard",
};

export default async function StudentDashboardLayout() {
  const user = await getCurrentUser();

  return (
    <div>
      <StudentDashboard currentUser={user} />
    </div>
  );
}
