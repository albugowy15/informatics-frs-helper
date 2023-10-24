'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

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

const filterSchema = z.object({
  semester: z.string().optional(),
  matkul: z.string().optional(),
});

type FilterForm = z.infer<typeof filterSchema>;

const TradingFilterForm = () => {
  const form = useForm<FilterForm>({
    resolver: zodResolver(filterSchema),
  });
  const { handleSubmit } = form;
  const onSubmit: SubmitHandler<FilterForm> = (data) => {
    setSubmitedData(data);
  };
  const [submitedData, setSubmitedData] = useState<FilterForm>();

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
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
                  {['1', '2', '3', '4', '5', '6', '7', '8'].map(
                    (item, index) => (
                      <SelectItem key={index} value={item}>
                        {item}
                      </SelectItem>
                    ),
                  )}
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
              <FormLabel>Pilih Matkul</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Pilih matkul'></SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[
                    'Matkul 1',
                    'Matkul 2',
                    'Matkul 3',
                    'Matkul 4',
                    'Matkul 5',
                    'Matkul 6',
                    'Matkul 7',
                    'Matkul 8',
                  ].map((item, index) => (
                    <SelectItem key={index} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button type='submit'>Tampilkan Trading Matkul</Button>
      </form>
    </Form>
  );
};

export default TradingFilterForm;
