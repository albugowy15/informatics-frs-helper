import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { z } from 'zod';

import { api } from '@/utils/api';

import { Button } from '@/components/Button';
import { SelectInput, TextInput } from '@/components/Form';
import Typography from '@/components/Typography';

import ClassPickSection, { ClassResponseData } from '@/ui/frs/ClassPickSection';

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
  const [classTaken, setClassTaken] = useState<ClassResponseData[]>([]);
  const { data: session } = useSession();
  const methods = useForm<CreateFRSForm>({
    resolver: zodResolver(createFRSForm),
    mode: 'onTouched',
  });
  const { handleSubmit, control } = methods;
  const mutatePlan = api.protected.createPlan.useMutation();
  const onSubmit: SubmitHandler<CreateFRSForm> = (data) => {
    if (classTaken.length > 0) {
      const matkul = classTaken.map((val) => {
        return { id: val.id };
      });

      // post pake trpc
      toast.promise(
        mutatePlan.mutateAsync({
          title: data.title,
          semester: data.semester,
          matkul: matkul,
          userId: session?.user.id as string,
        }),
        {
          loading: 'Membuat rencana FRS...',
          success: 'Rencana FRS berhasil dibuat',
          error: 'Gagal membuat rencana FRS' + mutatePlan.error?.message,
        }
      );
    }
    toast.error('Tidak ada matkul yang diambil');
  };

  return (
    <>
      <Toaster />
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
              <div className='grid grid-cols-4 gap-3'>
                {classTaken.map((kelas, index) => (
                  <div
                    key={kelas.id}
                    className='rounded-md border border-neutral-600 p-3'
                  >
                    <Typography variant='body1' className='font-medium'>
                      {kelas.subject} {kelas.code}
                    </Typography>
                    <Typography variant='body2'>
                      {kelas.Lecturer.fullname}
                    </Typography>
                    <Typography variant='body2'>
                      {kelas.day}, {kelas.Session.session_time}
                    </Typography>

                    <Button
                      variant='filled'
                      size='sm'
                      className='mt-3 bg-error-500 hover:bg-error-400'
                      onClick={() => {
                        const classArray = [...classTaken];
                        classArray.splice(index, 1);
                        setClassTaken(classArray);
                      }}
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

          <Button variant='filled' type='submit' className='mt-3'>
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
