import { zodResolver } from '@hookform/resolvers/zod';
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

import Accordion from '@/components/Accordion';
import { Button } from '@/components/Button';
import { SelectInput } from '@/components/Form';
import Loader from '@/components/Loader';
import Modal from '@/components/Modal';
import Typography from '@/components/Typography';

const Semester = ['1', '2', '3', '4', '5', '6'];

const filterSchema = z.object({
  semester: z.string().nonempty({ message: 'Silahkan pilih semester' }),
  matkul: z.string().optional(),
});

type FilterForm = z.infer<typeof filterSchema>;

export default function SchedulePage() {
  // Form
  const methods = useForm<FilterForm>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      matkul: '',
      semester: '',
    },
  });

  const { control, handleSubmit, resetField, register } = methods;

  const semesterField = useWatch({
    control,
    name: 'semester',
  });

  const onSubmit: SubmitHandler<FilterForm> = (data) => {
    setSubmitedData(data);
  };

  const [submitedData, setSubmitedData] = useState<FilterForm>();

  // Fetch data
  const response = api.common.getClass.useQuery(
    {
      matkul: submitedData?.matkul,
      semester: parseInt(submitedData?.semester as string),
    },
    { enabled: Boolean(submitedData) }
  );

  const listSubject = api.common.getSubject.useQuery(
    {
      semester: parseInt(semesterField),
      withAll: true,
    },
    { enabled: Boolean(semesterField) }
  );

  // reset matkul field when semester field changed
  useEffect(() => {
    resetField('matkul');
  }, [resetField, semesterField]);

  const [filterModal, setFilterModal] = useState(false);

  return (
    <>
      <NextSeo
        title={renderPageTitle('Informasi Jadwal')}
        description='Informasi Jadwal Mata Kuliah Informatika ITS'
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
                    data={Semester}
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
                    disabled={semesterField === ''}
                    data={listSubject.data}
                    label='Pilih Matkul'
                    helperText='Silahkan pilih semester dulu untuk menampilkan opsi'
                    {...field}
                  />
                )}
              />

              <Button variant='tonal' className='mt-5 w-fit' type='submit'>
                Tampilkan Jadwal
              </Button>
            </form>
          </FormProvider>
        </aside>
        {submitedData != undefined ? (
          <>
            {response.isLoading && (
              <div className='flex h-screen w-full items-center justify-center'>
                <Loader />
              </div>
            )}
            {response.isSuccess && response.data.length === 0 && (
              <Typography
                variant='h3'
                className='w-full py-5 text-center text-neutral-600'
              >
                Tidak ada data yang sesuai dengan filter
              </Typography>
            )}
          </>
        ) : (
          <Typography
            variant='h3'
            className='w-full py-5 text-center text-neutral-600'
          >
            Silahkan tentukan filter terlebih dahulu
          </Typography>
        )}
        {response.isError && (
          <Typography variant='h3' className='text-center'>
            Terjadi kesalahan saat memuat data
          </Typography>
        )}
        {response.isSuccess && (
          <main className='flex w-full flex-col gap-3 lg:px-3'>
            {response.data.map((matkul) => (
              <>
                <Accordion
                  title={
                    <div>
                      <Typography variant='h5'>{matkul.name}</Typography>
                      <Typography variant='body2'>
                        Semester {matkul.semester} | {matkul.sks} sks |{' '}
                        {matkul.Class.length} kelas
                      </Typography>
                    </div>
                  }
                >
                  <div className='grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-4'>
                    {matkul.Class.map((item) => (
                      <div
                        className='flex flex-col gap-1 rounded-lg border border-neutral-600 p-2.5'
                        key={item.id}
                      >
                        <Typography variant='body2' className='font-medium'>
                          {matkul.name} {item.code}
                        </Typography>
                        <Typography variant='body3'>
                          {item.Lecturer.fullname}
                        </Typography>
                        <Typography variant='body3'>
                          {item.day}, {item.Session.session_time} WIB
                        </Typography>
                      </div>
                    ))}
                  </div>
                </Accordion>
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
        <Modal
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
                    {Semester.map((item, index) => (
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
        </Modal>
      </div>
    </>
  );
}
