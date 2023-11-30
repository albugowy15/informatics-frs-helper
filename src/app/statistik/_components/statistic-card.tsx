import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type StatisticData } from "@/server/api/routers/common";
import { ArrowLeftRight, GraduationCap, Newspaper, User } from "lucide-react";
import React from "react";

export const StatisticCard = ({ data }: { data: StatisticData }) => {
  const typeMapping: Record<StatisticData["type"], React.ReactNode> = {
    user: <User className="h-4 w-4 text-muted-foreground" />,
    class: <GraduationCap className="h-4 w-4 text-muted-foreground" />,
    frs: <Newspaper className="h-4 w-4 text-muted-foreground" />,
    trade: <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />,
  };
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
        <CardTitle className="text-md font-medium">{data.title}</CardTitle>
        {typeMapping[data.type]}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{data.value}</div>
        <p className="text-xs text-muted-foreground">{data.description}</p>
      </CardContent>
    </Card>
  );
};
