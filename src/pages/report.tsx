import { NextSeo } from 'next-seo';

import { renderPageTitle } from '@/utils/page';

import BasicLink from '@/components/BasicLink';
import Typography from '@/components/Typography';

export default function ReportPage() {
  return (
    <>
      <NextSeo
        title={renderPageTitle('Report')}
        description='Laporkan dan sarankan fitur untuk Informatics FRS Helper'
      />
      <main className='space-y-2'>
        <Typography variant='h3'>Report</Typography>
        <Typography variant='body1'>
          Apabila kamu menemukan bug, jadwal tidak sesuai, atau mau saran buat
          nambahin fitur, silahkan membuat Discussion baru di Repo Github :{' '}
          <BasicLink
            newTab
            className='font-medium text-primary-500'
            href='https://github.com/albugowy15/informatics-frs-helper/discussions'
          >
            https://github.com/albugowy15/informatics-frs-helper/discussions
          </BasicLink>
          . Jika memungkinkan lengkapi juga dengan gambar atau screenshot.
        </Typography>
        <Typography variant='body1'>
          Panduan untuk membuat diskusi dapat dilihat di topik Announcement :{' '}
          <BasicLink
            newTab
            className='font-medium text-primary-500'
            href='https://github.com/albugowy15/informatics-frs-helper/discussions/52'
          >
            https://github.com/albugowy15/informatics-frs-helper/discussions/52
          </BasicLink>
        </Typography>
      </main>
    </>
  );
}
