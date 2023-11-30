import { type Metadata } from "next";

import Typography from "@/components/typography";

import { renderPageTitle } from "@/lib/utils";
import { StatisticCard } from "./_components/statistic-card";
import { api } from "@/trpc/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FrsSemesterChart } from "./_components/frs-chart";

export const metadata: Metadata = {
  title: renderPageTitle("Statistik"),
  description: "Statistik aplikasi Informatics FRS Helper",
};

export default async function PanduanPage() {
  const statisticData = await api.common.getStatistic.query();
  return (
    <main className="space-y-4">
      <Typography variant="h2" className="text-center">
        Statistik Informatics FRS Helper
      </Typography>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statisticData.statistic.map((item) => (
          <StatisticCard key={item.id} data={item} />
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Plan FRS By Semester</CardTitle>
          <CardDescription>
            Jumlah Plan FRS yang dibuat berdasarkan semester
          </CardDescription>
        </CardHeader>
        <CardContent className="pl-0">
          <FrsSemesterChart data={statisticData.frsBySemester} />
        </CardContent>
      </Card>
    </main>
  );
}
