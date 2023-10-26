import { Metadata } from 'next';

import { renderPageTitle } from '@/utils/page';

import ClassCard from '@/components/class-card';
import Typography from '@/components/typography';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import ClassCardActionButton from '@/app/my-frs/create/components/class-card-action-button';
import ClassContextProvider from '@/app/my-frs/create/components/class-context';
import CreateFRSForm from '@/app/my-frs/create/components/create-frs-form';
import TakeClassForm from '@/app/my-frs/create/components/take-subject-form';
import { api } from '@/trpc/server';

type SearchParam = {
  semester: string;
  subject: string;
};

export const metadata: Metadata = {
  title: renderPageTitle('Create myFRS'),
};

export default async function CreateFRSPage({
  searchParams,
}: {
  searchParams: SearchParam;
}) {
  const { semester = undefined, subject = undefined } = searchParams;
  const classes = await api.common.getClass.query({
    semester: semester === undefined ? parseInt('0') : parseInt(semester),
    matkul: subject === 'Semua' || subject === undefined ? undefined : subject,
    with_taken: true,
  });

  return (
    <>
      <main className='gap-4 mt-4 flex flex-col lg:flex-row'>
        <ClassContextProvider>
          <aside className='lg:sticky lg:top-4 h-fit lg:w-[30%] lg:flex-shrink-0 lg:overflow-y-auto'>
            <Card>
              <CardHeader>
                <CardTitle>Informasi Plan FRS</CardTitle>
                <CardDescription>
                  Informasi judul, semester, dan kelas yang akan kamu ambil.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CreateFRSForm />
              </CardContent>
            </Card>
          </aside>
          <section className='flex w-full flex-col'>
            <Card>
              <CardHeader>
                <CardTitle>Form Ambil Matkul</CardTitle>
              </CardHeader>
              <CardContent>
                <TakeClassForm />

                <div className='mt-3'>
                  {classes.length == 0 ? (
                    <Typography
                      variant='h4'
                      className='text-center lg:text-left'
                    >
                      Tidak ada kelas
                    </Typography>
                  ) : null}
                  {classes.map((matkul) => (
                    <>
                      <Accordion type='single' collapsible>
                        <AccordionItem value={matkul.name}>
                          <AccordionTrigger>
                            <div className='text-left'>
                              <Typography variant='body1'>
                                {matkul.name}
                              </Typography>
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
                                      size='sm'
                                      key={item.id}
                                    >
                                      <ClassCardActionButton
                                        data={{ Matkul: matkul, ...item }}
                                      />
                                    </ClassCard>
                                  ))}
                                </>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </ClassContextProvider>
      </main>
    </>
  );
}
