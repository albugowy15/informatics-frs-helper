import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { type Metadata } from "next";
import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TradingFilterForm from "@/app/trading/_components/trading-filter-form";
import { renderPageTitle } from "@/lib/utils";
import { api } from "@/trpc/server";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const metadata: Metadata = {
  title: renderPageTitle("Trading Kelas"),
  description: "Tempat untuk trade kelas informatika ITS",
};

interface SearchParam {
  semester: string;
  subject: string;
}

export default async function TradingMatkulPage({
  searchParams,
}: {
  searchParams: SearchParam;
}) {
  const { semester = undefined, subject = undefined } = searchParams;
  const listTrades = await api.tradeMatkul.getAllTradeMatkul.query({
    semester: semester === undefined ? undefined : parseInt(semester),
    matkul: subject === undefined || subject === "Semua" ? undefined : subject,
  });

  return (
    <main className="mt-4 gap-4 lg:flex">
      <aside className="sticky top-4 hidden h-fit w-[26%] flex-shrink-0 lg:block">
        <Card>
          <CardHeader>
            <CardTitle>Filter Trading Kelas</CardTitle>
            <CardDescription>
              Silahkan filter trading kelas berdasarkan semester dan mata kuliah
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TradingFilterForm
              submitAction={
                <Button type="submit">Tampilkan Trading Matkul</Button>
              }
            />
          </CardContent>
        </Card>
      </aside>
      <section className="mb-7 flex items-center justify-between lg:hidden">
        <Typography variant="h4">Trade Matkul</Typography>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <MixerHorizontalIcon className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Filter Trading</h4>
                <p className="text-sm text-muted-foreground">
                  Silahkan filter trading kelas berdasarkan semester dan mata
                  kuliah
                </p>
              </div>
              <div className="grid gap-2">
                <TradingFilterForm
                  submitAction={
                    <PopoverClose asChild>
                      <Button type="submit">Tampilkan Trading Matkul</Button>
                    </PopoverClose>
                  }
                />
              </div>
            </div>
            <div className="overflow-scroll px-2 py-3"></div>
          </PopoverContent>
        </Popover>
      </section>
      <main className="grid w-full gap-2 md:grid-cols-2 lg:grid-cols-3">
        {listTrades.length == 0 ? (
          <Typography variant="h4" className="text-center lg:text-left">
            Tidak ada trade matkul
          </Typography>
        ) : null}
        {listTrades.map((trade) => (
          <div className="rounded-md border p-4" key={trade.id}>
            <Typography variant="body1" className="font-medium">
              {trade.User?.fullname}
            </Typography>
            <Typography variant="label1">{trade.User?.username}</Typography>
            <div className="py-1" />
            <Typography variant="body1">
              <span className="font-medium text-red-600">Want</span> :{" "}
              {trade.searchMatkul.Matkul.name} {trade.searchMatkul.code}
            </Typography>
            <Typography variant="body1" className="[&:not(:first-child)]:mt-0">
              <span className="font-medium text-green-600">Have</span> :{" "}
              {trade.hasMatkul.Matkul.name} {trade.hasMatkul.code}
            </Typography>
            <Typography variant="body1">{trade.description}</Typography>
            <Typography variant="body1" className="font-medium">
              Kontak
            </Typography>
            <div className="flex items-center gap-4">
              <Typography variant="label1" className="leading-6">
                WA : {trade.User?.whatsapp ? trade.User.whatsapp : "-"}
              </Typography>
              <Typography variant="label1" className="leading-6">
                Line : {trade.User?.idLine ? trade.User.idLine : "-"}
              </Typography>
            </div>
          </div>
        ))}
      </main>
    </main>
  );
}
