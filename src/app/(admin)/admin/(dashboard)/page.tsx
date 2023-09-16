import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminDashboardOverview from "@/components/dash-overview";

export const metadata = {
  title: "Dashboard | Admin Portal",
  description: "Admin Portal Dashboard",
};

export default async function AdminDashboard() {
  return (
    <Tabs defaultValue="overview" className="w-full p-4">
      <TabsList className="grid w-full md:w-[400px] grid-cols-2">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <AdminDashboardOverview />
      </TabsContent>
      <TabsContent value="reports"></TabsContent>
    </Tabs>
  );
}
