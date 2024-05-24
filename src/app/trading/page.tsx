import Typography from "@/components/typography";
import { renderPageTitle } from "@/lib/utils";
import { api } from "@/trpc/server";
import { type Metadata } from "next";
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
      <main className="w-full">
        {listTrades.length === 0 ? (
          <Typography variant="h4" className="text-center lg:text-left">
            Tidak ada trade matkul
          </Typography>
        ) : null}
        <div className="grid gap-2 md:grid-cols-2 2xl:grid-cols-6">
          {listTrades.map((trade) => (
            <TradeCard trade={trade} key={trade.id} />
          ))}
        </div>
      </main>
    </main>
  );
}
