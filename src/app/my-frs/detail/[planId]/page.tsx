import { Metadata } from 'next';
import Link from 'next/link';

import { renderPageTitle } from '@/utils/page';

import ClassCard from '@/components/class-card';
import Typography from '@/components/typography';
import { Button } from '@/components/ui/button';

import { api } from '@/trpc/server';

export const metadata: Metadata = {
  title: renderPageTitle('Detail myFRS'),
};

export default async function PlanDetailPage({
  params,
}: {
  params: { planId: string };
}) {
  const plan = await api.frs.getPlanDetail.query({
    planId: params.planId,
  });

  return (
    <>
      {plan ? (
        <>
          <section>
            <Typography variant='h4' className='mb-1'>
              Informasi Plan FRS
            </Typography>
            <Typography variant='body1'>Judul : {plan.title}</Typography>
            <Typography variant='body1'>Semester : {plan.semester}</Typography>
            <Typography variant='body1'>Total SKS : {plan.totalSks}</Typography>
          </section>

          <div className='py-2' />

          <section className='space-y-2'>
            <Typography variant='h4'>Matkul yang diambil</Typography>
            <div className='grid gap-2 lg:grid-cols-4'>
              {plan.Class.map((kelas) => (
                <ClassCard
                  key={kelas.id}
                  data={{
                    subjectCode: kelas.code,
                    subjectName: kelas.Matkul.name,
                    sks: kelas.Matkul.sks,
                    lecturers: kelas.Lecturer,
                    day: kelas.day,
                    sessionTime: kelas.Session?.session_time,
                    taken: kelas.taken,
                  }}
                />
              ))}
            </div>
          </section>
          <div className='py-2' />
          <div className='flex items-center gap-3'>
            <Button>
              <Link href={'/my-frs/edit/' + plan.id}></Link>
              Ubah
            </Button>
          </div>
          {/* Delete Modal */}

          {/* End delete Modal */}
        </>
      ) : (
        <Typography variant='body1'>Rencara FRS Tidak ditemukan</Typography>
      )}
    </>
  );
}
