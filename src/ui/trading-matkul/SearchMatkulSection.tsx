/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { Control, Controller, useFormContext } from 'react-hook-form';

import { SelectInput } from '@/components/Form';

import { CreateTradeMatkulFormSchema } from '@/pages/my-trading-matkul/create/[userId]';

type SearchMatkulProps = {
  control: Control<CreateTradeMatkulFormSchema, unknown>;
  searchMatkulList: string[] | undefined;
  searchMatkulSemesterField: number | undefined;
  searchClassList: string[] | undefined;
  searchMatkulField: string | undefined;
  defaultValue?: {
    semester: number;
    matkul: string;
    class: string;
  };
};

const SearchMatkulSection = ({
  control,
  searchMatkulList,
  searchMatkulSemesterField,
  searchClassList,
  searchMatkulField,
  defaultValue,
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
        defaultValue={defaultValue?.semester}
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
        defaultValue={defaultValue?.matkul}
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
        defaultValue={defaultValue?.class}
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

export default SearchMatkulSection;
