import getCurrentUser from "@/app/actions/getCurrentUser";
import AdminDashboard from "@/components/admin/dashboard/admin-dashboard";

export const metadata = {
  title: "Dashboard | Admin Portal",
  description: "Admin Portal Dashboard",
};

export default async function AdminDashboardLayout() {
  const user = await getCurrentUser();

  return (
    <div>
      <AdminDashboard currentUser={user} />
    </div>
  );
}
