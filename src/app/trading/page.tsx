import { type Metadata } from "next";
import Typography from "@/components/typography";

import { renderPageTitle } from "@/lib/utils";
import { api } from "@/trpc/server";

import TradeCard from "./_components/trade-card";
import TradeFilterWidget from "./_components/trade-filter-widget";

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
      <TradeFilterWidget />
      <main className="grid w-full gap-2 md:grid-cols-2 lg:grid-cols-3">
        {listTrades.length === 0 ? (
          <Typography variant="h4" className="text-center lg:text-left">
            Tidak ada trade matkul
          </Typography>
        ) : null}
        {listTrades.map((trade) => (
          <TradeCard trade={trade} key={trade.id} />
        ))}
      </main>
    </main>
  );
}
