"use client";

import { FC } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// interface Data1Item {
//   name: string;
//   total: number;
// }

const data2 = [
  {
    name: "2018 - 2019",
    Grade11: 253,
    Grade12: 308, 
    Total: 561,
  },
  {
    name: "2019 - 2020",
    Grade11: 264,
    Grade12: 320,
    Total: 584,
  },
  {
    name: "2020 - 2021",
    Grade11: 230,
    Grade12: 298,
    Total: 528,
  },
  {
    name: "2021 - 2022",
    Grade11: 218,
    Grade12: 259,
    Total: 477,
  },
  {
    name: "2022 - 2023",
    Grade11: 298,
    Grade12: 302,
    Total: 600,
  },
];

// const data1WithTotalSum: Data1Item[] = [
//   { name: "2018 - 2019", total: 0 },
//   { name: "2019 - 2020", total: 0 },
//   { name: "2020 - 2021", total: 0 },
//   { name: "2021 - 2022", total: 0 },
//   { name: "2022 - 2023", total: 0 },
// ];

// // Combine the total values from data2 into data1WithTotalSum
// data1WithTotalSum.forEach((item, index) => {
//   if (data2[index]) {
//     item.total = data2[index].Total;
//   }
// });

interface EnrollmentStatsProps {}

const EnrollmentStats: FC<EnrollmentStatsProps> = ({}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
    {/* <div style={{ width: "100%", height: 270,  marginBottom: '20px' }}>
        <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data1WithTotalSum}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            domain={[0, 1000]}
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#facc15" radius={[4, 4, 0, 0]} />
        </BarChart>
        </ResponsiveContainer>
      </div> */}
      <div style={{ width: "100%", height: 270 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data2}
          width={500}
          height={300}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <YAxis 
            domain={[0, 1000]}
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="Grade11" fill="#845959" activeBar={<Rectangle fill="#51262" stroke="inverted" />} />
          <Bar dataKey="Grade12" fill="#facc15" activeBar={<Rectangle fill="#c8a311" stroke="emphasis" />} />
          <Bar dataKey="Total" fill="#65302f" activeBar={<Rectangle fill="#c8a311" stroke="emphasis" />} />
        </BarChart>
      </ResponsiveContainer>
      </div>
    </div>    
  );
};

export default EnrollmentStats;
