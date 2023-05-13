import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-hot-toast';

import { api } from '@/utils/api';

import Accordion from '@/components/Accordion';
import { Button } from '@/components/Button';
import { SelectInput } from '@/components/Form';
import Typography from '@/components/Typography';

export type ClassResponseData = {
  code: string;
  id: string;
  subject: string;
  Session: {
    session_time: string;
  };
  Lecturer: {
    code: string;
    fullname: string;
  };
  day: string;
  sks: number;
};

function checkValidPick(
  listKelas: ClassResponseData[],
  kelas: ClassResponseData
): { isValid: boolean; errorMessage: string } {
  const checkSameClass = listKelas.find((val) => val.subject == kelas.subject);
  if (checkSameClass) {
    return {
      isValid: false,
      errorMessage: 'Tidak dapat mengambil mata kuliah yang sama',
    };
  }

  const checkClassCollision = listKelas.find(
    (val) => val.day == kelas.day && val.Session == kelas.Session
  );
  if (checkClassCollision) {
    return {
      isValid: false,
      errorMessage:
        'Tidak dapat mengambil lebih dari satu kelas di jam yang sama',
    };
  }

  return { isValid: true, errorMessage: '' };
}

const ClassPickSection = ({
  classTaken,
  setClassTaken,
}: {
  classTaken: ClassResponseData[];
  setClassTaken: Dispatch<SetStateAction<ClassResponseData[]>>;
}) => {
  const [semester, setSemester] = useState<number>();
  const [subject, setSubject] = useState<string>();
  const listSubject = api.common.getSubject.useQuery(
    { semester: semester as number },
    { enabled: Boolean(semester) }
  );
  const listClass = api.common.getClass.useQuery(
    {
      semester: semester as number,
      matkul: subject,
    },
    { enabled: Boolean(subject || semester) }
  );

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
        {listClass.data ? (
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
                      <div
                        key={kelas.id}
                        className='rounded-md border border-neutral-600 p-2 lg:p-3'
                      >
                        <Typography variant='body2' className='font-medium'>
                          {subject.name} {kelas.code} ({subject.sks} sks)
                        </Typography>
                        <Typography variant='body3' className='py-0.5'>
                          {kelas.Lecturer.fullname}
                        </Typography>
                        <Typography variant='body3'>
                          {kelas.day}, {kelas.Session.session_time}
                        </Typography>

                        <Button
                          variant='filled'
                          size='sm'
                          className='mt-3'
                          onClick={() => {
                            const data: ClassResponseData = {
                              ...kelas,
                              subject: subject.name,
                              sks: subject.sks,
                            };
                            const { isValid, errorMessage } = checkValidPick(
                              classTaken,
                              data
                            );
                            if (isValid) {
                              setClassTaken((prev: ClassResponseData[]) => [
                                ...prev,
                                data,
                              ]);
                              toast.success('Berhasil mengambil kelas');
                            } else {
                              toast.error(errorMessage);
                            }
                          }}
                        >
                          Ambil
                        </Button>
                      </div>
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
          <></>
        )}
      </div>
    </section>
  );
};

export default ClassPickSection;
