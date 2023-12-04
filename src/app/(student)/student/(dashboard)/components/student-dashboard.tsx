"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

import Heading from "@/components/ui/heading";
import DashboardCalendar from "@/components/dashboard-calendar";
import { getCurrentUser } from "@/hooks/getUsers";
import { Student } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function StudentDashboard() {
  const {
    data: currentUser,
    isPending: isLoadingCurrentUser,
    isError: isErrorFetchingCurrentUser,
    error,
  } = useQuery<Student>({
    queryKey: ["currentUser"],
    queryFn: async () => getCurrentUser(),
  });

  return (
    <div className="items-start justify-between px-4 md:flex md:pl-4 md:pr-0">
      <section className="grow space-y-2">
        <div className="w-full items-center gap-4 md:flex">
          <Image
            src="/dash-pic.png"
            width={180}
            height={180}
            alt="dashboard picture"
            className="mx-auto"
          />
          {currentUser?.studentProfile ? (
            <Heading size="sm" className="grow py-4">
              Welcome, {currentUser.studentProfile.firstName} !
            </Heading>
          ) : (
            <Heading size="sm" className="grow py-4">
              Welcome, Student !
            </Heading>
          )}
        </div>
        <Card>
          <CardHeader>
            <CardTitle>How to use student portal?</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-full space-y-2 p-4 md:h-[350px]">
              <p>Pre-enrollment Procedure</p>
              <br />
              <ul>
                <li>
                  <p>Step 1: Providel Personal Information</p>
                  <p>
                    Student information is retained. Therefore, the form is
                    already filled up. But you can still update your details
                  </p>
                </li>
                <li>
                  <p>Step 2: Provide Guardian/Parent Information</p>
                  <p>
                    Fill up the name, occupation and address of your
                    guardian/parent in the form provided.
                  </p>
                </li>
                <li>
                  <p>Step 3: Pre-registration </p>
                  <p>
                    After clicking “next” from step 2. It should display your
                    pre-registration is successful
                  </p>
                </li>
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
      </section>
      <section className="mx-auto hidden w-auto flex-none object-contain p-4 md:flex">
        <DashboardCalendar />
      </section>
    </div>
  );
}
