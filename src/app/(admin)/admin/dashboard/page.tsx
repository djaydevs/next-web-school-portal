import AdminDashboard from "@/components/admin/dashboard/admin-dashboard";

export const metadata = {
  title: "Dashboard | Admin Portal",
  description: "Admin Portal Dashboard",
};

export default async function AdminDashboardLayout() {
  return (
    <div>
      <AdminDashboard />
    </div>
  );
}
