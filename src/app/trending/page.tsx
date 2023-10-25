import { Metadata } from 'next';

import { renderPageTitle } from '@/utils/page';

import ClassCard from '@/components/class-card';
import Typography from '@/components/typography';

import { api } from '@/trpc/server';

export const metadata: Metadata = {
  title: renderPageTitle('Trending'),
  description: 'Top 10 kelas paling banya diambil',
};
export default async function TrendingPage() {
  const trendingClass = await api.common.getTrendingClasses.query();
  return (
    <>
      <Typography variant='h2' className='text-center'>
        Top 12 Kelas Paling Banyak Diambil
      </Typography>
      <div className='py-2' />
      <main className='mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-2'>
        {trendingClass.map((kelas, index) => (
          <ClassCard
            key={index}
            data={{
              day: kelas.day,
              sessionTime: kelas.Session?.session_time,
              subjectCode: kelas.code,
              subjectName: kelas.Matkul.name,
              lecturers: kelas.Lecturer,
              taken: kelas.taken,
              sks: kelas.Matkul.sks,
            }}
          />
        ))}
      </main>
    </>
  );
}
