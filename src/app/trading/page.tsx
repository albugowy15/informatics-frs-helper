import { Metadata } from 'next';

import { renderPageTitle } from '@/utils/page';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import TradingFilterForm from '@/app/trading/components/trading-filter-form';

export const metadata: Metadata = {
  title: renderPageTitle('Trading Kelas'),
  description: 'Tempat untuk trade kelas informatika ITS',
};

const TradingMatkulPage = () => {
  return (
    <>
      <div className='gap-4 lg:flex'>
        <aside className='sticky top-4 mt-4 hidden h-fit w-[26%] flex-shrink-0 lg:block'>
          <Card>
            <CardHeader>
              <CardTitle>Filter Trading Kelas</CardTitle>
              <CardDescription>
                Silahkan filter trading kelas berdasarkan semester dan mata
                kuliah
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TradingFilterForm />
            </CardContent>
          </Card>
        </aside>
        <Dialog>
          <DialogTrigger asChild>
            <Button className='fixed bottom-0 left-0 right-0 mx-auto mb-7 w-fit lg:hidden'>
              Filter
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filter Jadwal</DialogTitle>
              <DialogDescription>
                Silahkan filter jadwal berdasarkan semester dan mata kuliah
              </DialogDescription>
            </DialogHeader>
            <div className='overflow-scroll py-3 px-2'>
              <TradingFilterForm />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default TradingMatkulPage;
