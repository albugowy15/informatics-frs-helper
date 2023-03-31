/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { Control, Controller, useFormContext } from 'react-hook-form';

import { SelectInput } from '@/components/Form';

import { CreateTradeMatkulFormSchema } from '@/pages/my-trading-matkul/create/[userId]';

type HasMatkulProps = {
  control: Control<CreateTradeMatkulFormSchema, unknown>;
  hasMatkulList: string[] | undefined;
  hasMatkulSemesterField: number | undefined;
  hasClassList: string[] | undefined;
  hasMatkulField: string | undefined;
};

const HasMatkulSection = ({
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

export default HasMatkulSection;
