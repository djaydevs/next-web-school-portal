"use client";

import { FC } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "2018 - 2019",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "2019 - 2020",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "2020 - 2021",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "2021 - 2022",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "2022 - 2023",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

interface EnrollmentStatsProps {}

const EnrollmentStats: FC<EnrollmentStatsProps> = ({}) => {
  return (
    <ResponsiveContainer width="100%" height={270}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar dataKey="total" fill="#facc15" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default EnrollmentStats;
