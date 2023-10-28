import { type Metadata } from "next";

import TradeMatkulForm from "@/app/my-trade-matkul/_components/trade-matkul-form";
import { renderPageTitle } from "@/lib/utils";

export const metadata: Metadata = {
  title: renderPageTitle("Buat myTradeMatkul"),
};
export default function CreateTradeMatkulPage() {
  return <TradeMatkulForm />;
}
