import Typography from "@/components/typography";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { renderPageTitle } from "@/lib/utils";
import { api } from "@/trpc/server";
import { type Metadata } from "next";
import { unstable_noStore } from "next/cache";
import { FrsSemesterChart } from "./_components/frs-chart";
import { StatisticCard } from "./_components/statistic-card";

export const metadata: Metadata = {
  title: renderPageTitle("Statistik"),
  description: "Statistik aplikasi Informatics FRS Helper",
};

export default async function StatistikPage() {
  unstable_noStore();
  const statisticData = await api.common.getStatistic();
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
