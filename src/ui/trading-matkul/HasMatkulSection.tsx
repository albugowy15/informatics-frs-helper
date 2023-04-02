/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import Typography from '@/components/Typography';

type HasMatkulProps = {
  data: {
    listSemester: {
      id: number;
      semester: number;
    }[];
    listSubject: {
      id: string;
      matkul: string;
      semesterId: number;
    }[];
    listClass: {
      id: string;
      class: string;
      matkulId: string;
    }[];
  };
  defaultValue?: {
    semester: string;
    matkul: string;
    class: string;
  };
};

const HasMatkulSection = ({ data, defaultValue }: HasMatkulProps) => {
  const [listMatkul, setListMatkul] = useState<
    {
      id: string;
      matkul: string;
      semesterId: number;
    }[]
  >([]);
  const [listClass, setListClass] = useState<
    {
      id: string;
      class: string;
      matkulId: string;
    }[]
  >([]);

  useEffect(() => {
    if (defaultValue) {
      const newListMatkul = data.listSubject.filter(
        (subject) => subject.semesterId === parseInt(defaultValue.semester)
      );
      setListMatkul(newListMatkul);

      const newClassList = data.listClass.filter(
        (classItem) => classItem.matkulId === defaultValue.matkul
      );
      setListClass(newClassList);
    }
  }, []);

  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className='flex w-full flex-col gap-2'>
      <Typography variant='h5'>Matkul yang dimiliki</Typography>
      <div>
        <label className='text-sm font-medium'>Pilih Semester</label>
        <select
          className='mt-1 block w-full rounded-lg border border-neutral-600 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-0'
          {...register('hasMatkulSemester')}
          onChange={(e) => {
            const newListMatkul = data.listSubject.filter(
              (subject) => subject.semesterId == parseInt(e.target.value)
            );
            setListMatkul(newListMatkul);
          }}
          defaultValue={defaultValue?.semester}
        >
          {defaultValue === undefined && (
            <option disabled value='' selected hidden>
              Semester
            </option>
          )}
          {data.listSemester.map((semester) => (
            <option
              value={semester.semester}
              selected={
                defaultValue
                  ? defaultValue.semester == semester.semester.toString()
                  : false
              }
              key={semester.id}
            >
              {semester.semester}
            </option>
          ))}
        </select>
        {errors['hasMatkulSemester'] && (
          <Typography variant='label2' className='mt-1 text-error-500'>
            {errors['hasMatkulSemester'].message as string}
          </Typography>
        )}
      </div>
      <div>
        <label className=' text-sm font-medium'>Pilih Matkul</label>
        <select
          className='mt-1 block w-full rounded-lg border border-neutral-600 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-0'
          {...register('hasMatkul')}
          onChange={(e) => {
            const newClassList = data.listClass.filter(
              (classItem) => classItem.matkulId == e.target.value.toString()
            );

            setListClass(newClassList);
          }}
          defaultValue={defaultValue?.matkul}
        >
          {defaultValue === undefined && (
            <option disabled selected value='' hidden>
              Mata Kuliah
            </option>
          )}
          {listMatkul.map((matkul) => (
            <option
              value={matkul.id}
              selected={defaultValue ? defaultValue.matkul == matkul.id : false}
              key={matkul.id}
            >
              {matkul.matkul}
            </option>
          ))}
        </select>
        {errors['hasMatkul'] && (
          <Typography variant='label2' className='mt-1 text-error-500'>
            {errors['hasMatkul'].message as string}
          </Typography>
        )}
      </div>
      <div>
        <label className=' text-sm font-medium'>Pilih Kelas</label>
        <select
          className='mt-1 block w-full rounded-lg border border-neutral-600 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-0'
          {...register('hasClass')}
          defaultValue={defaultValue?.class}
        >
          {defaultValue === undefined && (
            <option disabled selected value='' hidden>
              Kelas
            </option>
          )}
          {listClass.map((kelas) => (
            <option
              value={kelas.id}
              key={kelas.id}
              selected={defaultValue ? defaultValue.class == kelas.id : false}
            >
              {kelas.class}
            </option>
          ))}
        </select>
        {errors['hasClass'] && (
          <Typography variant='label2' className='mt-1 text-error-500'>
            {errors['hasClass'].message as string}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default HasMatkulSection;
