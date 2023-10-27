'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
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

import { Semester } from '@/config/contants';
import { api } from '@/trpc/react';

const filterSchema = z.object({
  semester: z.string().optional(),
  matkul: z.string().optional(),
});

type FilterForm = z.infer<typeof filterSchema>;

const TradingFilterForm = () => {
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

  const listSubjects = api.common.getSubject.useQuery(
    {
      semester: parseInt(semesterWatch!),
      withAll: true,
    },
    { enabled: semesterWatch !== undefined },
  );
  const onSubmit: SubmitHandler<FilterForm> = (data) => {
    const newParams = new URLSearchParams(searchParams?.toString());
    newParams.set('semester', data.semester ?? '');
    newParams.set('subject', data.matkul ?? 'all');
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-4'
      >
        <FormField
          control={form.control}
          name='semester'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pilih Semester</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Pilih semester'></SelectValue>
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
            <FormItem>
              <FormLabel>Matkul yang dicari (Want)</FormLabel>
              <FormDescription>
                Pilih matkul yang ingin kamu cari atau kami inginkan (Want)
              </FormDescription>
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
                        <SelectItem key={index} value={item.name}>
                          {item.name}
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
        <Button type='submit'>Tampilkan Trading Matkul</Button>
      </form>
    </Form>
  );
};

export default TradingFilterForm;
