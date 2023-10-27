import { Metadata } from 'next';

import { renderPageTitle } from '@/utils/page';

import TradeMatkulForm from '@/app/my-trade-matkul/components/trade-matkul-form';
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
