"use client";

import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { type FrsBySemester } from "@/server/api/routers/common";
import { Bar, BarChart, Label, XAxis, YAxis } from "recharts";

export const FrsSemesterChart = (props: { data: FrsBySemester[] }) => {
  const chartConfig = {
    value: {
      label: "chart",
      color: "#adfa1d",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer
      config={chartConfig}
      className="min-h[200px] h-[300px] md:h-[400px] w-full"
    >
      <BarChart accessibilityLayer data={props.data}>
        <XAxis
          dataKey="key"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        >
          <Label
            position="insideBottom"
            value="Semester"
            fontSize={14}
            offset={-4}
          />
        </XAxis>
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false}>
          <Label
            position="insideLeft"
            fontSize={12}
            offset={15}
            value="Total FRS"
            angle={-90}
          />
        </YAxis>
        <Bar dataKey="value" fill="var(--color-value)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};
