/* eslint-disable react-hooks/exhaustive-deps */
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useWatch,
} from 'react-hook-form';
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
  hasMatkul: z.string({ required_error: 'Update matkul yang kamu miliki' }),
  hasClass: z.string({ required_error: 'Update kelas yang kamu miliki' }),
  hasMatkulSemester: z
    .number({ required_error: 'Semester tidak boleh kosong' })
    .min(1)
    .max(8),
  searchMatkul: z.string({ required_error: 'Update matkul yang kamu cari' }),
  searchClass: z.string({ required_error: 'Update kelas yang kamu cari' }),
  searchMatkulSemester: z
    .number({ required_error: 'Semester tidak boleh kosong' })
    .min(1)
    .max(8),
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
  const { data: session } = useSession();
  const { id } = router.query;
  const userProfile = api.user.getUserProfile.useQuery(
    {
      id: session?.user.id as string,
    },
    { enabled: Boolean(session?.user.id) }
  );
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
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const updateTradeMatkul = api.tradeMatkul.updateTradeMatkul.useMutation();

  const onSubmit: SubmitHandler<EditTradeMatkulFormSchema> = (data) => {
    toast.promise(
      updateTradeMatkul.mutateAsync({
        description: data.description,
        hasClass: {
          code: data.hasClass,
          name: data.hasMatkul,
        },
        searchClass: {
          code: data.searchClass,
          name: data.searchMatkul,
        },
        tradeMatkulId: id as string,
      }),
      {
        loading: 'Update post trade matkul',
        success: 'Berhasil update post trade matkul',
        error: 'Gagal memperbarui post trade matkul',
      }
    );
  };
  const hasMatkulSemesterField = useWatch({
    control,
    name: 'hasMatkulSemester',
  });
  const searchMatkulSemesterField = useWatch({
    control,
    name: 'searchMatkulSemester',
  });
  const hasMatkulField = useWatch({
    control,
    name: 'hasMatkul',
  });
  const searchMatkulField = useWatch({
    control,
    name: 'searchMatkul',
  });
  const hasMatkulList = api.common.getSubject.useQuery({
    semester: hasMatkulSemesterField,
  });
  const searchMatkulList = api.common.getSubject.useQuery({
    semester: searchMatkulSemesterField,
  });
  const hasClassList = api.common.getClassByMatkul.useQuery({
    matkulName: hasMatkulField,
  });
  const searchClassList = api.common.getClassByMatkul.useQuery({
    matkulName: searchMatkulField,
  });

  return (
    <>
      <Toaster />
      <FormProvider {...methods}>
        <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
          <section className='rounded-md border border-neutral-600 p-4'>
            <Typography variant='h4'>Data diri</Typography>
            <Typography variant='body2' className='py-2'>
              Agar dapat membuat trade matkul, kamu harus melengkapi data diri
              terlebih dulu melalui halaman Profil. Data diri yang harus ada
              meliputi nama lengkap serta kontak id line atau no whatsapp yang
              dapat dihubungi.
            </Typography>
            <Typography variant='body1'>
              Nama Lengkap : {userProfile.data?.fullname}
            </Typography>
            <Typography variant='body1'>
              ID Line : {userProfile.data?.idLine}
            </Typography>
            <Typography variant='body1'>
              No Whatsapp : {userProfile.data?.whatsapp}
            </Typography>
          </section>
          {tradeMatkulPost.isLoading && (
            <div className='flex w-full items-center justify-center py-7'>
              <Loader />
            </div>
          )}
          {tradeMatkulPost.isSuccess && tradeMatkulPost.data && (
            <section className='rounded-md border border-neutral-600 p-4'>
              <Typography variant='h4' className='mb-2'>
                Detail Trade Matkul
              </Typography>
              <Typography variant='h5'>Matkul yang dimiliki</Typography>
              <HasMatkulSection
                control={control}
                defaultValue={{
                  class: tradeMatkulPost.data?.hasMatkul.code,
                  semester: tradeMatkulPost.data?.hasMatkul.Matkul.semester,
                  matkul: tradeMatkulPost.data?.hasMatkul.Matkul.name,
                }}
                hasClassList={hasClassList.data}
                hasMatkulList={hasMatkulList.data}
                hasMatkulField={hasMatkulField}
                hasMatkulSemesterField={hasMatkulSemesterField}
              />
              <div className='py-2' />
              <Typography variant='h5'>Matkul yang dicari</Typography>
              <SearchMatkulSection
                control={control}
                defaultValue={{
                  class: tradeMatkulPost.data?.searchMatkul.code,
                  semester: tradeMatkulPost.data?.searchMatkul.Matkul.semester,
                  matkul: tradeMatkulPost.data?.searchMatkul.Matkul.name,
                }}
                searchClassList={searchClassList.data}
                searchMatkulList={searchMatkulList.data}
                searchMatkulField={searchMatkulField}
                searchMatkulSemesterField={searchMatkulSemesterField}
              />
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
            </section>
          )}
        </form>
      </FormProvider>
    </>
  );
}
