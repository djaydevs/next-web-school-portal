import Heading from "@/components/ui/heading";
import DashboardCalendar from "@/components/dashboard-calendar";
import { getCurrentUser } from "@/hooks/getUsers";
import EnrollmentStats from "@/components/enrollment-stats";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function AdminDashboardOverview() {
  const currentUser = await getCurrentUser();
  return (
    <div className="md:flex">
      <section>
        {currentUser?.name && (
          <Heading size="sm" className="grow">
            Welcome, {currentUser.name}
          </Heading>
        )}
        <Card className="my-2 mr-2">
          <CardHeader>
            <CardTitle>Enrollment</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <EnrollmentStats />
          </CardContent>
        </Card>
      </section>
      <section className="mx-auto hidden w-auto flex-none object-contain md:flex">
        <DashboardCalendar />
      </section>
    </div>
  );
}
