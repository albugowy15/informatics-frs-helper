import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-hot-toast';

import { api } from '@/utils/api';

import Accordion from '@/components/Accordion';
import { Button } from '@/components/Button';
import { ClassCard } from '@/components/Card';
import { SelectInput } from '@/components/Form';
import Loader from '@/components/Loader';
import Typography from '@/components/Typography';

import { PlanDetailClass } from '@/pages/frs/edit/[planId]';

const ClassPickSection = ({
  classTaken,
  setClassTaken,
}: {
  classTaken: PlanDetailClass[];
  setClassTaken: Dispatch<SetStateAction<PlanDetailClass[]>>;
}) => {
  const [semester, setSemester] = useState<number>();
  const [subject, setSubject] = useState<string>();
  const [pickClass, setPickClass] = useState<PlanDetailClass>();
  const listSubject = api.common.getSubject.useQuery(
    { semester: semester as number },
    { enabled: Boolean(semester) }
  );
  const listClass = api.common.getClass.useQuery(
    {
      semester: semester as number,
      matkul: subject,
      with_taken: true,
    },
    { enabled: Boolean(subject || semester) }
  );
  const mutateValidClass = api.frs.validatePlan.useMutation({
    onSuccess: () => {
      if (pickClass) {
        setClassTaken((prev: PlanDetailClass[]) => [...prev, pickClass]);
      }
    },
  });

  return (
    <section className='space-y-3'>
      <Typography variant='h4'>Form Ambil Matkul</Typography>
      <div className='flex items-center gap-3 md:w-[60%]'>
        <SelectInput
          label='Pilih Semester'
          onChange={setSemester}
          value={semester}
          data={[1, 2, 3, 4, 5, 6, 7, 8]}
          placeholder='Pilih Semester'
        />

        <SelectInput
          onChange={setSubject}
          value={subject}
          label='Pilih Matkul'
          data={listSubject.data}
          placeholder='Pilih Matkul'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <>
          {listClass.isSuccess && listClass.data ? (
            <>
              {listClass.data.map((subject, index) => (
                <Accordion
                  key={index}
                  title={
                    <div>
                      <Typography variant='h6'>{subject.name}</Typography>
                      <Typography variant='body2'>
                        Semester {subject.semester} | {subject.sks} sks |{' '}
                        {subject.Class.length} kelas
                      </Typography>
                    </div>
                  }
                >
                  {subject.Class.length > 0 ? (
                    <div className='grid grid-cols-2 gap-1 lg:grid-cols-4'>
                      {subject.Class.map((kelas) => (
                        <ClassCard
                          key={kelas.id}
                          data={{
                            subjectName: subject.name,
                            subjectCode: kelas.code,
                            lecturers: kelas.Lecturer,
                            day: kelas.day,
                            sessionTime: kelas.Session.session_time,
                            taken: kelas.taken,
                            sks: subject.sks,
                          }}
                          action={
                            <Button
                              variant='filled'
                              size='sm'
                              className='mt-3'
                              onClick={() => {
                                const incomingClass = kelas.id;
                                const takenClass = classTaken.map(
                                  (val) => val.id
                                );
                                toast.promise(
                                  mutateValidClass.mutateAsync({
                                    classTaken: takenClass,
                                    incomingClass: incomingClass,
                                  }),
                                  {
                                    loading: 'Memvalidasi kelas',
                                    error: (err) => err.message,
                                    success: (data) => data.message,
                                  }
                                );
                                const data: PlanDetailClass = {
                                  ...kelas,
                                  Matkul: {
                                    name: subject.name,
                                    sks: subject.sks,
                                    id: subject.id,
                                    semester: subject.semester,
                                  },
                                  Lecturer: kelas.Lecturer,
                                };
                                setPickClass(data);
                              }}
                            >
                              Ambil
                            </Button>
                          }
                        />
                      ))}
                    </div>
                  ) : (
                    <Typography
                      variant='body2'
                      className='text-center text-neutral-400'
                    >
                      Tidak ada kelas
                    </Typography>
                  )}
                </Accordion>
              ))}
            </>
          ) : (
            <>
              {listClass.isLoading && semester != undefined ? (
                <div className='flex flex-col items-center justify-center text-center'>
                  <Typography variant='label1'>Memuat kelas</Typography>
                  <div className='py-1' />
                  <Loader />
                </div>
              ) : null}
            </>
          )}
        </>
      </div>
    </section>
  );
};

export default ClassPickSection;
