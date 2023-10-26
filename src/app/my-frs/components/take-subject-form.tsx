'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

import { Semester } from '@/utils/contatnts';

import { Button } from '@/components/ui/button';
import {
  Form,
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
  SelectValue,
} from '@/components/ui/select';

import { api } from '@/trpc/react';

const takeClassSchema = z.object({
  semester: z.string().min(1, { message: 'Silahkan pilih semester' }),
  matkul: z.string().optional(),
});

type TakeClassFormType = z.infer<typeof takeClassSchema>;

const TakeClassForm = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm({
    resolver: zodResolver(takeClassSchema),
    defaultValues: {
      matkul: searchParams?.get('subject') ?? '',
      semester: searchParams?.get('semester') ?? '',
    },
  });
  const semesterWatch = useWatch({ control: form.control, name: 'semester' });

  const listSubjects = api.common.getSubject.useQuery({
    semester: parseInt(semesterWatch),
    withAll: true,
  });

  const onSubmit: SubmitHandler<TakeClassFormType> = (data) => {
    const newParams = new URLSearchParams(searchParams?.toString());
    newParams.set('semester', data.semester);
    newParams.set('subject', data.matkul ?? 'Semua');
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col lg:flex-row gap-3 lg:items-end'
      >
        <FormField
          control={form.control}
          name='semester'
          render={({ field }) => (
            <FormItem className='lg:w-1/3'>
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='matkul'
          render={({ field }) => (
            <FormItem className='lg:w-1/3'>
              <FormLabel>Mata Kuliah</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Pilih Mata kuliah' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className='overflow-scroll max-h-52'>
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
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-fit'>
          Filter
        </Button>
      </form>
    </Form>
  );
};

export default TakeClassForm;
