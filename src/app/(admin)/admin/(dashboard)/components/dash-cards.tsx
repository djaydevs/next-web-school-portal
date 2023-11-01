import { FC } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DashboardCardsProps {}

const DashboardCards: FC<DashboardCardsProps> = ({}) => {
  return (
    <div className="flex w-full gap-4">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">New Students</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">85</div>
          {/* <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p> */}
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Existing Students
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1230</div>
          {/* <p className="text-xs text-muted-foreground">
            +180.1% from last month
          </p> */}
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Alumni</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">5,234</div>
          {/* <p className="text-xs text-muted-foreground">+19% from last month</p> */}
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Faculty Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">55</div>
          {/* <p className="text-xs text-muted-foreground">+201 since last hour</p> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCards;
