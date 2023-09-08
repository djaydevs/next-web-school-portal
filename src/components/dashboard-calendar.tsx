"use client";

import React, { FC } from "react";
import { Calendar } from "./ui/calendar";

interface dashboardCalendarProps {}

const DashboardCalendar: FC<dashboardCalendarProps> = ({}) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  );
};

export default DashboardCalendar;
