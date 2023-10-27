'use client';

import { SelectValue } from '@radix-ui/react-select';
import { useFormContext, useWatch } from 'react-hook-form';

import { Semester } from '@/utils/contatnts';

import Typography from '@/components/typography';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';

import { CreateTradeMatkulFormSchema } from '@/app/my-trade-matkul/components/trade-matkul-form';
import { api } from '@/trpc/react';

const HasMatkulSection = () => {
  const formCtx = useFormContext<CreateTradeMatkulFormSchema>();
  const semesterWatch = useWatch({
    control: formCtx.control,
    name: 'hasMatkulSemester',
  });
  const subjectWatch = useWatch({
    control: formCtx.control,
    name: 'hasMatkul',
  });
  const listSubject = api.common.getSubject.useQuery({
    semester: parseInt(semesterWatch),
  });
  const listClass = api.common.getClassBySubject.useQuery({
    subjectId: subjectWatch,
  });

  const { control } = useFormContext();
  return (
    <div className='flex w-full flex-col gap-2'>
      <Typography variant='h4'>Kelas yang dimiliki</Typography>
      <FormField
        control={control}
        name='hasMatkulSemester'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pilih semester</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder='Pilih semester'></SelectValue>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Semester.map((semester, index) => (
                  <SelectItem value={semester} key={index}>
                    {semester}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='hasMatkul'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pilih matkul</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder='Pilih matkul'></SelectValue>
                </SelectTrigger>
              </FormControl>
              <SelectContent className='overflow-y-auto max-h-52'>
                {listSubject.data && listSubject.data.length > 0 ? (
                  <>
                    {listSubject.data.map((subject) => (
                      <SelectItem value={subject.id} key={subject.id}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </>
                ) : (
                  <SelectItem disabled value='no-class'>
                    --Tidak ada matkul--
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='hasClass'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pilih kelas</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder='Pilih kelas'></SelectValue>
                </SelectTrigger>
              </FormControl>
              <SelectContent className='overflow-y-auto max-h-52'>
                {listClass.data && listClass.data.length > 0 ? (
                  <>
                    {listClass.data.map((kelas) => (
                      <SelectItem value={kelas.id} key={kelas.id}>
                        {kelas.code}
                      </SelectItem>
                    ))}
                  </>
                ) : (
                  <SelectItem disabled value='no-class'>
                    --Tidak ada kelas--
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default HasMatkulSection;
