import Heading from "@/components/ui/heading";
import DashboardCalendar from "@/components/dashboard-calendar";
import { getCurrentUser } from "@/hooks/getUsers";

export default async function AdminDashboardOverview() {
  const currentUser = await getCurrentUser();
  return (
    <div className="md:flex">
      <section className="grow">
        {currentUser?.name && (
          <Heading size="sm">Welcome, {currentUser.name}</Heading>
        )}
      </section>
      <section className="hidden md:flex flex-none w-auto object-contain mx-auto">
        <DashboardCalendar />
      </section>
    </div>
  );
}
