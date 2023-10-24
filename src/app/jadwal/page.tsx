import { SlidersHorizontal } from 'lucide-react';
import { Metadata } from 'next';

import { prisma } from '@/server/db';

import { renderPageTitle } from '@/utils/page';

import ClassCard from '@/components/class-card';
import Typography from '@/components/typography';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import ScheduleFilterForm from '@/app/jadwal/components/schedule-filter-form';

export const metadata: Metadata = {
  title: renderPageTitle('Informasi Jadwal'),
  description: 'Informasi Jadwal Mata Kuliah Informatika ITS',
};

type SearchParam = {
  semester: string;
  subject: string;
};

export default async function SchedulePage({
  searchParams,
}: {
  searchParams: SearchParam;
}) {
  const { semester = undefined, subject = undefined } = searchParams;
  const classes = await prisma.matkul.findMany({
    where: {
      semester: semester === undefined ? parseInt('0') : parseInt(semester),
      name: subject === undefined || subject === 'Semua' ? undefined : subject,
    },
    select: {
      id: true,
      name: true,
      semester: true,
      sks: true,
      Class: {
        select: {
          code: true,
          day: true,
          id: true,
          Lecturer: { select: { code: true, fullname: true, id: true } },
          Session: {
            select: { session_time: true },
          },
          taken: true,
        },
        orderBy: {
          code: 'asc',
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  });
  return (
    <>
      <div className='gap-4 mt-4 lg:flex'>
        <aside className='sticky top-4 hidden h-fit w-[26%] flex-shrink-0 lg:block'>
          <Card>
            <CardHeader>
              <CardTitle>Filter Jadwal</CardTitle>
              <CardDescription>
                Silahkan filter jadwal berdasarkan semester dan mata kuliah
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScheduleFilterForm />
            </CardContent>
          </Card>
        </aside>
        <section className='flex flex-col mb-7 lg:hidden'>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant='outline'>
                <SlidersHorizontal className='mr-2 h-4 w-4' />
                Filter
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filter Jadwal</DialogTitle>
                <DialogDescription>
                  Silahkan filter jadwal berdasarkan semester dan mata kuliah
                </DialogDescription>
              </DialogHeader>
              <div className='overflow-scroll py-3 px-2'>
                <ScheduleFilterForm />
              </div>
            </DialogContent>
          </Dialog>
        </section>
        <main className='flex w-full flex-col gap-3 lg:px-3'>
          {classes.length == 0 ? (
            <Typography variant='h4' className='text-center lg:text-left'>
              Tidak ada kelas
            </Typography>
          ) : null}
          {classes.map((matkul) => (
            <>
              <Accordion type='single' collapsible>
                <AccordionItem value={matkul.name}>
                  <AccordionTrigger>
                    <div className='text-left'>
                      <Typography variant='body1'>{matkul.name}</Typography>
                      <Typography variant='label1'>
                        Semester {matkul.semester} | {matkul.sks} sks |{' '}
                        {matkul.Class.length} kelas
                      </Typography>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className='grid gap-2 md:grid-cols-3'>
                      {matkul.Class.length == 0 ? (
                        <>
                          <Typography variant='body1'>
                            Tidak ada kelas
                          </Typography>
                        </>
                      ) : (
                        <>
                          {matkul.Class.map((item) => (
                            <ClassCard
                              data={{
                                day: item.day,
                                lecturers: item.Lecturer,
                                sessionTime: item.Session?.session_time,
                                subjectCode: item.code,
                                subjectName: matkul.name,
                                taken: item.taken,
                                sks: matkul.sks,
                              }}
                              key={item.id}
                            />
                          ))}
                        </>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </>
          ))}
        </main>
      </div>
    </>
  );
}
