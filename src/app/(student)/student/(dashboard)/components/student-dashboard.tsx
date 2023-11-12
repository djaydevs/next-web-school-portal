"use client";

import { useQuery } from "@tanstack/react-query";

import Heading from "@/components/ui/heading";
import DashboardCalendar from "@/components/dashboard-calendar";
import { getCurrentUser } from "@/hooks/getUsers";
import { User } from "@/types";

export default function StudentDashboard() {
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
    <div className="md:flex">
      <section className="grow">
        {currentUser?.name ? (
          <Heading size="sm" className="grow py-2">
            Welcome, {currentUser.name.split(" ")[0]} !
          </Heading>
        ) : (
          <Heading size="sm" className="grow">
            Welcome, Student !
          </Heading>
        )}
      </section>
      <section className="mx-auto hidden w-auto flex-none object-contain p-4 md:flex">
        <DashboardCalendar />
      </section>
    </div>
  );
}
