import { zodResolver } from '@hookform/resolvers/zod';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { BsTrashFill } from 'react-icons/bs';
import { z } from 'zod';

import { prisma } from '@/server/db';

import { api } from '@/utils/api';
import { renderPageTitle } from '@/utils/page';

import { Button } from '@/components/Button';
import { ClassCard } from '@/components/Card';
import { SelectInput, TextInput } from '@/components/Form';
import Typography from '@/components/Typography';

import ClassPickSection from '@/ui/frs/ClassPickSection';

const editFRSForm = z.object({
  title: z
    .string({
      required_error: 'Judul rencana FRS tidak boleh kosong',
    })
    .nonempty({ message: 'Judul rencana FRS tidak boleh kosong' }),
  semester: z.number({ required_error: 'Semester tidak boleh kosong' }),
});

type EditFRSForm = z.infer<typeof editFRSForm>;

export type PlanDetailClass = {
  id: string;
  code: string;
  taken: number;
  Matkul: {
    semester: number;
    name: string;
    sks: number;
    id: string;
  };
  Session?: {
    session_time: string;
  } | null;
  Lecturer: {
    id: string;
    fullname: string;
  }[];
  day?: string | null;
};

type PlanDetailProps = {
  title: string;
  semester: number;
  userId: string | null;
  Class: PlanDetailClass[];
  id: string;
  totalSks: number;
};

export default function EditPlanPage({
  planDetail,
}: {
  planDetail: PlanDetailProps;
}) {
  const router = useRouter();
  const { planId } = router.query;

  const methods = useForm<EditFRSForm>({
    resolver: zodResolver(editFRSForm),
    mode: 'onTouched',
    defaultValues: {
      title: planDetail.title ?? '',
      semester: planDetail.semester,
    },
  });
  const { control, handleSubmit } = methods;
  const [classTaken, setClassTaken] = useState<PlanDetailClass[]>(
    planDetail.Class,
  );
  const [sks, setSks] = useState(0);

  useEffect(() => {
    setSks(classTaken.reduce((acc, cur) => acc + cur.Matkul.sks, 0));
  }, [classTaken]);
  const mutatePlan = api.frs.updatePlan.useMutation();
  const onSubmit: SubmitHandler<EditFRSForm> = (data) => {
    if (classTaken.length > 0) {
      const matkul = classTaken.map((val) => {
        return val.id;
      });

      toast.promise(
        mutatePlan
          .mutateAsync({
            planId: planId as string,
            data: {
              title: data.title,
              semester: data.semester,
              matkul: matkul,
            },
          })
          .then((res) => {
            if (res.id) {
              router.replace('/frs');
            }
          }),
        {
          loading: 'Memperbaru rencana FRS...',
          success: 'Rencana FRS berhasil diperbarui',
          error: (error) => error?.message,
        },
      );
    } else {
      toast.error('Kamu belum mengambil kelas apapun');
    }
  };
  return (
    <>
      <NextSeo title={renderPageTitle('Edit myFRS')} />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className='space-y-2'>
            <Typography variant='h4'>Informasi Plan FRS</Typography>
            <div className='w-full md:w-96'>
              <TextInput
                label='Judul Plan'
                name='title'
                placeholder='Contoh: Plan FRS Genap'
              />
            </div>
            <div className='w-full md:w-44'>
              <Controller
                control={control}
                name='semester'
                render={({ field, fieldState: { error } }) => (
                  <SelectInput
                    placeholder='Pilih Semester'
                    data={[1, 2, 3, 4, 5, 6, 7, 8]}
                    label='Pilih Semester'
                    error={error}
                    {...field}
                  />
                )}
              />
            </div>
          </section>

          <div className='py-3' />

          <section className='space-y-2'>
            <Typography variant='h4'>Matkul yang diambil</Typography>
            {classTaken.length > 0 ? (
              <div className='grid grid-cols-2  gap-2 lg:grid-cols-4'>
                {classTaken.map((kelas, index) => (
                  <ClassCard
                    key={kelas.id}
                    data={{
                      subjectName: kelas.Matkul.name,
                      subjectCode: kelas.code,
                      lecturers: kelas.Lecturer,
                      day: kelas.day,
                      sessionTime: kelas.Session?.session_time,
                      taken: kelas.taken,
                      sks: kelas.Matkul.sks,
                    }}
                    action={
                      <Button
                        variant='danger'
                        size='sm'
                        className='w-fit bg-error-500 hover:bg-error-400'
                        onClick={() => {
                          const classArray = [...classTaken];
                          classArray.splice(index, 1);
                          setClassTaken(classArray);
                        }}
                        icon={BsTrashFill}
                      >
                        Drop
                      </Button>
                    }
                  />
                ))}
              </div>
            ) : (
              <Typography variant='body1' className='text-neutral-400'>
                Kamu belum mengambil matkul apapun
              </Typography>
            )}
          </section>
          <div className='py-3' />
          <section>
            <Typography variant='h4'>Total SKS : {sks}</Typography>
          </section>

          <Button
            variant='filled'
            type='submit'
            className='mt-3'
            disabled={mutatePlan.isLoading}
          >
            Simpan
          </Button>

          <div className='py-3' />

          <ClassPickSection
            setClassTaken={setClassTaken}
            classTaken={classTaken}
          />
          <div className='py-3' />
        </form>
      </FormProvider>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (context.params === undefined) {
    return {
      notFound: true,
    };
  }
  const classTaken: PlanDetailProps | null = await prisma.plan.findUnique({
    select: {
      id: true,
      semester: true,
      title: true,
      userId: true,
      totalSks: true,
      Class: {
        select: {
          code: true,
          day: true,
          id: true,
          taken: true,
          Lecturer: {
            select: {
              id: true,
              fullname: true,
            },
          },
          Session: {
            select: {
              session_time: true,
            },
          },
          Matkul: {
            select: {
              id: true,
              name: true,
              semester: true,
              sks: true,
            },
          },
        },
      },
    },
    where: {
      id: context.params.planId as string,
    },
  });

  if (classTaken == null) {
    return {
      notFound: true,
    };
  }

  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  if (session.user.id !== classTaken.userId) {
    return {
      redirect: {
        destination: '/403',
        permanent: false,
      },
    };
  }

  return {
    props: { planDetail: classTaken },
  };
}
