import { Metadata } from 'next';

import TradeMatkulForm from '@/app/my-trade-matkul/_components/trade-matkul-form';
import { renderPageTitle } from '@/lib/utils';
import { api } from '@/trpc/server';

export const metadata: Metadata = {
  title: renderPageTitle('Edit myTradeMatkul'),
};

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
