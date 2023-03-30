/* eslint-disable react-hooks/exhaustive-deps */
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
  Control,
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { FaSave } from 'react-icons/fa';
import { z } from 'zod';

import { api } from '@/utils/api';

import { Button } from '@/components/Button';
import { SelectInput } from '@/components/Form';
import Typography from '@/components/Typography';

const createTradeMatkulFormSchema = z.object({
  hasMatkul: z.string({ required_error: 'Pilih matkul yang kamu miliki' }),
  hasClass: z.string({ required_error: 'Pilih kelas yang kamu miliki' }),
  hasMatkulSemester: z
    .number({ required_error: 'Semester tidak boleh kosong' })
    .min(1)
    .max(8),
  searchMatkul: z.string({ required_error: 'Pilih matkul yang kamu cari' }),
  searchClass: z.string({ required_error: 'Pilih kelas yang kamu cari' }),
  searchMatkulSemester: z
    .number({ required_error: 'Semester tidak boleh kosong' })
    .min(1)
    .max(8),
  description: z
    .string({ required_error: 'Deskripsi tidak boleh kosong' })
    .max(150, { message: 'Deskripsi tidak boleh lebih dari 150 karakter' }),
});

type CreateTradeMatkulFormSchema = z.infer<typeof createTradeMatkulFormSchema>;

type HasMatkulProps = {
  control: Control<CreateTradeMatkulFormSchema, unknown>;
  hasMatkulList: string[] | undefined;
  hasMatkulSemesterField: number | undefined;
  hasClassList: string[] | undefined;
  hasMatkulField: string | undefined;
};

const HasMatkul = ({
  control,
  hasMatkulList,
  hasMatkulSemesterField,
  hasClassList,
  hasMatkulField,
}: HasMatkulProps) => {
  const { resetField } = useFormContext();
  useEffect(() => {
    resetField('hasMatkul');
  }, [hasMatkulSemesterField]);
  useEffect(() => {
    resetField('hasClass');
  }, [hasMatkulField]);
  return (
    <div className='flex flex-col items-center gap-4 lg:flex-row'>
      <Controller
        name='hasMatkulSemester'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <SelectInput
            data={[1, 2, 3, 4, 5, 6, 7, 8]}
            placeholder='Semester'
            label='Semester'
            error={error}
            {...field}
          />
        )}
      />
      <Controller
        name='hasMatkul'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <SelectInput
            placeholder='Matkul yang dimiliki'
            label='Pilih matkul yang dimiliki'
            data={hasMatkulList}
            error={error}
            {...field}
          />
        )}
      />
      <Controller
        name='hasClass'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <SelectInput
            placeholder='Kelas yang dimiliki'
            label='Pilih kelas yang dimiliki'
            data={hasClassList}
            error={error}
            {...field}
          />
        )}
      />
    </div>
  );
};

type SearchMatkulProps = {
  control: Control<CreateTradeMatkulFormSchema, unknown>;
  searchMatkulList: string[] | undefined;
  searchMatkulSemesterField: number | undefined;
  searchClassList: string[] | undefined;
  searchMatkulField: string | undefined;
};

const SearchMatkul = ({
  control,
  searchMatkulList,
  searchMatkulSemesterField,
  searchClassList,
  searchMatkulField,
}: SearchMatkulProps) => {
  const { resetField } = useFormContext();

  useEffect(() => {
    resetField('searchMatkul');
  }, [searchMatkulSemesterField]);

  useEffect(() => {
    resetField('searchClass');
  }, [searchMatkulField]);
  return (
    <div className='flex flex-col items-center gap-4 lg:flex-row'>
      <Controller
        name='searchMatkulSemester'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <SelectInput
            data={[1, 2, 3, 4, 5, 6, 7, 8]}
            placeholder='Semester'
            label='Semester'
            error={error}
            {...field}
          />
        )}
      />
      <Controller
        name='searchMatkul'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <SelectInput
            placeholder='Matkul yang dicari'
            label='Pilih matkul yang dicari'
            data={searchMatkulList}
            error={error}
            {...field}
          />
        )}
      />
      <Controller
        name='searchClass'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <SelectInput
            placeholder='Kelas yang dicari'
            label='Pilih kelas yang dicari'
            data={searchClassList}
            error={error}
            {...field}
          />
        )}
      />
    </div>
  );
};

export default function CreateTradeMatkulPage() {
  const router = useRouter();
  const { userId } = router.query;
  const userProfile = api.protected.getUserProfile.useQuery(
    {
      id: userId as string,
    },
    { enabled: Boolean(userId) }
  );

  const methods = useForm<CreateTradeMatkulFormSchema>({
    resolver: zodResolver(createTradeMatkulFormSchema),
    defaultValues: {
      hasMatkulSemester: undefined,
      searchMatkulSemester: undefined,
    },
  });
  const { control, register, handleSubmit } = methods;
  const postTradeMatkul = api.protected.createTradeMatkul.useMutation();

  const onSubmit: SubmitHandler<CreateTradeMatkulFormSchema> = (data) => {
    toast.promise(
      postTradeMatkul.mutateAsync({
        description: data.description,
        hasClass: {
          code: data.hasClass,
          name: data.hasMatkul,
        },
        searchClass: {
          code: data.searchClass,
          name: data.searchMatkul,
        },
        userId: userId as string,
      }),
      {
        loading: 'Membuat post trade matkul',
        success: 'Berhasil membuat post trade matkul',
        error: 'Gagal membuat post trade matkul',
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
  const hasMatkulList = api.public.getSubject.useQuery({
    semester: hasMatkulSemesterField,
  });
  const searchMatkulList = api.public.getSubject.useQuery({
    semester: searchMatkulSemesterField,
  });
  const hasClassList = api.protected.getClassByMatkul.useQuery({
    matkulName: hasMatkulField,
  });
  const searchClassList = api.protected.getClassByMatkul.useQuery({
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
          <section className='rounded-md border border-neutral-600 p-4'>
            <Typography variant='h4' className='mb-2'>
              Detail Trade Matkul
            </Typography>
            <Typography variant='h5'>Matkul yang dimiliki</Typography>
            <HasMatkul
              control={control}
              hasClassList={hasClassList.data}
              hasMatkulList={hasMatkulList.data}
              hasMatkulField={hasMatkulField}
              hasMatkulSemesterField={hasMatkulSemesterField}
            />
            <div className='py-2' />
            <Typography variant='h5'>Matkul yang dicari</Typography>
            <SearchMatkul
              control={control}
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
              className='form-textarea mt-1 w-full rounded-md'
              rows={3}
              placeholder='Plisss... yang mau nuker dapat pahala'
            />
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
          </section>
        </form>
      </FormProvider>
    </>
  );
}
