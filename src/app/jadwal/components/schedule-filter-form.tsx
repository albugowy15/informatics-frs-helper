'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
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
const matkul = ['AJK', 'Jarkom', 'PBKK'];

const filterSchema = z.object({
  semester: z.string().nonempty({ message: 'Silahkan pilih semester' }),
  matkul: z.string().optional(),
});

type FilterForm = z.infer<typeof filterSchema>;

const ScheduleFilterForm = () => {
  const form = useForm<FilterForm>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      matkul: '',
      semester: '',
    },
  });

  const { handleSubmit } = form;

  const [submitedData, setSubmitedData] = useState<FilterForm>();
  const onSubmit: SubmitHandler<FilterForm> = (data) => {
    setSubmitedData(data);
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
              <FormDescription>Silahkan pilih semester</FormDescription>
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
              <FormDescription>Silahkan pilih matkul</FormDescription>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Pilih Mata kuliah' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {matkul.map((item, index) => (
                    <SelectItem key={index} value={item}>
                      {item}
                    </SelectItem>
                  ))}
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
