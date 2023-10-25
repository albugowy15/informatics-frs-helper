'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Semester } from '@/utils/contatnts';

import Typography from '@/components/typography';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const createFRSFormSchema = z.object({
  title: z
    .string({
      required_error: 'Judul rencana FRS tidak boleh kosong',
    })
    .min(1, { message: 'Judul rencana FRS tidak boleh kosong' })
    .max(20, { message: 'Judul rencana FRS maksimal 20 karakter' }),
  semester: z
    .string({ required_error: 'Semester tidak boleh kosong' })
    .min(1, { message: 'Silahkan pilih semester' }),
});

type CreateFRSFormType = z.infer<typeof createFRSFormSchema>;

const CreateFRSForm = () => {
  const form = useForm<CreateFRSFormType>({
    resolver: zodResolver(createFRSFormSchema),
  });

  const onSubmit: SubmitHandler<CreateFRSFormType> = (data) => {};
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Judul Plan</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='semester'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pilih Semester</FormLabel>
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

        <div>
          <Typography variant='h4'>Matkul yang diambil</Typography>
          <Typography variant='label1' className='font-normal pt-2'>
            Kamu belum mengambil matkul apapun
          </Typography>
        </div>

        <Typography variant='h4'>Total SKS : 0</Typography>
        <Button type='submit'>Simpan</Button>
      </form>
    </Form>
  );
};

export default CreateFRSForm;
