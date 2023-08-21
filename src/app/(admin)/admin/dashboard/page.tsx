"use client";

import { FC } from "react";
import * as React from "react";

import { Calendar } from "@/components/ui/calendar";
import Heading from "@/components/ui/heading";

interface adminDashboardProps {}

const AdminDashboard: FC<adminDashboardProps> = ({}) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      <section className="col-span-2">
        <Heading size="sm">Admin Dashboard</Heading>
      </section>
      <section className="mx-auto">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </section>
    </div>
  );
};

export default AdminDashboard;
