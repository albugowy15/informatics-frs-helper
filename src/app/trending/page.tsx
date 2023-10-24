import { prisma } from '@/server/db';

import ClassCard from '@/components/class-card';
import Typography from '@/components/typography';

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
    take: 10,
  });
  return (
    <>
      <Typography variant='h2' className='text-center'>
        Top 10 Kelas Paling Banyak Diambil
      </Typography>
      <div className='py-2' />
      <main className='mx-auto flex max-w-lg flex-col gap-2'>
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
