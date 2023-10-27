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

import ClassCardActionButton from '@/app/my-frs/_components/class-card-action-button';
import ClassContextProvider from '@/app/my-frs/_components/class-context';
import CreateFRSForm from '@/app/my-frs/_components/create-frs-form';
import TakeClassForm from '@/app/my-frs/_components/take-subject-form';
import { FrsUiProps } from '@/app/my-frs/types';

const FrsUi = ({ classes, planDetail, planId }: FrsUiProps) => {
  return (
    <main className='gap-4 mt-4 flex flex-col lg:flex-row'>
      <ClassContextProvider planDetailClass={planDetail?.Class}>
        <aside className='lg:sticky lg:top-4 h-fit lg:w-[30%] lg:flex-shrink-0 lg:overflow-y-auto'>
          <Card>
            <CardHeader>
              <CardTitle>Informasi Plan FRS</CardTitle>
              <CardDescription>
                Informasi judul, semester, dan kelas yang akan kamu ambil.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CreateFRSForm planId={planId} planDetail={planDetail} />
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
  );
};

export default FrsUi;
