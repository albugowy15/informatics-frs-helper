import { Metadata } from 'next';

import Typography from '@/components/typography';

import { renderPageTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: renderPageTitle('Report'),
  description: 'Laporkan dan sarankan fitur untuk Informatics FRS Helper',
};

export default function ReportPage() {
  return (
    <main className='space-y-2'>
      <Typography variant='h3'>Report</Typography>
      <Typography variant='body1'>
        Apabila kamu menemukan bug, jadwal tidak sesuai, atau mau saran buat
        nambahin fitur, silahkan membuat Discussion baru di Repo Github :{' '}
        <a
          className='hover:underline'
          target='_blank'
          href='https://github.com/albugowy15/informatics-frs-helper/discussions'
        >
          https://github.com/albugowy15/informatics-frs-helper/discussions
        </a>
        . Jika memungkinkan lengkapi juga dengan gambar atau screenshot.
      </Typography>
      <Typography variant='body1'>
        Panduan untuk membuat diskusi dapat dilihat di topik Announcement :{' '}
        <a
          className='hover:underline'
          target='_blank'
          href='https://github.com/albugowy15/informatics-frs-helper/discussions/52'
        >
          https://github.com/albugowy15/informatics-frs-helper/discussions/52
        </a>
      </Typography>
    </main>
  );
}
