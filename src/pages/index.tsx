import { get } from '@vercel/edge-config';
import clsx from 'clsx';
import { NextSeo } from 'next-seo';
import {
  AiOutlineCheckCircle,
  AiOutlineSchedule,
  AiOutlineWarning,
} from 'react-icons/ai';
import { IoNewspaperOutline } from 'react-icons/io5';

import { renderPageTitle } from '@/utils/page';

import { LinkButton } from '@/components/Button';
import Typography from '@/components/Typography';

function ScheduleStatusAlert({ status }: { status: string }) {
  return (
    <div
      className={clsx('p-3 rounded-lg border flex gap-2 w-fit mx-auto', [
        status === 'UPDATED'
          ? 'border-green-600 text-green-600'
          : 'border-red-600 text-red-600',
      ])}
    >
      {status == 'UPDATED' ? (
        <>
          <AiOutlineCheckCircle className='my-1 flex-none' />
          <div>
            <p>
              Jadwal Kelas: <strong>UPDATED</strong>
            </p>
            <p className='text-sm'>
              Jadwal kelas telah diperbarui, selamat menggunakan!.
            </p>
          </div>
        </>
      ) : (
        <>
          <AiOutlineWarning className='my-1 flex-none' />
          <div>
            <p>
              Jadwal Kelas: <strong>OUTDATED</strong>
            </p>
            <p className='text-sm'>
              Perhatian! Jadwal kelas belum diperbarui, menunggu rilis jadwal
              dari departemen.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default function Home({ scheduleStatus }: { scheduleStatus: string }) {
  return (
    <>
      <NextSeo
        title={renderPageTitle('Home')}
        description='Informatics FRS Helper'
      />
      <ScheduleStatusAlert status={scheduleStatus} />
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

export async function getServerSideProps() {
  const scheduleStatus = await get('schedule');
  return {
    props: {
      scheduleStatus,
    },
  };
}
