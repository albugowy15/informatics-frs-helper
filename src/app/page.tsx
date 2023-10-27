import { Book, Calendar } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

import Typography from '@/components/typography';
import { Button } from '@/components/ui/button';

import ScheduleStatusAlert from '@/app/components/schedule-status';
import { renderPageTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: renderPageTitle('Home'),
  description: 'Informatics FRS Helper',
};

export default async function Home() {
  return (
    <>
      <ScheduleStatusAlert />
      <main className='mt-24 flex flex-col items-center justify-center space-y-2 '>
        <Typography variant='h2' className='text-center'>
          Informatics FRS Helper
        </Typography>
        <Typography variant='body1' className='text-center'>
          Aplikasi bantuan FRS untuk mahasiswa Informatika ITS
        </Typography>
        <div className='py-1' />
        <div className='flex flex-wrap items-center justify-center gap-2 sm:gap-6'>
          <Button variant='outline' asChild>
            <Link href='/jadwal'>
              <Calendar className='mr-2 h-4 w-4' />
              Lihat Jadwal
            </Link>
          </Button>
          <Button variant='outline' asChild>
            <Link href='/panduan'>
              <Book className='mr-2 h-4 w-4' />
              Baca Panduan
            </Link>
          </Button>
        </div>
      </main>
    </>
  );
}
