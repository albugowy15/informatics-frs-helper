import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
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

import { api } from '@/utils/api';
import { renderPageTitle } from '@/utils/page';

import { Button } from '@/components/Button';
import { SelectInput, TextInput } from '@/components/Form';
import Typography from '@/components/Typography';

import { PlanDetailClass } from '@/pages/frs/edit/[planId]';
import ClassPickSection from '@/ui/frs/ClassPickSection';

const createFRSForm = z.object({
  title: z
    .string({
      required_error: 'Judul rencana FRS tidak boleh kosong',
    })
    .nonempty({ message: 'Judul rencana FRS tidak boleh kosong' }),
  semester: z.number({ required_error: 'Semester tidak boleh kosong' }),
});

type CreateFRSForm = z.infer<typeof createFRSForm>;
export default function CreateFRSPage() {
  const router = useRouter();
  const [classTaken, setClassTaken] = useState<PlanDetailClass[]>([]);
  const [sks, setSks] = useState(0);
  useEffect(() => {
    setSks(classTaken.reduce((acc, cur) => acc + cur.Matkul.sks, 0));
  }, [classTaken]);
  const { data: session } = useSession();
  const methods = useForm<CreateFRSForm>({
    resolver: zodResolver(createFRSForm),
    mode: 'onTouched',
  });
  const { handleSubmit, control } = methods;
  const mutatePlan = api.frs.createPlan.useMutation();
  const onSubmit: SubmitHandler<CreateFRSForm> = (data) => {
    if (classTaken.length > 0) {
      const matkul = classTaken.map((val) => {
        return val.Matkul.id;
      });

      // post pake trpc
      toast.promise(
        mutatePlan
          .mutateAsync({
            title: data.title,
            semester: data.semester,
            matkul: matkul,
            userId: session?.user.id as string,
          })
          .then((res) => {
            if (res.id) {
              router.replace('/frs/' + session?.user.id);
            }
          }),
        {
          loading: 'Membuat rencana FRS...',
          success: 'Rencana FRS berhasil dibuat',
          error: (error) => error?.message,
        }
      );
    } else {
      toast.error('Kamu belum mengambil matkul apapun');
    }
  };

  return (
    <>
      <NextSeo title={renderPageTitle('Create myFRS')} />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className='space-y-2'>
            <Typography variant='h4'>Informasi Plan FRS</Typography>
            <div className='w-full md:w-96'>
              <TextInput
                label='Judul Plan'
                name='title'
                placeholder='Contoh: War PAA'
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
                  <div
                    key={index}
                    className='flex flex-col justify-between gap-2 rounded-md border border-neutral-600 p-2 lg:p-3'
                  >
                    <div>
                      <Typography variant='body2' className='font-medium'>
                        {kelas.Matkul.name} {kelas.code} ({kelas.Matkul.sks}{' '}
                        sks)
                      </Typography>
                      <Typography variant='body3' className='py-0.5'>
                        {kelas.Lecturer.fullname}
                      </Typography>
                      <Typography variant='body3'>
                        {kelas.day}, {kelas.Session.session_time}
                      </Typography>
                    </div>
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
                  </div>
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
