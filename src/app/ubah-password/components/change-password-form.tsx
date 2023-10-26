'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
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
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

import { api } from '@/trpc/react';

const changePasswordForm = z.object({
  old_password: z.string({
    required_error: 'Password lama tidak boleh kosong',
  }),
  new_password: z
    .string({ required_error: 'Password baru tidak boleh kosong' })
    .min(8)
    .max(16),
});

type CreatePasswordForm = z.infer<typeof changePasswordForm>;

const ChangePasswordForm = () => {
  const form = useForm<CreatePasswordForm>({
    resolver: zodResolver(changePasswordForm),
  });
  const { handleSubmit } = form;
  const mutatePassword = api.user.changePassword.useMutation();
  const onSubmit: SubmitHandler<CreatePasswordForm> = (data) => {
    mutatePassword
      .mutateAsync({
        new_password: data.new_password,
        old_password: data.old_password,
      })
      .then((res) => {
        if (res) {
          toast({
            title: 'Success',
            description: 'Password berhasil diubah',
          });
        }
      })
      .catch((err) => {
        toast({
          title: 'Error',
          variant: 'destructive',
          description: err.message,
        });
      });
  };
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
        <FormField
          control={form.control}
          name='old_password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password lama</FormLabel>
              <FormDescription>Masukkan password lama Anda</FormDescription>
              <FormControl>
                <Input type='password' placeholder='Password lama' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='new_password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password baru</FormLabel>
              <FormDescription>Masukkan password baru Anda</FormDescription>
              <FormControl>
                <Input type='password' placeholder='Password baru' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className='flex w-full justify-center'
          type='submit'
          disabled={mutatePassword.isLoading}
        >
          {mutatePassword.isLoading ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Mohon Tunggu
            </>
          ) : (
            <>Ubah Password</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
