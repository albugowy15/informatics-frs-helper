"use client";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { FrsBySemester } from "@/trpc/routers/common";
import { Bar, BarChart, Label, XAxis, YAxis } from "recharts";

const chartConfig = {
  frs: {
    label: "frs",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export const FrsSemesterChart = (props: { data: FrsBySemester[] }) => {
  return (
    <ChartContainer
      config={chartConfig}
      className="min-h[200px] h-[300px] md:h-[400px] w-full"
    >
      <BarChart accessibilityLayer data={props.data}>
        <XAxis dataKey="key" fontSize={12} tickLine={false} axisLine={false}>
          <Label
            position="insideBottom"
            value="Semester"
            fontSize={14}
            offset={-4}
          />
        </XAxis>
        <YAxis fontSize={12} tickLine={false} axisLine={false}>
          <Label
            position="insideLeft"
            fontSize={12}
            offset={15}
            value="Total FRS"
            angle={-90}
          />
        </YAxis>
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="value" fill="var(--color-frs)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};
