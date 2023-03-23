import { zodResolver } from '@hookform/resolvers/zod';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { SelectInput, TextInput } from '@/components/Form';
import Typography from '@/components/Typography';

const createFRSForm = z.object({
  title: z.string({
    required_error: 'Judul rencana FRS tidak boleh kosong',
  }),
  semester: z.string({ required_error: 'Semester tidak boleh kosong' }),
  priority: z
    .number({ required_error: 'Prioritas tidak boleh kosong' })
    .min(1)
    .max(3),
  matkul: z.array(
    z.object({
      id: z.string(),
    })
  ),
});

type CreateFRSForm = z.infer<typeof createFRSForm>;
export default function CreateFRSPage() {
  const methods = useForm<CreateFRSForm>({
    resolver: zodResolver(createFRSForm),
  });
  const { handleSubmit, control } = methods;
  const onSubmit: SubmitHandler<CreateFRSForm> = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant='h4'>Informasi Plan FRS</Typography>
        <div className='mt-1 flex items-center justify-between gap-2'>
          <TextInput
            label='Judul Plan'
            name='title'
            placeholder='Contoh: War PAA'
          />
          <Controller
            control={control}
            name='semester'
            render={({ field }) => (
              <SelectInput
                placeholder='Pilih Semester'
                data={[1, 2, 3, 4, 5, 6, 7, 8]}
                label='Pilih Semester'
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name='priority'
            render={({ field }) => (
              <SelectInput
                placeholder='Pilih Prioritas'
                data={[1, 2, 3]}
                label='Pilih Prioritas'
                {...field}
              />
            )}
          />
        </div>

        <div className='py-3' />
        <Typography variant='h4'>Pilih Kelas</Typography>
        <Button variant='filled' type='submit'>
          Simpan
        </Button>
      </form>
    </FormProvider>
  );
}
