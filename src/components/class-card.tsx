import React from "react";

import Typography from "@/components/typography";

import { cn } from "@/lib/utils";
import { Card } from "./ui/card";

export type ClassCardProps = {
  data: {
    subjectName: string;
    subjectCode: string;
    lecturers: { id: string; fullname: string }[];
    day?: string | null;
    sessionTime?: string | null;
    taken: number;
    sks: number;
  };
  size?: "base" | "sm";
  children?: React.ReactNode;
};

const CounterBadge = ({
  count,
  size,
}: {
  count: number;
  size?: "base" | "sm";
}) => {
  return (
    <Typography
      variant="label1"
      className={cn([size == "sm" && "text-xs"], "pt-1")}
    >
      Diambil{" "}
      <span
        className={cn(
          [
            count <= 10 && "text-green-600",
            count >= 11 && count <= 20 && "text-yellow-500",
            count >= 21 && "text-red-600",
          ],
          "font-medium",
        )}
      >
        {count}
      </span>{" "}
      kali
    </Typography>
  );
};

export const ClassCard = ({
  data,
  children,
  size = "base",
}: ClassCardProps) => {
  return (
    <Card>
      <div className="space-y-1 p-2 lg:p-3">
        <Typography
          variant="body1"
          className={cn([size == "sm" && "text-sm"], "font-medium")}
        >
          {data.subjectName} {data.subjectCode} ({data.sks} sks)
        </Typography>
        {data.lecturers.map((lecturer) => (
          <Typography
            variant="label1"
            className={cn([size == "sm" && "text-xs"], "font-normal")}
            key={lecturer.id}
          >
            {lecturer.fullname}
          </Typography>
        ))}
        {data.day != null && data.sessionTime != null ? (
          <Typography
            variant="label1"
            className={cn([size == "sm" && "text-xs"], "font-normal")}
          >
            {data.day}, {data.sessionTime} WIB
          </Typography>
        ) : null}

        <CounterBadge count={data.taken} size={size} />
        <div className="py-1" />
        {children}
      </div>
    </Card>
  );
};

export default ClassCard;
