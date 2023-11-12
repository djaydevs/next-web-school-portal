import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminDashboardOverview from "@/components/dash-overview";
import DashboardCalendar from "@/components/dashboard-calendar";
import { DatePickerWithRange } from "@/components/date-picker-range";

export const metadata = {
  title: "Dashboard | Admin Portal",
  description: "Admin Portal Dashboard",
};

export default function AdminDashboard() {
  return (
    <div className="flex px-4">
      <Tabs defaultValue="overview" className="max-w-full flex-auto">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <AdminDashboardOverview />
        </TabsContent>
        <TabsContent value="reports"></TabsContent>
      </Tabs>
      <div className="flex max-w-fit flex-col gap-2">
        <DashboardCalendar />
        <DatePickerWithRange />
      </div>
    </div>
  );
}
