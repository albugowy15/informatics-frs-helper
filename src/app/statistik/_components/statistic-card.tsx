import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type StatisticData } from "@/server/api/routers/common";
import {
  ArchiveIcon,
  IdCardIcon,
  PersonIcon,
  ShuffleIcon,
} from "@radix-ui/react-icons";
import * as React from "react";

const typeMapping: Record<StatisticData["type"], React.ReactNode> = {
  user: <PersonIcon className="h-4 w-4 text-muted-foreground" />,
  class: <ArchiveIcon className="h-4 w-4 text-muted-foreground" />,
  frs: <IdCardIcon className="h-4 w-4 text-muted-foreground" />,
  trade: <ShuffleIcon className="h-4 w-4 text-muted-foreground" />,
};

export const StatisticCard = (props: { data: StatisticData }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
        <CardTitle className="text-md font-medium">
          {props.data.title}
        </CardTitle>
        {typeMapping[props.data.type]}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{props.data.value}</div>
        <p className="text-xs text-muted-foreground">
          {props.data.description}
        </p>
      </CardContent>
    </Card>
  );
};
