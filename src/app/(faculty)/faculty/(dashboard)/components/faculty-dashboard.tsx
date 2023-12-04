"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

import Heading from "@/components/ui/heading";
import DashboardCalendar from "@/components/dashboard-calendar";
import { getCurrentUser } from "@/hooks/getUsers";
import { Faculty, User } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function FacultyDashboard() {
  const {
    data: currentUser,
    isPending: isLoadingCurrentUser,
    isError: isErrorFetchingCurrentUser,
    error,
  } = useQuery<Faculty>({
    queryKey: ["currentUser"],
    queryFn: async () => getCurrentUser(),
  });

  return (
    <div className="items-start justify-between px-4 md:flex md:pl-4 md:pr-0">
      <section className="grow space-y-2">
        <div className="flex items-center gap-4">
          <Image
            src="/dash-pic.png"
            width={180}
            height={180}
            alt="dashboard picture"
            className="mx-auto"
          />
          {currentUser?.facultyProfile ? (
            <Heading size="sm" className="grow py-4">
              Welcome, {currentUser.facultyProfile.firstName} !
            </Heading>
          ) : (
            <Heading size="sm" className="grow py-4">
              Welcome, Faculty !
            </Heading>
          )}
        </div>
        <Card>
          <CardHeader>
            <CardTitle>How to use faculty portal?</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-full space-y-2 p-4 md:h-[350px]">
              <p> Encoding grades procedure</p>
              <br />
              <ul>
                <li>
                  <p>Step 1: Filtering out students</p>
                  <p>There are four methods to filter out your students </p>
                  <p>1. Search student by name in search bar</p>
                  <p>2. By grade level</p>
                  <p>3. By strand, and;</p>
                  <p>4. By section</p>
                </li>
                <li>
                  <p>Step 2: Encoding student grades</p>
                  <p>
                    1. After filtering out students, click “details” button at
                    the right side of the student info
                  </p>
                  <p>
                    2. You&apos;ll directed to “Manage Report Card Details”
                    where student information is shown.
                  </p>
                  <p>
                    3. At the right side of student info, there&apos;s an “Add
                    Grade” table, to add grades:
                  </p>
                  <p>a. Select a subject by clicking the dropdown box</p>
                  <p>
                    b. Under the dropdown box, input the corresponding grade for
                    first and second quarter
                  </p>
                  <p>c. Click “Save Changes”</p>
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
