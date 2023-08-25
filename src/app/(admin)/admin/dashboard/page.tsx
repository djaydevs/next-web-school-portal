"use client";

import { FC } from "react";
import * as React from "react";

import { Calendar } from "@/components/ui/calendar";
import Heading from "@/components/ui/heading";

interface adminDashboardProps {}

const AdminDashboard: FC<adminDashboardProps> = ({}) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="md:flex">
      <section className="grow">
        <Heading size="sm">Welcome, Admin!</Heading>
      </section>
      <section className="hidden md:flex flex-none w-auto object-contain p-4 mx-auto">
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
