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
import DashboardCards from "./dash-cards";

export default async function AdminDashboardOverview() {
  const currentUser = await getCurrentUser();

  return (
    <div>
      {currentUser?.name ? (
        <Heading size="sm" className="grow">
          Welcome, {currentUser.name}
        </Heading>
      ) : (
        <Heading size="sm" className="grow">
          Welcome, Admin
        </Heading>
      )}
      <div className="flex w-full flex-auto flex-col flex-wrap justify-around">
        <section>
          <DashboardCards />
        </section>
        <section>
          <Card className="my-2 mr-2">
            <CardHeader>
              <CardTitle>Enrollment</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <EnrollmentStats />
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
