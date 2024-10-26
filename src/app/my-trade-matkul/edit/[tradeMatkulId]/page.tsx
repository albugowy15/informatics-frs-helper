import TradeMatkulForm from "@/app/my-trade-matkul/_components/trade-matkul-form";
import { renderPageTitle } from "@/lib/utils";
import { api } from "@/trpc/server";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: renderPageTitle("Edit myTradeMatkul"),
};

export default async function EditTradeMatkulPage(props: {
  params: Promise<{ tradeMatkulId: string }>;
}) {
  const params = await props.params;
  const prevTradeMatkul = await api.tradeMatkul.getTradeMatkul({
    tradeMatkulId: params.tradeMatkulId,
  });
  return <TradeMatkulForm prevData={prevTradeMatkul} />;
}
