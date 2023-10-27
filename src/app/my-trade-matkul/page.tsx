import { Plus } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

import { renderPageTitle } from '@/utils/page';

import Typography from '@/components/typography';
import { Button } from '@/components/ui/button';

import TradeMatkulAction from '@/app/my-trade-matkul/components/trade-matkul-action';
import { api } from '@/trpc/server';

export const metadata: Metadata = {
  title: renderPageTitle('myTradeMatkul'),
};
export default async function MyTradeMatkulPage() {
  const tradeMatkulPosts = await api.tradeMatkul.getAllMyTradeMatkul.query();

  return (
    <>
      <main>
        <Typography variant='h3'>My Trade Matkul</Typography>
        <Typography variant='body1'>
          Kamu bisa membuat beberapa post trade kelas selama satu semester. Post
          trade matkul yang telah dibuat akan disimpan selama 1 semester dan
          akan dihapus di semester berikutnya.
        </Typography>

        <Button asChild className='my-6'>
          <Link href='/my-trade-matkul/create'>
            <Plus className='mr-2 h-4 w-4' />
            Tambah Post Trade Matkul
          </Link>
        </Button>

        <div className='grid gap-2 lg:grid-cols-3'>
          {tradeMatkulPosts.length > 0 ? (
            <>
              {tradeMatkulPosts.map((post) => (
                <div
                  key={post.id}
                  className='flex flex-col rounded-md border p-3'
                >
                  <Typography variant='body1'>
                    <span className='font-semibold text-red-600'>Want</span> :{' '}
                    {post.searchMatkul.Matkul.name} {post.searchMatkul.code}
                  </Typography>
                  <Typography variant='body1'>
                    <span className='font-semibold text-green-600'>Have</span> :{' '}
                    {post.hasMatkul.Matkul.name} {post.hasMatkul.code}
                  </Typography>
                  <Typography variant='body1'>{post.description}</Typography>

                  <div className='py-2' />
                  <TradeMatkulAction tradeMatkulId={post.id} />
                </div>
              ))}
            </>
          ) : (
            <>
              <Typography variant='body1'>
                Kamu belum membuat post trade matkul
              </Typography>
            </>
          )}
        </div>
      </main>
    </>
  );
}
