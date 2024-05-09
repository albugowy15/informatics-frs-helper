import React from "react";
import Typography from "@/components/typography";
import { cn } from "@/lib/utils";
import { Card } from "./ui/card";

export interface ClassCardProps {
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
}

const CounterBadge = (props: { count: number; size?: "base" | "sm" }) => {
  return (
    <Typography
      variant="label1"
      className={cn([props.size == "sm" && "text-xs"], "pt-1")}
    >
      Diambil{" "}
      <span
        className={cn(
          [
            props.count <= 10 && "text-green-600",
            props.count >= 11 && props.count <= 20 && "text-yellow-500",
            props.count >= 21 && "text-red-600",
          ],
          "font-medium",
        )}
      >
        {props.count}
      </span>{" "}
      kali
    </Typography>
  );
};

export const ClassCard = ({ size = "base", ...props }: ClassCardProps) => {
  return (
    <Card>
      <div className="space-y-1 p-2 lg:p-3">
        <Typography
          variant="body1"
          className={cn(
            [size == "sm" && "text-sm"],
            "font-medium leading-normal",
          )}
        >
          {props.data.subjectName} {props.data.subjectCode} ({props.data.sks}{" "}
          sks)
        </Typography>
        {props.data.lecturers.map((lecturer) => (
          <Typography
            variant="label1"
            className={cn(
              [size == "sm" && "text-xs"],
              "font-normal leading-tight",
            )}
            key={lecturer.id}
          >
            {lecturer.fullname}
          </Typography>
        ))}
        {props.data.day != null && props.data.sessionTime != null ? (
          <Typography
            variant="label1"
            className={cn([size == "sm" && "text-xs"], "font-normal")}
          >
            {props.data.day}, {props.data.sessionTime} WIB
          </Typography>
        ) : null}

        <CounterBadge count={props.data.taken} size={size} />
        <div className="py-1" />
        {props.children}
      </div>
    </Card>
  );
};

export default ClassCard;
