"use client";

import { type FrsBySemester } from "@/server/api/routers/common";
import {
  Bar,
  BarChart,
  Label,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export const FrsSemesterChart = (props: { data: FrsBySemester[] }) => {
  const renderCustomBarLabel = ({
    x,
    y,
    width,
    value,
  }: {
    x: number;
    y: number;
    width: number;
    value: number;
  }) => {
    return (
      <text
        className="text-sm text-muted-foreground"
        x={x + width / 2}
        y={y}
        fill="#888888"
        textAnchor="middle"
        dy={-6}
      >
        {value}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={props.data}>
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
            offset={0}
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
        <Bar
          dataKey="value"
          fill="#adfa1d"
          radius={[4, 4, 0, 0]}
          label={renderCustomBarLabel}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
