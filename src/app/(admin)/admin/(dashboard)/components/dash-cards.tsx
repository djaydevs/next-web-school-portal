import { FC } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DashboardCardsProps {}

const DashboardCards: FC<DashboardCardsProps> = ({}) => {
  const { data: studentData, isError: studentError, error: studentErrorDetails } = useQuery({
    queryKey: ["dashboardStudentCounts"],
    queryFn: async () => {
      const response = await fetch("/api/student");
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return response.json();
    },
  });

  const { data: facultyData, isError: facultyError, error: facultyErrorDetails } = useQuery({
    queryKey: ["dashboardFacultyCounts"],
    queryFn: async () => {
      const response = await fetch("/api/faculty");
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return response.json();
    },
  });

  if (studentError || facultyError) {
    return (
      <div>
        <span>Error fetching data:</span>
        <pre>{studentError ? studentErrorDetails!.message : facultyErrorDetails!.message}</pre>
      </div>
    );
  }

  const studentCount = studentData?.length || 0;
  const facultyCount = facultyData?.length || 0;

  return (
    <div className="flex w-full gap-4">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Existing Students
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{studentCount}</div>
          {/* <p className="text-xs text-muted-foreground">
            +180.1% from last month
          </p> */}
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Faculty Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{facultyCount}</div>
          {/* <p className="text-xs text-muted-foreground">+201 since last hour</p> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCards;
