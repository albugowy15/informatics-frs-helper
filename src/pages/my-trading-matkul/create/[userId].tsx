/* eslint-disable react-hooks/exhaustive-deps */
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { FaSave } from 'react-icons/fa';
import { z } from 'zod';

import { api } from '@/utils/api';

import { Button } from '@/components/Button';
import Typography from '@/components/Typography';

import HasMatkulSection from '@/ui/trading-matkul/HasMatkulSection';
import SearchMatkulSection from '@/ui/trading-matkul/SearchMatkulSection';

const createTradeMatkulFormSchema = z.object({
  hasMatkul: z.string(),
  hasClass: z
    .string({ required_error: 'Pilih kelas yang kamu miliki' })
    .nonempty({
      message: 'Pilih kelas yang kamu miliki',
    }),
  hasMatkulSemester: z.string(),
  searchMatkul: z.string(),
  searchClass: z
    .string({ required_error: 'Pilih kelas yang kamu cari' })
    .nonempty({
      message: 'Pilih kelas yang kamu cari',
    }),
  searchMatkulSemester: z.string(),
  description: z
    .string({ required_error: 'Deskripsi tidak boleh kosong' })
    .max(150, { message: 'Deskripsi tidak boleh lebih dari 150 karakter' })
    .nonempty({ message: 'Deskripsi tidak boleh kosong' }),
});

export type CreateTradeMatkulFormSchema = z.infer<
  typeof createTradeMatkulFormSchema
>;

export default function CreateTradeMatkulPage() {
  const router = useRouter();
  const { userId } = router.query;

  const methods = useForm<CreateTradeMatkulFormSchema>({
    resolver: zodResolver(createTradeMatkulFormSchema),
    mode: 'onTouched',
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const classOptions = api.common.getClassOptions.useQuery();

  const postTradeMatkul = api.tradeMatkul.createTradeMatkul.useMutation({
    onSuccess: () => {
      router.push('/my-trading-matkul/' + userId);
    },
  });

  const onSubmit: SubmitHandler<CreateTradeMatkulFormSchema> = (data) => {
    toast.promise(
      postTradeMatkul.mutateAsync({
        description: data.description,
        hasClassId: data.hasClass,
        searchClassId: data.searchClass,
        userId: userId as string,
      }),
      {
        loading: 'Membuat post trade matkul',
        success: 'Berhasil membuat post trade matkul',
        error: (err) => err.message,
      }
    );
  };

  return (
    <>
      <Toaster />
      <FormProvider {...methods}>
        <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
          {classOptions.data && (
            <div className='flex flex-col gap-3 md:flex-row md:justify-between'>
              <HasMatkulSection data={classOptions.data} />

              <SearchMatkulSection data={classOptions.data} />
            </div>
          )}
          <div className='py-2' />
          <Typography variant='h5'>Deskripsi</Typography>
          <Typography variant='body2'>
            Tulis deskripsi semenarik mungkin, biar ada yang mau nuker..
          </Typography>
          <Typography variant='body2'>Maksimal 150 karakter</Typography>

          <textarea
            {...register('description')}
            className='form-textarea mt-1 w-full rounded-md'
            rows={3}
            placeholder='Plisss... yang mau nuker dapat pahala'
          />
          {errors.description && (
            <Typography variant='label2' className='mt-1 text-error-500'>
              {errors.description.message}
            </Typography>
          )}
          <div className='py-4' />
          <div className='flex items-center gap-4'>
            <Button
              variant='filled'
              icon={FaSave}
              type='submit'
              disabled={postTradeMatkul.isLoading}
            >
              Simpan
            </Button>
            <Button
              variant='outlined'
              disabled={postTradeMatkul.isLoading}
              onClick={() => router.back()}
            >
              Batal
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
