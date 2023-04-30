import { NextSeo } from 'next-seo';
import { AiOutlineSchedule } from 'react-icons/ai';
import { IoNewspaperOutline } from 'react-icons/io5';

import { renderPageTitle } from '@/utils/page';

import { LinkButton } from '@/components/Button';
import Typography from '@/components/Typography';

export default function Home() {
  return (
    <>
      <NextSeo
        title={renderPageTitle('Home')}
        description='Informatics FRS Helper'
      />
      <main className='relative mt-28 flex flex-col items-center justify-center space-y-2 '>
        <Typography variant='h2' className=' text-center text-primary-500'>
          Informatics FRS Helper
        </Typography>
        <Typography variant='body1' className='text-center'>
          Aplikasi bantuan FRS untuk mahasiswa Informatika ITS
        </Typography>
        <div className='py-1' />
        <div className='flex flex-wrap items-center justify-center gap-2 sm:gap-6'>
          <LinkButton
            href='/jadwal'
            variant='outlined'
            icon={AiOutlineSchedule}
          >
            Lihat Jadwal
          </LinkButton>
          <LinkButton
            href='/panduan'
            variant='outlined'
            icon={IoNewspaperOutline}
          >
            Baca Panduan
          </LinkButton>
        </div>
      </main>
    </>
  );
}
