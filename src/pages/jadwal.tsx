import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
  useWatch,
} from 'react-hook-form';
import { z } from 'zod';

import { api } from '@/utils/api';

import { Button } from '@/components/Button';
import { SelectInput, SwitchInput } from '@/components/Form';
import Modal from '@/components/Modal';
import Typography from '@/components/Typography';

const Semester = ['1', '2', '3'];

const Subject: Record<string, string[]> = {
  '1': ['Semua', 'fefefe', 'fefhehfhe', 'fefefef'],
  '2': ['Semua', 'fhfhehfe', 'yyetyeot', 'vbduuuer'],
  '3': ['Semua', 'qtq55ete', '88y3yhd', 'ppppppp'],
};

const filterSchema = z.object({
  semester: z.string().nonempty({ message: 'Silahkan pilih semester' }),
  matkul: z.string().optional(),
  showAccelProgram: z.boolean(),
});

type FilterForm = z.infer<typeof filterSchema>;

export default function SchedulePage() {
  const methods = useForm<FilterForm>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      matkul: '',
      semester: '',
      showAccelProgram: false,
    },
  });

  const [submitedData, setSubmitedData] = useState<FilterForm>();
  const response = api.public.getClass.useQuery(
    {
      matkul: submitedData?.matkul,
      isAksel: submitedData?.showAccelProgram as boolean,
      semester: parseInt(submitedData?.semester as string),
    },
    { enabled: Boolean(submitedData) }
  );

  const onSubmit: SubmitHandler<FilterForm> = (data) => {
    setSubmitedData(data);
  };

  const [listMatkul, setListMatkul] = useState<string[]>();
  const { control, handleSubmit } = methods;

  const semesterField = useWatch({
    control,
    name: 'semester',
  });

  useEffect(() => {
    setListMatkul(Subject[semesterField]);
  }, [semesterField]);

  const [filterModal, setFilterModal] = useState(false);

  return (
    <div className='gap-4 lg:flex'>
      <aside className='top-4 hidden h-fit w-[26%] flex-shrink-0 rounded-xl border p-4 lg:sticky'>
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
                  data={listMatkul ? listMatkul : undefined}
                  label='Pilih Matkul'
                  helperText='Silahkan pilih semester dulu untuk menampilkan opsi'
                  {...field}
                />
              )}
            />
            <Controller
              name='showAccelProgram'
              control={control}
              render={({ field }) => (
                <SwitchInput label='Tampilkan Matkul Akselerasi' {...field} />
              )}
            />
            <Button variant='tonal' className='mt-5 w-fit' type='submit'>
              Tampilkan Jadwal
            </Button>
          </form>
        </FormProvider>
      </aside>
      <main className='flex flex-col gap-5 lg:px-3'>
        <div>
          {response.data?.map((matkul) => (
            <>
              <Typography variant='h3'>{matkul.name}</Typography>
              <Typography variant='body1'>
                Semester {matkul.semester} | {matkul.sks} sks
              </Typography>
              <div className='flex flex-wrap gap-2 py-3'>
                {matkul.Class.map((item) => (
                  <div
                    className='flex flex-col gap-1 rounded border p-2.5'
                    key={item.id}
                  >
                    <Typography variant='h6'>
                      {matkul.name} {item.code}
                    </Typography>
                    <Typography variant='body1'>
                      {item.Lecturer.fullname}
                    </Typography>
                    <Typography variant='body2'>
                      {item.day}, {item.Session.session_time} WIB
                    </Typography>
                    <Typography variant='body2'>Ruang IF-1037</Typography>
                  </div>
                ))}
              </div>
            </>
          ))}
        </div>
      </main>
      <Button
        variant='filled'
        className='fixed bottom-0 left-0 right-0 mx-auto mb-4 lg:hidden'
        onClick={() => setFilterModal(true)}
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
                    data={listMatkul ? listMatkul : undefined}
                    label='Pilih Matkul'
                    helperText='Silahkan pilih semester dulu untuk menampilkan opsi'
                    {...field}
                  />
                )}
              />
              <Controller
                name='showAccelProgram'
                control={control}
                render={({ field }) => (
                  <SwitchInput label='Tampilkan Matkul Akselerasi' {...field} />
                )}
              />
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
  );
}
