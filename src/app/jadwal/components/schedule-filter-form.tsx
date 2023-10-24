'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

import { api } from '@/utils/api';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Semester = ['1', '2', '3', '4', '5', '6', '7', '8'];

const filterSchema = z.object({
  semester: z.string().nonempty({ message: 'Silahkan pilih semester' }),
  matkul: z.string().optional(),
});

type FilterForm = z.infer<typeof filterSchema>;

const ScheduleFilterForm = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm<FilterForm>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      matkul: searchParams?.get('subject') ?? '',
      semester: searchParams?.get('semester') ?? '',
    },
  });
  const semesterWatch = useWatch({ control: form.control, name: 'semester' });

  const { handleSubmit } = form;
  const listSubjects = api.common.getSubject.useQuery({
    semester: parseInt(semesterWatch),
    withAll: true,
  });
  const onSubmit: SubmitHandler<FilterForm> = (data) => {
    const newParams = new URLSearchParams(searchParams?.toString());
    newParams.set('semester', data.semester);
    newParams.set('subject', data.matkul ?? 'all');
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <FormField
          control={form.control}
          name='semester'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Semester</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Pilih semester' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Semester.map((item, index) => (
                    <SelectItem key={index} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='matkul'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mata Kuliah</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Pilih Mata kuliah' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {listSubjects.data ? (
                    <>
                      {listSubjects.data.map((item, index) => (
                        <SelectItem key={index} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </>
                  ) : null}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <Button type='submit'>Tampilkan Jadwal</Button>
      </form>
    </Form>
  );
};

export default ScheduleFilterForm;
