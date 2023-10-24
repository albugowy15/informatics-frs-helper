import { Metadata } from 'next';

import { prisma } from '@/server/db';

import { renderPageTitle } from '@/utils/page';

import ClassCard from '@/components/class-card';
import Typography from '@/components/typography';

export const metadata: Metadata = {
  title: renderPageTitle('Trending'),
  description: 'Top 10 kelas paling banya diambil',
};
export default async function TrendingPage() {
  const trendingClass = await prisma.class.findMany({
    select: {
      code: true,
      day: true,
      id: true,
      Lecturer: { select: { fullname: true, id: true } },
      Matkul: { select: { name: true, id: true, sks: true } },
      Session: {
        select: { session_time: true },
      },
      taken: true,
    },
    where: {
      taken: {
        gt: 10,
      },
    },
    orderBy: {
      taken: 'desc',
    },
    take: 12,
  });
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
