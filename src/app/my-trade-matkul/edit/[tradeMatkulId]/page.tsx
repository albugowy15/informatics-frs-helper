import TradeMatkulForm from '@/app/my-trade-matkul/components/trade-matkul-form';
import { api } from '@/trpc/server';

export default async function EditTradeMatkulPage({
  params,
}: {
  params: { tradeMatkulId: string };
}) {
  const prevTradeMatkul = await api.tradeMatkul.getTradeMatkul.query({
    tradeMatkulId: params.tradeMatkulId,
  });
  return <TradeMatkulForm prevData={prevTradeMatkul} />;
}
