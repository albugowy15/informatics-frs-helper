import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
  useWatch,
} from 'react-hook-form';
import { BiFilterAlt } from 'react-icons/bi';
import { z } from 'zod';

import { api } from '@/utils/api';
import { renderPageTitle } from '@/utils/page';

import { Button } from '@/components/Button';
import { SelectInput } from '@/components/Form';
import Typography from '@/components/Typography';

const DynamicModal = dynamic(() => import('@/components/Modal'));
const DynamicLoader = dynamic(() => import('@/components/Loader'));

const filterSchema = z.object({
  semester: z.string().optional(),
  matkul: z.string().optional(),
});

type FilterForm = z.infer<typeof filterSchema>;

type SelectedTradeMatkul = {
  name: string | null;
  line: string;
  whatsapp: string;
};

const TradingMatkulPage = () => {
  const methods = useForm<FilterForm>({
    resolver: zodResolver(filterSchema),
  });
  const { control, handleSubmit, resetField, register } = methods;
  const semesterField = useWatch({
    control,
    name: 'semester',
  });
  const onSubmit: SubmitHandler<FilterForm> = (data) => {
    setSubmitedData(data);
  };
  const listSubject = api.common.getSubject.useQuery(
    {
      semester: parseInt(semesterField as string),
      withAll: true,
    },
    { enabled: Boolean(semesterField) },
  );
  // reset matkul field when semester field changed
  useEffect(() => {
    resetField('matkul');
  }, [resetField, semesterField]);

  const [filterModal, setFilterModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedTradeMatkul, setSelectedTradeMatkul] =
    useState<SelectedTradeMatkul>();
  const [submitedData, setSubmitedData] = useState<FilterForm>();

  const tradeMatkulPosts = api.tradeMatkul.getAllTradeMatkul.useQuery({
    matkul: submitedData?.matkul,
    semester: submitedData?.semester
      ? parseInt(submitedData.semester)
      : undefined,
  });

  return (
    <>
      <NextSeo
        title={renderPageTitle('Trading Matkul')}
        description='Tempat untuk trade matkul informatika ITS'
      />
      <div className='gap-4 lg:flex'>
        <aside className='sticky top-4 hidden h-fit w-[26%] flex-shrink-0 rounded-xl border border-neutral-700 p-4 lg:block'>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='flex flex-col gap-4'
            >
              <Controller
                name='semester'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <SelectInput
                    placeholder='Pilih Semester'
                    data={['1', '2', '3', '4', '5', '6', '7', '8']}
                    label='Pilih Semester'
                    error={error}
                    {...field}
                  />
                )}
              />

              <Controller
                name='matkul'
                control={control}
                render={({ field }) => (
                  <SelectInput
                    placeholder='Pilih Matkul'
                    disabled={semesterField === undefined}
                    data={listSubject.data}
                    label='Pilih Matkul'
                    helperText='Pilih mata kuliah yang Anda inginkan (Want)'
                    {...field}
                  />
                )}
              />
              <Button variant='tonal' className='mt-5 w-fit' type='submit'>
                Tampilkan Trading Matkul
              </Button>
            </form>
          </FormProvider>
        </aside>

        {tradeMatkulPosts.isLoading && (
          <div className='flex h-screen w-full items-center justify-center'>
            <DynamicLoader />
          </div>
        )}
        {tradeMatkulPosts.isSuccess && tradeMatkulPosts.data.length === 0 && (
          <Typography
            variant='h3'
            className='w-full py-5 text-center text-neutral-600'
          >
            Tidak ada trading matkul untuk saat ini
          </Typography>
        )}

        {tradeMatkulPosts.isError && (
          <Typography variant='h3' className='text-center'>
            Terjadi kesalahan saat memuat data
          </Typography>
        )}
        {tradeMatkulPosts.isSuccess && (
          <main className='grid w-full gap-2 md:grid-cols-2 lg:grid-cols-3'>
            {tradeMatkulPosts.data.map((post) => (
              <>
                <div
                  key={post.id}
                  className='rounded-lg border border-neutral-600 p-3'
                >
                  <Typography variant='body1' className='font-medium'>
                    {post.User?.fullname}
                  </Typography>
                  <Typography variant='body2'>{post.User?.username}</Typography>
                  <div className='py-1' />
                  <Typography variant='body1'>
                    <span className='font-medium text-error-500'>Want</span> :{' '}
                    {post.searchMatkul.Matkul.name} {post.searchMatkul.code}
                  </Typography>
                  <Typography variant='body1'>
                    <span className='font-medium text-secondary-500'>Have</span>{' '}
                    : {post.hasMatkul.Matkul.name} {post.hasMatkul.code}
                  </Typography>
                  <Typography variant='body2' className='py-3'>
                    {post.description}
                  </Typography>
                  <Typography variant='body1' className='font-medium'>
                    Kontak
                  </Typography>
                  <div className='flex items-center gap-4'>
                    <Typography variant='body2'>
                      WA : {post.User?.whatsapp ? post.User.whatsapp : '-'}
                    </Typography>
                    <Typography variant='body2'>
                      Line : {post.User?.idLine ? post.User.idLine : '-'}
                    </Typography>
                  </div>
                  <div className='py-3' />
                  <div className='flex justify-end'>
                    <Button
                      variant='filled'
                      onClick={() => {
                        if (post.User) {
                          setSelectedTradeMatkul({
                            name: post.User.fullname
                              ? post.User.fullname
                              : post.User.fullname,
                            line: post.User.idLine ?? '-',
                            whatsapp: post.User.whatsapp ?? '-',
                          });

                          setConfirmModal(true);
                        }
                      }}
                    >
                      Terima
                    </Button>
                  </div>
                </div>
                <DynamicModal
                  title='Konfirmasi Trade Matkul'
                  isOpen={confirmModal}
                  setIsOpen={setConfirmModal}
                >
                  <Typography variant='body1' className='py-2'>
                    Silahkan menghubungi{' '}
                    <span className='font-bold'>
                      {selectedTradeMatkul?.name}
                    </span>{' '}
                    melalui kontak dibawah berikut :
                  </Typography>
                  <Typography variant='body1'>
                    WA : {selectedTradeMatkul?.whatsapp ?? '-'}
                  </Typography>
                  <Typography variant='body1'>
                    Line : {selectedTradeMatkul?.line ?? '-'}
                  </Typography>

                  <div className='flex justify-end'>
                    <Button
                      variant='outlined'
                      onClick={() => setConfirmModal(false)}
                    >
                      Close
                    </Button>
                  </div>
                </DynamicModal>
              </>
            ))}
          </main>
        )}

        <Button
          variant='filled'
          className='fixed bottom-0 left-0 right-0 mx-auto mb-7 w-fit lg:hidden'
          onClick={() => setFilterModal(true)}
          icon={BiFilterAlt}
        >
          Filter
        </Button>
        <DynamicModal
          isOpen={filterModal}
          setIsOpen={setFilterModal}
          title='Filter Jadwal'
        >
          <div className='overflow-scroll py-3'>
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col gap-4'
              >
                <div>
                  <label className=' text-sm font-medium'>Pilih Semester</label>
                  <select
                    className='mt-1 block w-full rounded-lg border border-neutral-600 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-0'
                    placeholder='Semester'
                    {...register('semester')}
                  >
                    <option value='' disabled>
                      Semester
                    </option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                      <option value={item} key={index}>
                        Semester {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className='text-sm font-medium'>Pilih Matkul</label>
                  <select
                    className='mt-1 block w-full rounded-lg border border-neutral-600 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-0'
                    placeholder='Matkul'
                    {...register('matkul')}
                  >
                    <option value='' disabled>
                      Matkul
                    </option>
                    {listSubject.data?.map((item, index) => (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='flex items-center justify-end gap-1'>
                  <Button
                    variant='text'
                    size='sm'
                    type='submit'
                    onClick={() => setFilterModal(false)}
                  >
                    Tampilkan Jadwal
                  </Button>
                  <Button
                    variant='text'
                    size='sm'
                    onClick={() => setFilterModal(false)}
                  >
                    Batal
                  </Button>
                </div>
              </form>
            </FormProvider>
          </div>
        </DynamicModal>
      </div>
    </>
  );
};

export default TradingMatkulPage;
