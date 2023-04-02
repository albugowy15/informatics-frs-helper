/* eslint-disable react-hooks/exhaustive-deps */
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { FaSave } from 'react-icons/fa';
import { z } from 'zod';

import { api } from '@/utils/api';

import { Button } from '@/components/Button';
import Loader from '@/components/Loader';
import Typography from '@/components/Typography';

import HasMatkulSection from '@/ui/trading-matkul/HasMatkulSection';
import SearchMatkulSection from '@/ui/trading-matkul/SearchMatkulSection';

const editTradeMatkulFormSchema = z.object({
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

export type EditTradeMatkulFormSchema = z.infer<
  typeof editTradeMatkulFormSchema
>;

export default function CreateTradeMatkulPage() {
  const router = useRouter();
  const { id } = router.query;
  const tradeMatkulPost = api.tradeMatkul.getTradeMatkul.useQuery(
    {
      tradeMatkulId: id as string,
    },
    {
      enabled: Boolean(id),
    }
  );
  const methods = useForm<EditTradeMatkulFormSchema>({
    resolver: zodResolver(editTradeMatkulFormSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const classOptions = api.common.getClassOptions.useQuery();
  const updateTradeMatkul = api.tradeMatkul.updateTradeMatkul.useMutation();

  useEffect(() => {
    if (tradeMatkulPost.data) {
      methods.setValue('hasClass', tradeMatkulPost.data.hasMatkul.id);
      methods.setValue('searchClass', tradeMatkulPost.data.searchMatkul.id);
    }
  });

  const onSubmit: SubmitHandler<EditTradeMatkulFormSchema> = (data) => {
    toast.promise(
      updateTradeMatkul.mutateAsync({
        description: data.description,
        hasClassId: data.hasClass,
        searchClassId: data.searchClass,
        tradeMatkulId: id as string,
      }),
      {
        loading: 'Update post trade matkul',
        success: 'Berhasil update post trade matkul',
        error: (err) => err.message,
      }
    );
  };

  return (
    <>
      <Toaster />
      <FormProvider {...methods}>
        <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
          {tradeMatkulPost.isLoading && (
            <div className='flex w-full items-center justify-center py-7'>
              <Loader />
            </div>
          )}
          {tradeMatkulPost.isSuccess &&
            tradeMatkulPost.data &&
            classOptions.data && (
              <>
                <div className='flex flex-col gap-3 md:flex-row md:justify-between'>
                  <HasMatkulSection
                    data={classOptions.data}
                    defaultValue={{
                      class: tradeMatkulPost.data.hasMatkul.id,
                      matkul: tradeMatkulPost.data.hasMatkul.Matkul.id,
                      semester:
                        tradeMatkulPost.data.hasMatkul.Matkul.semester.toString(),
                    }}
                  />
                  <SearchMatkulSection
                    data={classOptions.data}
                    defaultValue={{
                      class: tradeMatkulPost.data.searchMatkul.id,
                      matkul: tradeMatkulPost.data.searchMatkul.Matkul.id,
                      semester:
                        tradeMatkulPost.data.searchMatkul.Matkul.semester.toString(),
                    }}
                  />
                </div>
                <div className='py-2' />

                <Typography variant='h5'>Deskripsi</Typography>
                <Typography variant='body2'>
                  Tulis deskripsi semenarik mungkin, biar ada yang mau nuker..
                </Typography>
                <Typography variant='body2'>Maksimal 150 karakter</Typography>
                <textarea
                  {...register('description')}
                  defaultValue={tradeMatkulPost.data?.description}
                  className='form-textarea mt-1 w-full rounded-md'
                  rows={3}
                  placeholder='Plisss... yang mau nuker dapat pahala'
                />
                {errors.description && (
                  <Typography variant='label2' className='text-error-500'>
                    {errors.description.message}
                  </Typography>
                )}
                <div className='py-4' />
                <div className='flex items-center gap-4'>
                  <Button
                    variant='filled'
                    icon={FaSave}
                    type='submit'
                    disabled={updateTradeMatkul.isLoading}
                  >
                    Simpan
                  </Button>
                  <Button
                    variant='outlined'
                    disabled={updateTradeMatkul.isLoading}
                    onClick={() => router.back()}
                  >
                    Batal
                  </Button>
                </div>
              </>
            )}
        </form>
      </FormProvider>
    </>
  );
}
