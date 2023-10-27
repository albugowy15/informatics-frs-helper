import { Metadata } from 'next';

import { renderPageTitle } from '@/utils/page';

import TradeMatkulForm from '@/app/my-trade-matkul/components/trade-matkul-form';

export const metadata: Metadata = {
  title: renderPageTitle('Buat myTradeMatkul'),
};
export default function CreateTradeMatkulPage() {
  return <TradeMatkulForm />;
}
