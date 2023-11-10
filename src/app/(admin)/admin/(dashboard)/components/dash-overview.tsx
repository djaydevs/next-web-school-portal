"use client";

import { useQuery } from "@tanstack/react-query";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import DashboardCalendar from "@/components/dashboard-calendar";
import { getCurrentUser } from "@/hooks/getUsers";
import EnrollmentStats from "@/components/enrollment-stats";
import DashboardCards from "@/components/dash-cards";
import { User } from "@/types";

export default function AdminDashboardOverview() {
  const {
    data: currentUser,
    isPending: isLoadingCurrentUser,
    isError: isErrorFetchingCurrentUser,
    error,
  } = useQuery<User>({
    queryKey: ["currentUser"],
    queryFn: async () => getCurrentUser(),
  });

  return (
    <div>
      {currentUser?.name ? (
        <Heading size="sm" className="grow py-2">
          Welcome, {currentUser.name}
        </Heading>
      ) : (
        <Heading size="sm" className="grow">
          Welcome, Admin
        </Heading>
      )}
      <div className="flex w-full flex-col">
        <section className="w-full py-2 pr-4">
          <DashboardCards />
        </section>
        <section>
          <Card className="my-2 mr-4">
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
